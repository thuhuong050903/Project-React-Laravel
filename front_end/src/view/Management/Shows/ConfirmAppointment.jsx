import  { useState, useEffect } from "react";
import axios from "axios";
import DataTable from 'react-data-table-component';

const ConfirmAppointment = () => {
  // const user = 1
  const user = JSON.parse(sessionStorage.getItem('user'));
  
  const [appointments, setAppointments] = useState([]);

  const fetchAppointment = () => {
    axios
      .get(`http://localhost:8000/api/get-confirmappointment/${user}`)
      .then((response) => {
        setAppointments(response.data);
        console.log(response);
      })
      .catch((error) => {
        console.error('Failed to fetch appointment:', error);
      });
  };

  useEffect(() => {
    fetchAppointment();
  }, []);

  const handleCancellation = (appointmentId, userEmail) => {
    // Update the status of the appointment in the database
    axios
      .put(`http://127.0.0.1:8000/api/update-appointment/${appointmentId}`, {
        status: "Hủy",  
      })
      .then((response) => {
        // Update the status in the state
        const updatedAppointments = appointments.map((appointment) => {
          if (appointment.appointment_id === appointmentId) {
            return { ...appointment, canceled: true };
          }
          return appointment;
        });

        const canceledAppointment = appointments.find(
          (appointment) => appointment.appointment_id === appointmentId
        );

        setAppointments(updatedAppointments);

        console.log("Appointment status updated successfully");

        // Send email to the retrieved email address
        axios
          .get(`http://127.0.0.1:8000/failemail?email=${userEmail}`)
          .then((response) => {
            console.log("Email sent successfully");
          })
          .catch((error) => {
            console.error("Error sending email:", error);
          });

        // Reload the page
        window.location.reload();
      })
      .catch((error) => {
        console.error("Error updating appointment status:", error);
      });
  }

  const handleConfirmation = (appointmentId, userEmail) => {
    // Update the status of the appointment in the database
    axios
      .put(`http://127.0.0.1:8000/api/update-appointment/${appointmentId}`, {
        status: "Đã xác nhận",
      })
      .then((response) => {
        // Update the status in the state
        const updatedAppointment = appointments.map((appointment) => {
          if (appointment.appointment_id === appointmentId) {
            return { ...appointment, status: true };
          }
          return appointment;
        });
        setAppointments(updatedAppointment);
        console.log("Appointment status updated successfully");

        // Send email to the retrieved email address
        axios
          .get(`http://127.0.0.1:8000/mailsuccessfull?email=${userEmail}`)
          .then((response) => {
            console.log("Email sent successfully");
          })
          .catch((error) => {
            console.error("Error sending email:", error);
          });

        // Reload the page
        window.location.reload();
      })
      .catch((error) => {
        console.error("Error updating appointment status:", error);
      });
  }


  const columns = [
    {
      name: 'Appointment ID',
      selector: 'appointment_id',
      sortable: true,
    },
    {
      name: 'Apartment ID',
      selector: 'apartment_id',
      sortable: true,
    },
    {
      name: 'User Name',
      cell: (row) => row.users.fullname,
      sortable: true,
    },
    {
      name: 'Appointment_date_time',
      selector: 'appointment_date_time',
      sortable: true,
    },
    {
      name: 'Status',
      cell: (row) => {
        if (row.canceled) {
          return <span>Bạn đã hủy</span>;
        } else if (row.confirmed) {
          return <span>Đã xác nhận</span>;
        } else {
          return (
            <div>
              <button
                className="btn btn-sm btn-success"
                style={{ width: '80px' }}
                onClick={() => handleConfirmation(row.appointment_id, row.users.email)}
                type="button"
              >
                Xác nhận
              </button>
              <button
                className="btn btn-sm btn-danger"
                style={{ width: '80px' }}
                onClick={() => handleCancellation(row.appointment_id, row.users.email)}
                type="button"
              >
                Hủy
              </button>
            </div>
          );
        }
      },
      compact: true,
    },
  ];

 
  return (
    <div>
      {appointments && appointments.length > 0 ? (
        <div className="list_apartment">
      <DataTable
        title="ConfirmAppointment"
        columns={columns}
        data={appointments}
        paginationPerPage={10}
        defaultSortField="apartment_id"
        pagination
      />
    </div>
      ) : (
        <h1>ha</h1>
      )}
    </div>
  );
};

export default ConfirmAppointment;
