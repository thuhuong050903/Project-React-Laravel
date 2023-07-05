import React, { Component } from "react";
import { Link } from "react-router-dom";

class MenuManagement extends Component {
  render() {
    const user = JSON.parse(sessionStorage.getItem('user'));
    return (
      <div style={{ marginTop: "5rem"}}>
        <div className="sidebar" style={{ borderRight: "1px solid #ddd",paddingTop:"4rem" }}>
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
                <li className="nav-item">
                  <a href="#" className="nav-link">
                    <i className="nav-icon fas fa-chart-pie" />
                    <p>
                      Xác nhận cuộc hẹn
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
  }
}

export default MenuManagement;
