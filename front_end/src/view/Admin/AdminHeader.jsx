import React, { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import { Link } from "react-router-dom";
const AdminHeader = () => {
    const user = JSON.parse(sessionStorage.getItem('user'));
    const handleLogout = () => {
        // Thực hiện các thao tác logout, ví dụ: xóa sessionStorage
        sessionStorage.removeItem("user");
        // Điều hướng về trang đăng nhập
        window.location.href='/sign-in';
    };
    return (
        <nav className="navbar navbar-expand navbar-light bg-white topbar mb-4 static-top shadow">

            <button id="sidebarToggleTop" className="btn btn-link d-md-none rounded-circle mr-3">
                <i className="fa fa-bars" />
            </button>
            <form className="d-none d-sm-inline-block form-inline mr-auto ml-md-3 my-2 my-md-0 mw-100 navbar-search">
                <div className="input-group">
                    <input type="text" className="form-control bg-light border-0 small" placeholder="Search for..." aria-label="Search" aria-describedby="basic-addon2" />
                    <div className="input-group-append">
                        <button className="btn btn-secondary" type="button">
                            <i className="fas fa-search fa-sm" />
                        </button>
                    </div>
                </div>
            </form>

            <ul className="navbar-nav ml-auto">

                <li className="nav-item dropdown no-arrow d-sm-none">
                    <a className="nav-link dropdown-toggle" href="#" id="searchDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        <i className="fas fa-search fa-fw" />
                    </a>

                    <div className="dropdown-menu dropdown-menu-right p-3 shadow animated--grow-in" aria-labelledby="searchDropdown">
                        <form className="form-inline mr-auto w-100 navbar-search">
                            <div className="input-group">
                                <input type="text" className="form-control bg-light border-0 small" placeholder="Search for..." aria-label="Search" aria-describedby="basic-addon2" />
                                <div className="input-group-append">
                                    <button className="btn btn-primary" type="button">
                                        <i className="fas fa-search fa-sm" />
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                </li>

                <li className="nav-item dropdown no-arrow mx-1">
                    <a className="nav-link dropdown-toggle" href="#" id="alertsDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        <i className="fas fa-bell fa-fw" />

                        <span className="badge badge-danger badge-counter"></span>
                    </a>

                    <div className="dropdown-list dropdown-menu dropdown-menu-right shadow animated--grow-in" aria-labelledby="alertsDropdown">

                    </div>
                </li>

                <li className="nav-item dropdown no-arrow mx-1">
                    <a className="nav-link dropdown-toggle" href="#" id="messagesDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        <i className="fas fa-envelope fa-fw" />


                    </a>
                </li>
                <div className="topbar-divider d-none d-sm-block" />

                <li className="nav-item dropdown no-arrow">
        <Link
          className="nav-link dropdown-toggle"
          to="#"
          id="userDropdown"
          role="button"
          data-toggle="dropdown"
          aria-haspopup="true"
          aria-expanded="false"
        >
          <span className="mr-2 d-none d-lg-inline text-gray-600 small" onClick={handleLogout}>
            {user.username}
          </span>
          <img
            className="img-profile rounded-circle"
            src="https://png.pngtree.com/template/20190716/ourlarge/pngtree-farm-linear-cartoon-logo-design-image_226684.jpg"
            alt="Profile"
          />
        </Link>
        <div
          className="dropdown-menu dropdown-menu-right"
          aria-labelledby="userDropdown"
        >
          <button className="dropdown-item"  >
            Đăng xuất
          </button>
        </div>
      </li>
            </ul>
        </nav>
    )
}

export default AdminHeader;