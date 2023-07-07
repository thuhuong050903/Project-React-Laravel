import { useState, useEffect } from "react";
import axios from "axios";
import DataTable from "react-data-table-component";
import { Button, Modal } from "react-bootstrap";

const ConfirmAppointment = () => {
  const user = JSON.parse(sessionStorage.getItem('user'));

  const [appointments, setAppointments] = useState([]);
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [contractData, setContractData] = useState({
    user_id: null,
    apartment_id: null,
    start_date: "",
    end_date: "",

  });
  const [showModal, setShowModal] = useState(false);


  const fetchAppointment = () => {
    axios
      .get(`http://localhost:8000/api/get-appointment/${user.id}`)
      .then((response) => {
        const appointments = response.data.map((appointment) => ({
          ...appointment,
          statusText:
            appointment.status === "Chờ xác nhận"
              ? "Chờ xác nhận"
              : appointment.status === "confirmed"
                ? "Confirmed"
                : "Canceled",
        }));
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

  const handleCancellation = (appointmentId, userEmail) => {
    axios
      .put(`http://127.0.0.1:8000/api/update-appointment/${appointmentId}`, {
        status: "you canceled",
      })
      .then(() => {
        // Update the status and contracts in the state
        const updatedAppointments = appointments.map((appointment) => {
          if (appointment.appointment_id === appointmentId) {
            return {
              ...appointment,
              statusText: "Canceled",

            };
          }
          return appointment;
        });
        setAppointments(updatedAppointments);

        alert("Vui long đợi Admin xác nhận trước khi ký hợp đồng")
        console.log("Appointment status updated successfully");

        // Send email to the retrieved email address
        axios
          .get(`http://127.0.0.1:8000/failemail?email=${userEmail}`)
          .then(() => {
            console.log("Email sent successfully");
          })
          .catch((error) => {
            console.error("Error sending email:", error);
          });
      })
      .catch((error) => {
        console.error("Error updating appointment status:", error);
      });
  };

  const handleConfirmation = (appointmentId, userEmail) => {
    axios
      .put(`http://127.0.0.1:8000/api/update-appointment/${appointmentId}`, {
        status: "confirmed",
      })
      .then(() => {
        // Update the status and contracts in the state
        const updatedAppointments = appointments.map((appointment) => {
          if (appointment.appointment_id === appointmentId) {
            return {
              ...appointment,
              statusText: "Confirmed",

            };
          }
          return appointment;
        }); setAppointments(updatedAppointments);
        console.log("Appointment status updated successfully");

        // Send email to the retrieved email address
        axios
          .get(`http://127.0.0.1:8000/mailsuccessfull?email=${userEmail}`)
          .then(() => {
            console.log("Email sent successfully");
          })
          .catch((error) => {
            console.error("Error sending email:", error);
          });
      })
      .catch((error) => {
        console.error("Error updating appointment status:", error);
      });
  };

  const handleContractCreation = () => {
    const { user_id, apartment_id, start_date, end_date } = contractData;
    axios
      .post("http://localhost:8000/api/add-contracts", contractData)
      .then((response) => {
        alert("Bạn đã tạo hợp đồng thành công!")
        console.log("Dữ liệu đã được gửi thành công:", response.data);

      })
      .catch((error) => {
        console.error("Lỗi khi gửi yêu cầu:", error);
        // Xử lý lỗi nếu có
      });

    setShowModal(false);
  };



  const handleChange = (e) => {
    const { name, value } = e.target;
    setContractData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault(); /// Ngăn chặn hành vi mặc định của form khi gửi
    // Gửi yêu cầu POST đến máy chủ Laravel
    handleContractCreation(); // Gọi hàm xử lý gửi yêu cầu POST
  };

  const openModal = (appointment) => {
    setSelectedAppointment(appointment);
    setContractData({
      user_id: appointment.user_id,
      apartment_id: appointment.apartment_id,
      start_date: "",
      end_date: "",
    });
    setShowModal(true);

  };

  const closeModal = () => {
    setShowModal(false);
  };

  const columns = [
    {
      name: "Appointment ID",
      selector: "appointment_id",
      sortable: true,
    },
    {
      name: "Apartment ID",
      selector: "apartment_id",
      sortable: true,
    },
    {
      name: "User Name",
      cell: (row) => row.fullname,
      sortable: true,
    },
    {
      name: "Appointment_date_time",
      selector: "appointment_date_time",
      sortable: true,
    },
    {
      name: "Status",
      cell: (row) => {
        if (row.statusText === "Chờ xác nhận") {
          return (
            <div>
              <button
                className="btn btn-sm btn-success"
                style={{ width: "80px" }}
                onClick={() =>
                  handleConfirmation(row.appointment_id, row.email)
                }
                type="button"
              >
                Confirm
              </button>
              <button
                className="btn btn-sm btn-danger"
                style={{ width: "80px" }}
                onClick={() =>
                  handleCancellation(row.appointment_id, row.email)
                }
                type="button"
              >
                Cancel
              </button>
            </div>);
        } else {
          return <span>{row.statusText}</span>;
        }
      },
      compact: true,
    },

    {
      name: "Contract",
      selector: "contracts",
      sortable: true,
      cell: (row) => {
        if (row.status === "confirmed" && row.admin_confirm ==="confirmed") {
          return (
            <button
              className="btn btn-sm btn-primary"
              style={{ width: "80px" }}
              onClick={() => openModal(row)}
              type="button"

            >
              Ký hợp đồng {/* Thay đổi chữ hiển thị ở đây */}
            </button>
          );
        } else {
          return <span>-</span>;
        }
      },
      compact: true,
    },
  ];

  return (
    <div style={{marginTop:"10rem"}}>
      {appointments && appointments.length > 0 ? (

          <DataTable
            style={{ marginLeft: "28px", with: "96%" }}
            title="ConfirmAppointment"
            columns={columns}
            data={appointments}
            paginationPerPage={10}
            defaultSortField="apartment_id"
            pagination
          />

      ) : (
        <h1>No appointments available</h1>
      )}
      <form onSubmit={handleSubmit}>
        <Modal show={showModal} onHide={closeModal}>
          <Modal.Header closeButton>
            <Modal.Title
              style={{ color: "firebrick", display: "flex", margin: "0 auto" }}
            >
              Contract Creation
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div>
              <label>User ID:</label>
              <input
                style={{ marginLeft: "26%" }}
                type="text"
                name="user_id"
                value={contractData.user_id}
                disabled
                onChange={handleChange}
              />
            </div>
            <div>
              <label>Apartment ID:</label>
              <input
                style={{ marginLeft: "15.2%", marginTop: "6px" }}
                type="text"
                name="apartment_id"
                value={contractData.apartment_id}
                disabled
                onChange={handleChange}
              />
            </div>
            <div>
              <label>Start Date:</label>
              <input
                style={{ marginLeft: "21.5%", width: "42%", marginTop: "6px" }}
                type="Date"
                name="start_date"
                value={contractData.start_date}
                onChange={handleChange}
              />
            </div>
            <div>
              <label>End Date:</label>
              <input
                style={{ marginLeft: "23.5%", width: "42%", marginTop: "6px" }}
                type="Date"
                name="end_date"
                value={contractData.end_date}
                onChange={handleChange}
              />
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button type="submit"
              variant="primary"
              onClick={handleContractCreation}
            >
              Create Contract
            </Button>
            <Button variant="secondary" onClick={closeModal}>
              Cancel
            </Button>
          </Modal.Footer>
        </Modal>
      </form>
    </div>
  );
};

export default ConfirmAppointment;