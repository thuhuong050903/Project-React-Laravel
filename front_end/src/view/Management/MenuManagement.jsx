import React, { Component, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell } from "@fortawesome/free-solid-svg-icons";

const MenuManagement = () => {
  const [hasNewAppointment, setHasNewAppointment] = useState(false);
  const [isNotificationSeen, setNotificationSeen] = useState(false);

  useEffect(() => {
    checkNewAppointment();
  }, []);

  const checkNewAppointment = () => {
    axios
      .get("https://63a57216318b23efa793a737.mockapi.io/api/appointment")
      .then((response) => {
        const appointments = response.data;
        const hasNewAppointment = appointments.length > 0;
        setHasNewAppointment(hasNewAppointment);
      })
      .catch((error) => {
        console.error("Error fetching new appointment:", error);
      });
  };

  const handleConfirmAppointmentClick = () => {
    axios
      .get("https://63a57216318b23efa793a737.mockapi.io/api/appointment")
      .then((response) => {
        const appointments = response.data;
  
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
  
        setNotificationSeen(true);
      })
      .catch((error) => {
        console.error("Error fetching appointment data:", error);
      });
  };
  
  
  const user = JSON.parse(sessionStorage.getItem("user"));

  return (
    <div style={{ marginTop: "5rem" }}>
      <div className="sidebar" style={{ borderRight: "1px solid #ddd", paddingTop: "4rem" }}>
        <nav className="mt-2">
          <ul
            className="nav nav-pills nav-sidebar flex-column"
            data-widget="treeview"
            role="menu"
            data-accordion="false"
          >
            <Link to={`./contact`}>
              <li className="nav-item">
                <a className="nav-link">
                  <i className="nav-icon fas fa-tree" />
                  <p>
                    Contact
                    <i className="fas fa-angle-left right" />
                  </p>
                </a>
              </li>
            </Link>

            <Link to={`/lessor/appointments`}>
              <li className={`nav-item ${hasNewAppointment && !isNotificationSeen ? "text-danger" : ""}`}>
                <a href="#" className="nav-link" onClick={handleConfirmAppointmentClick}>
                  <i className="nav-icon fas fa-chart-pie" />
                  <p>
                    Xác nhận cuộc hẹn
                    {hasNewAppointment && !isNotificationSeen && <span>&nbsp;</span>}
                    {hasNewAppointment && !isNotificationSeen && (
                      <FontAwesomeIcon icon={faBell} style={{ color: "red" }} />
                    )}
                    <i className="right fas fa-angle-left" />
                  </p>
                </a>
              </li>
            </Link>

            <Link to={`/lessor/get-apartments-byLessorId/${user.id}`}>
              <li className="nav-item">
                <a className="nav-link">
                  <i className="far fa-circle nav-icon" />
                  <p>Danh sách căn hộ</p>
                </a>
              </li>
            </Link>

            <Link to={`/lessor/contracts`}>
              <li className="nav-item">
                <a className="nav-link">
                  <i className="far fa-circle nav-icon" />
                  <p>Danh sách hợp đồng</p>
                </a>
              </li>
            </Link>
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default MenuManagement;
