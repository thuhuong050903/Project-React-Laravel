import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell } from "@fortawesome/free-solid-svg-icons";

class MenuManagement extends Component {
  state = {
    activeMenuItem: null,
    hasNewAppointment: false,
    isNotificationSeen: false,
  };

  componentDidMount() {
    this.checkNewAppointment();
  }

  checkNewAppointment() {
    axios
      .get("https://63a57216318b23efa793a737.mockapi.io/api/appointment")
      .then((response) => {
        const appointments = response.data;
        const hasNewAppointment = appointments.length > 0;

        this.setState({ hasNewAppointment });
      })
      .catch((error) => {
        console.error("Error fetching new appointment:", error);
      });
  }

  handleMenuItemClick = (menuItem) => {
    this.setState({ activeMenuItem: menuItem });
  };

  render() {
    const { activeMenuItem, hasNewAppointment, isNotificationSeen } =
      this.state;

    const handleConfirmAppointmentClick = () => {
      // Lấy danh sách các mục từ API
      axios
        .get("https://63a57216318b23efa793a737.mockapi.io/api/appointment")
        .then((response) => {
          const appointments = response.data;

          // Xóa từng mục trong danh sách
          appointments.forEach((appointment) => {
            axios
              .delete(
                `https://63a57216318b23efa793a737.mockapi.io/api/appointment/${appointment.id}`
              )
              .then(() => {
                console.log(
                  `Appointment ${appointment.id} deleted successfully!`
                );
              })
              .catch((error) => {
                console.error(
                  `Error deleting appointment ${appointment.id}:`,
                  error
                );
              });
          });

          // Đặt isNotificationSeen thành true để ẩn biểu tượng thông báo
          this.setState({ isNotificationSeen: true });
        })
        .catch((error) => {
          console.error("Error fetching appointment data:", error);
        });
    };

    return (
      <div>
        <aside className="main-sidebar sidebar-dark-primary elevation-4" style={{ height: "100%" }}>
          {/* Brand Logo */}
          <NavLink to="/" className="brand-link">
            {/* <img
              src="public/dist/img/manage.jpg"
              style={{ opacity: ".8" }}

            /> */}
            <span className="brand-text font-weight-light">Management </span>
          </NavLink>
          {/* Sidebar */}
          <div className="sidebar">
            <div className="form-inline">
              <div className="input-group" data-widget="sidebar-search">
                <input
                  className="form-control form-control-sidebar"
                  type="search"
                  placeholder="Search"
                  aria-label="Search"
                />
                <div className="input-group-append">
                  <button className="btn btn-sidebar">
                    <i className="fas fa-search fa-fw" />
                  </button>
                </div>
              </div>
            </div>
            <nav className="mt-2">
              <ul className="nav nav-pills nav-sidebar flex-column" data-widget="treeview" role="menu" data-accordion="false">
                <li className={`nav-item ${activeMenuItem === "contracts" ? "text-danger" : ""}`} onClick={() => this.handleMenuItemClick("contracts")}>
                  <NavLink to={`./contracts`} className="nav-link">
                    <i className="nav-icon fas fa-tree" />
                    <p>
                      Contracts
                      <i className="fas fa-angle-left right" />
                    </p>
                  </NavLink>
                </li>
                <li className={`nav-item ${activeMenuItem === "confirmappointment" ? "text-danger" : ""}`} onClick={() => this.handleMenuItemClick("confirmappointment")}>
                  <NavLink to={`./confirmappointment`} className={`nav-link ${hasNewAppointment && !isNotificationSeen ? "notification-button" : ""}`} onClick={handleConfirmAppointmentClick}>
                    <i className="nav-icon fas fa-chart-pie" />
                    <p>
                      Confirm Appointment
                      {hasNewAppointment && !isNotificationSeen && <span>&nbsp;</span>}
                      {hasNewAppointment && !isNotificationSeen && (
                        <FontAwesomeIcon icon={faBell} className="notification-button" style={{ color: "red" }} />
                      )}
                    </p>
                  </NavLink>
                </li>
                <li className={`nav-item ${activeMenuItem === "apartment" ? "text-danger" : ""}`} onClick={() => this.handleMenuItemClick("apartment")}>
                  <NavLink to={`./apartment`} className="nav-link">
                    <i className="far fa-circle nav-icon" />
                    <p>My Apartment</p>
                  </NavLink>
                </li>
                <li className={`nav-item ${activeMenuItem === "address" ? "text-danger" : ""}`} onClick={() => this.handleMenuItemClick("address")}>
                  <NavLink to={`./address`} className="nav-link">
                    <i className="far fa-circle nav-icon" />
                    <p>Address table</p>
                  </NavLink>
                </li>
              </ul>
            </nav>
          </div>
        </aside>
      </div>
    );
  }
}

export default MenuManagement;
