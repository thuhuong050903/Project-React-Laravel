import DataTable from "react-data-table-component";
import { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert";

const BookApartment = () => {
  const user = JSON.parse(sessionStorage.getItem('user'));

  const [appointments, setAppointments] = useState([]);

  const fetchAppointment = () => {
    axios
      .get(`http://localhost:8000/api/get-bookapartment/${user.id}`)
      .then((response) => {
        const appointments = response.data.map((appointment) => {
          const currentDate = new Date();
          const checkOutDate = new Date(appointment.check_out_date);
          const remainingDays = Math.ceil((checkOutDate - currentDate) / (1000 * 60 * 60 * 24)); // Tính số ngày còn lại
          const status = checkOutDate > currentDate ? `Còn ${remainingDays} ngày` : "Đã hết hạn";
          
          return {
            ...appointment,
            status: status,
          };
        });
        setAppointments(appointments);
        console.log(response);
      })
      .catch((error) => {
        console.error("Failed to fetch appointment:", error);
      });
  };

  useEffect(() => {
    fetchAppointment();
  }, []);

  const handleDelete = async (bookId) => {
    try {
      await axios.delete(`http://127.0.0.1:8000/api/delete-bookapartment/${bookId}`);
      Swal({
        text: "Delete successfully",
        icon: "success",
        button: "OK",
      });
      // Xóa hợp đồng thành công, thực hiện cập nhật lại danh sách hợp đồng
      setAppointments(prevApartment => prevApartment.filter(BookApartment => BookApartment.book_id !== bookId));
      fetchAppointment();
    } catch (error) {
      console.error("Error deleting apartment đặt:", error);
    }
  };

  const columns = [
    {
      name: "Tenant's name",
      cell: (row) => row.fullname,
      sortable: true,
    },
    {
      name: "Tenant's address",
      cell: (row) => row.users.address,
      sortable: true,
    },
    {
      name: "Ngày nhận phòng",
      selector: "check_in_date",
      sortable: true,
    },
    {
      name: "Ngày trả phòng",
      selector: "check_out_date",
      sortable: true,
    },
    {
      name: "Price",
      selector: "total_price",
      sortable: true,
    },
    {
      name: "Status",
      selector: "status",
      sortable: true,
      conditionalCellStyles: [
        {
          when: (row) => row.status === "Đã hết hạn",
          style: {
            color: "red",
            fontWeight: "bold",
          },
        },
      ],
      cell: (row) => (
        <>
          {row.status === "Đã hết hạn" && (
            <>
              <span>Đã hết hạn </span>
              <button onClick={() => handleDelete(row.book_id)}>Xóa</button>
            </>
          )}
          {row.status !== "Đã hết hạn" && <span>{row.status}</span>}
        </>
      ),
    },
  ];

  return (
    <div style={{marginTop:"10rem"}}>
<div className="booked"style={{marginTop:"10rem", fontSize:"30px",display: 'flex',justifyContent: 'center',color: '#FE0000'}}>
       The apartment is booked
      </div>
      {appointments && appointments.length > 0 ? (
        <DataTable
          style={{ marginLeft: "28px", width: "96%" }}
          columns={columns}
          data={appointments}
          paginationPerPage={10}
          defaultSortField="apartment_id"
          pagination
        />
      ) : (
        <h1>No appointments available</h1>
      )}
    </div>
  );
};

export default BookApartment;
