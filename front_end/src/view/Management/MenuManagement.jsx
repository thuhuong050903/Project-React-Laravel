import React, { Component } from "react";
import { Link } from "react-router-dom";

class MenuManagement extends Component {
  render() {
    return (
      <div>
        <aside className="main-sidebar sidebar-dark-primary elevation-4" style={{ height: "200%" }}>
          {/* Brand Logo */}
          <a href="index3.html" className="brand-link">
            {/* <img
              src="dist/img/management.jpg"
              alt="management"
              className="brand-image img-circle elevation-3"
              style={{ opacity: ".8" }}
            /> */}
            <span className="brand-text font-weight-light">Management </span>
          </a>
          {/* Sidebar */}
          <div className="sidebar">
            {/* Sidebar user panel (optional) */}

            {/* SidebarSearch Form */}
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
            {/* Sidebar Menu */}
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

                <Link to={`./confirmappointment`}>
                  <li className="nav-item">
                    <a href="#" className="nav-link">
                      <i className="nav-icon fas fa-chart-pie" />
                      <p>
                      Confirm Appointment
                        <i className="right fas fa-angle-left" />
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

              </ul>
            </nav>
          </div>
          {/* /.sidebar */}
        </aside>
      </div>
    );
  }
}

export default MenuManagement;
