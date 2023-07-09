import React, { Component } from "react";
import axios from "axios";
import DataTable from "react-data-table-component";
import "bootstrap/dist/css/bootstrap.css";
import "../../assets/style/List_apartment.css";

class AdminListAppointment extends Component {
  constructor(props) {
    super(props);
    this.state = {
      appointments: [],
      error: null,
      sentEmails: [],
    };
  }

  componentDidMount() {
    this.fetchAppointments();
  }

  fetchAppointments = async () => {
    try {
      const response = await axios.get("http://localhost:8000/api/get-appointments");
      const appointments = response.data;
      this.setState({ appointments });
    } catch (error) {
      console.error("Error fetching appointments:", error);
      this.setState({ error: "Error fetching appointments" });
    }
  };

  handleSendMail = async (email1, email2) => {
    const emails = [email1, email2];

    try {
      await Promise.all(emails.map((email) => axios.get(`http://localhost:8000/agree-appointment?email=${email}`)));

      this.setState((prevState) => ({
        sentEmails: [...prevState.sentEmails, ...emails],
      }));

      console.log("Emails sent successfully");
    } catch (error) {
      console.error("Error sending emails:", error);
    }
  };

  handleConfirmAppointment = async (row) => {
    try {
      if (row.status !== "confirmed") {
        alert("Chỉ được phép xác nhận các cuộc hẹn đã được xác nhận.");
        return;
      }
  
      const { appointments } = this.state;
      const confirmedAppointments = appointments.map((appointment) => {
        if (appointment.appointment_id === row.appointment_id) {
          return { ...appointment, admin_confirm: "confirmed" };
        }
        return appointment;
      });
  
      await axios.put(`http://localhost:8000/api/appointments/${row.appointment_id}/confirm`, {
        admin_confirm: "confirmed",
      });
  
      await this.handleSendMail(row.users.email, row.apartments.users.email);
  
      this.setState({
        appointments: confirmedAppointments,
      });
  
      console.log("Appointment confirmed");
      alert("Appointment confirmed");
    } catch (error) {
      console.error("Error confirming appointment:", error);
      alert("Error confirming appointment");
    }
  };
  

  handleCancelAppointment = async (row) => {
    try {
      if (row.status !== "confirmed") {
        alert("Chỉ được phép hủy các cuộc hẹn đã được xác nhận.");
        return;
      }

      const { appointments } = this.state;
      const canceledAppointments = appointments.map((appointment) => {
        if (appointment.appointment_id === row.appointment_id) {
          return { ...appointment, admin_confirm: "canceled" };
        }
        return appointment;
      });

      await axios.put(`http://localhost:8000/api/appointments/${row.appointment_id}/cancel`, {
admin_confirm: "canceled",
      });

      this.setState({
        appointments: canceledAppointments,
      });

      console.log("Appointment canceled");
      alert("Appointment canceled"); // Hiển thị thông báo hủy thành công
    } catch (error) {
      console.error("Error canceling appointment:", error);
      alert("Error canceling appointment"); // Hiển thị thông báo lỗi
    }
  };
  render() {
    const { appointments, error, sentEmails } = this.state;

    const columns = [
        {
            name: " Appointment ID",
            selector: "appointment_id",
            sortable: true,
          },
          {
            name: "ID User",
            selector: "users.id",
            sortable: true,
          },
          {
            name: "User name",
            selector: "users.username",
            sortable: true,
          },
          {
            name: "Full name",
            selector: "users.fullname",
            sortable: true,
          },
          {
            name: "User Email",
            selector: "users.email",
            sortable: true,
          },
          {
            name: "User Address",
            selector: "users.address",
            sortable: true,
          },
          {
            name: "User Birthday",
            selector: "users.birthday",
            sortable: true,
          },
          {
            name: "ID Seeder ",
            selector: "apartments.users.id",
            sortable: true,
          },
          {
            name: "Seeder name",
            selector: "apartments.users.username",
            sortable: true,
          },
          {
            name: "Seeder Full name",
            selector: "apartments.users.fullname",
            sortable: true,
          },
          {
            name: "Seeder Email",
            selector: "apartments.users.email",
            sortable: true,
          },
          {
            name: "Seeder Address",
            selector: "apartments.users.address",
            sortable: true,
          },
         
          {
            name: "Seeder Birthday",
            selector: "apartments.users.birthday",
            sortable: true,
          },
          {
            name: "ID Apartment ",
            selector: "apartments.apartment_id",
            sortable: true,
          },
          {
            name: "Apartment Description",
            selector: "apartments.description",
            sortable: true,
          },
          {
            name: "Apartment Price",
            selector: "apartments.price",
            sortable: true,
          },
          {
            name: "Number Room",
            selector: "apartments.number_room",
            sortable: true,
          },
          {
            name: "Area",
            selector: "apartments.area",
            sortable: true,
          },
          {
            name: "Type Room",
            selector: "apartments.type_room",
            sortable: true,
},
          {
            name: "Number Address",
            selector: "apartments.number_address",
            sortable: true,
          },
          {
            name: "Street",
            selector: "apartments.street",
            sortable: true,
          },
          {
            name: "Ward",
            selector: "apartments.ward",
            sortable: true,
          },
          {
            name: "District",
            selector: "apartments.district",
            sortable: true,
          },
          {
            name: "Desired Rent",
            selector: "desired_rent",
            sortable: true,
          },
          {
            name: "Desired move in date",
            selector: "desired_move_in_date",
            sortable: true,
          },
          {
            name: "Appointment date time",
            selector: "appointment_date_time",
            sortable: true,
          },
          {
            name: "Appointment status",
            selector: "status",
            sortable: true,
          },
          {
            name:"Confirm Admin",
            selector: "admin_confirm",
            sortable: true,
          },
          {
            name: "Xác nhận",
            cell: (row) => {
              if (row.admin_confirm !== "confirmed" && row.admin_confirm !== "canceled") {
                return (
                  <div>
                    <button onClick={() => this.handleConfirmAppointment(row)}>Confirm</button>
                    <button onClick={() => this.handleCancelAppointment(row)}>Cancel</button>
                  </div>
                );
              }
              return null;
            },
          },

     
    ];

    if (error) {
      return <div>{error}</div>;
    }

    return (
      <div className="list_apartment" style={{marginLeft:"14.05rem", marginTop:"2.5rem",width:"85%", height:"50rem", backgroundColor:"white"}}>
        <DataTable
          title="List Appointments"
          columns={columns}
          data={appointments}
          paginationPerPage={5}
          defaultSortField="appointment_id"
          pagination
          style={{height:"50rem"}}
        />
       
      </div>
    );
  }
}

export default AdminListAppointment;
