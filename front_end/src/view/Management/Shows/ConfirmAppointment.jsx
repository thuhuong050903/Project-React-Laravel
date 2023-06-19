import React, { Component } from "react";
import axios from "axios";
import DataTable from "react-data-table-component";
import "bootstrap/dist/css/bootstrap.css";

class ConfirmAppointment extends Component {
  constructor(props) {
    super(props);
    this.state = {
      appointment: [],
    };
  }

  //-----send mail ------///
  async sendConfirmationEmail(email) {
    try {
      await axios.post("http://127.0.0.1:8000/api/send-email", {
        email,
        message: "Bạn đã đặt phòng thành công",
      });
      console.log("Email sent successfully");
    } catch (error) {
      console.error("Error sending email:", error);
    }
  }

  handleConfirmation(apartmentId, email) {
    // Gửi thông báo email
    this.sendConfirmationEmail(email);

    // Xử lý logic xác nhận phòng ở đây (nếu cần)
    // ...

    console.log("Phòng đã được xác nhận");
  }
  //---------//-------------------///



  async componentDidMount() {
    await this.fetchAppointments();
  }

  async fetchAppointments() {
    try {
      const response = await axios.get(
        "http://127.0.0.1:8000/api/get-confirmappointment"
      );
      this.setState({ appointment: response.data });
    } catch (error) {
      console.error("Error fetching apartments:", error);
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
        name: "Statust",
        cell: (row) => (
          <div>
            <button
              className="btn btn-sm btn-success"
              style={{ width: "80px" }}
              onClick={() =>
                this.handleConfirmation(row.appointment_id, row.users.email)
              }
              type="button"
            >
              Xác nhận
            </button>
            <button
              className="btn btn-sm btn-danger"
              style={{ width: "80px" }}
              onClick={() => this.deleteApartments(row.apartment_id)}
              type="button"
            >
              Hủy
            </button>
          </div>
        ),
        compact: true,
      },
    ];

    return (
      <div className="list_apartment">
        <DataTable
          title="ConfirmAppointment"
          columns={columns}
          data={this.state.appointment}
          paginationPerPage={5}
          defaultSortField="apartment_id"
          pagination
        />
      </div>
    );
  }
}

export default ConfirmAppointment;
