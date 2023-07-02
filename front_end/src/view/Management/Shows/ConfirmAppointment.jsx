import React, { Component } from "react";
import axios from "axios";
import DataTable from "react-data-table-component";
import "bootstrap/dist/css/bootstrap.css";

class ConfirmAppointment extends Component {
  constructor(props) {
    super(props);
    this.state = {
      appointment: [],
      canceledAppointments: [],
    };
  }
  handleCancellation(appointmentId,userEmail) {
    // Update the status of the appointment in the database
    axios
      .put(`http://127.0.0.1:8000/api/update-appointment/${appointmentId}`, {
        status: "Hủy",  
      })
      .then((response) => {
        // Update the status in the state
        const updatedAppointments = this.state.appointment.map((appointment) => {
          if (appointment.appointment_id === appointmentId) {
            return { ...appointment, canceled: true };
          }
          return appointment;
        });
  
        const canceledAppointment = this.state.appointment.find(
          (appointment) => appointment.appointment_id === appointmentId
        );
  
        this.setState((prevState) => ({
          appointment: updatedAppointments,
          canceledAppointments: [...prevState.canceledAppointments, canceledAppointment],
        }));
  
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

  handleConfirmation(appointmentId, userEmail) {
    // Update the status of the appointment in the database
    axios
      .put(`http://127.0.0.1:8000/api/update-appointment/${appointmentId}`, {
        status: "Đã xác nhận",
      })
      .then((response) => {
        // Update the status in the state
        const updatedAppointment = this.state.appointment.map((appointment) => {
          if (appointment.appointment_id === appointmentId) {
            return { ...appointment, status: true };
          }
          return appointment;
        });
        this.setState({ appointment: updatedAppointment });
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
  
  

  //---------//-------------------///
  async componentDidMount() {
    await this.fetchAppointments();
  }

  async fetchAppointments() {
    try {
      const response = await axios.get("http://127.0.0.1:8000/api/get-confirmappointment");
      const appointments = response.data.map(appointment => ({
        ...appointment,
        confirmed: appointment.status === 'Đã xác nhận',
        canceled: appointment.status === 'Hủy'
      }));
      this.setState({ appointment: appointments });
    } catch (error) {
      console.error("Error fetching appointments:", error);
    }
  }


  render() {
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
        cell: (row) => row.users.fullname,
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
          if (row.canceled) {
            return <span>Bạn đã hủy</span>;
          } else if (row.confirmed) {
            return <span>Đã xác nhận</span>;
          } else {  
            return (
              <div>
                <button
                  className="btn btn-sm btn-success"
                  style={{ width: "80px" }}
                  onClick={() => this.handleConfirmation(row.appointment_id, row.users.email)}
                  type="button"
                >
                  Xác nhận
                </button>
                <button
                  className="btn btn-sm btn-danger"
                  style={{ width: "80px" }}
                  onClick={() => this.handleCancellation(row.appointment_id,row.users.email)}
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
      <div className="list_apartment">
        <DataTable
          title="ConfirmAppointment"
          columns={columns}
          data={this.state.appointment}
          paginationPerPage={10}
          defaultSortField="apartment_id"
          pagination
        />
      </div>
    );
  }
}

export default ConfirmAppointment;