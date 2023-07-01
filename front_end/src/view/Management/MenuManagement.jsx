import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
// import '../../assets/style/Management/MenuManagement.css'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell } from "@fortawesome/free-solid-svg-icons";
class MenuManagement extends Component {
  state = {
    hasNewAppointment: false,
    isNotificationSeen: false
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


  render() {
    const { hasNewAppointment, isNotificationSeen } = this.state;
  
    const handleConfirmAppointmentClick = () => {
      // Lấy danh sách các mục từ API
      axios
        .get("https://63a57216318b23efa793a737.mockapi.io/api/appointment")
        .then((response) => {
          const appointments = response.data;
  
          // Xóa từng mục trong danh sách
          appointments.forEach((appointment) => {
            axios
              .delete(`https://63a57216318b23efa793a737.mockapi.io/api/appointment/${appointment.id}`)
              .then(() => {
                console.log(`Appointment ${appointment.id} deleted successfully!`);
              })
              .catch((error) => {
                console.error(`Error deleting appointment ${appointment.id}:`, error);
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
          <a href="index3.html" className="brand-link">
            <span className="brand-text font-weight-light">Management </span>
          </a>
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
              <ul
className="nav nav-pills nav-sidebar flex-column"
                data-widget="treeview"
                role="menu"
                data-accordion="false"
              >
                <Link to={`./contracts`}>
                  <li className="nav-item">
                    <a className="nav-link">
                      <i className="nav-icon fas fa-tree" />
                      <p>
                        Contracts
                        <i className="fas fa-angle-left right" />
                      </p>
                    </a>
                  </li>
                </Link>
                <Link to={`./confirmappointment`}>
                  <li className={`nav-item ${hasNewAppointment && !isNotificationSeen ? "text-danger" : ""}`}>
                    <a href="#" className={`nav-link ${hasNewAppointment && !isNotificationSeen ? "notification-button" : ""}`} onClick={handleConfirmAppointmentClick}>
                      <i className="nav-icon fas fa-chart-pie" />
                      <p>
                        Confirm Appointment
                        {hasNewAppointment && !isNotificationSeen && (
                          <span>&nbsp;</span>
                        )}
                        {hasNewAppointment && !isNotificationSeen && (
                          <FontAwesomeIcon icon={faBell} className="notification-button" style={{color:"red"}} />
                        )}
                      </p>
                    </a>
                  </li>
                </Link>

                <Link to={`./apartment`}>
                  <li className="nav-item">
                    <a className="nav-link">
                      <i className="far fa-circle nav-icon" />
                      <p>My Apartment</p>
                    </a>
                  </li>
                </Link>
                <Link to={`./address`}>
                  <li className="nav-item">
                    <a className="nav-link">
                      <i className="far fa-circle nav-icon" />
                      <p>Address table</p>
                    </a>
                  </li>
                </Link>
              </ul>
            </nav>
          </div>
        </aside>
      </div>
    );
  }
}

export default MenuManagement;