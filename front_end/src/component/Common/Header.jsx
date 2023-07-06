import React, { useState } from "react";
import "../../assets/style/Header.css";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBuilding } from "@fortawesome/free-regular-svg-icons";
import { faUser, faCog,faSignOutAlt } from "@fortawesome/free-solid-svg-icons";
const Header = () => {
  const user = JSON.parse(sessionStorage.getItem('user'));
  const handleLogout = () => {
    sessionStorage.removeItem("user");
    window.location.href="/sign-in";
  };
  return (
    <div className="nav-bar">
      <div className="top-bar">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <Link to="#" className="">
                <span className="mr-2  icon-envelope-open-o"></span>{" "}
                <span className="d-none d-md-inline-block">
                  info@yourdomain.com
                </span>
              </Link>
              <span className="mx-md-2 d-inline-block"></span>
              <Link to="#" className="">
                <span className="mr-2  icon-phone"></span>{" "}
                <span className="d-none d-md-inline-block">
                  1+ (234) 5678 9101
                </span>
              </Link>

              <div className="float-right">
              {user ? (
          <>
            {user.role === "Nguoi cho thue" && (
              <Link to="/lessor/dashboard" >
                <FontAwesomeIcon icon={faBuilding} className="mr-2"/>
                <span className="d-none d-md-inline-block">Quản lí tài sản</span>
                <span className="mx-md-2 d-inline-block"></span>
              </Link>
              
            )}
            <Link to="/" className="">
              <FontAwesomeIcon icon={faUser} className="mr-2" />
              <span className="d-none d-md-inline-block">{user.username}</span>
            </Link>
            <span className="mx-md-2 d-inline-block"></span>
            <Link to="/user-profile" className="">
              <FontAwesomeIcon icon={faCog} className="mr-2" />
              <span className="d-none d-md-inline-block">Cài đặt</span>
            </Link>
            <span className="mx-md-2 d-inline-block"></span>
            <Link to="#" className="" onClick={handleLogout}>
              <FontAwesomeIcon icon={faSignOutAlt} className="mr-2" />
              <span className="d-none d-md-inline-block">Đăng xuất</span>
            </Link>
          </>
        ) : (
          <>
            <Link to="/sign-in" className="">
              <span className="mr-2 icon-twitter"></span>{" "}
              <span className="d-none d-md-inline-block">Đăng nhập</span>
            </Link>
            <span className="mx-md-2 d-inline-block"></span>
            <Link to="/sign-up" className="">
              <span className="mr-2 icon-facebook"></span>{" "}
              <span className="d-none d-md-inline-block">Đăng kí</span>
            </Link>
          </>
        )}
      </div>
            </div>
          </div>
        </div>
      </div>
      <div
        id="sticky-wrapper"
        className="sticky-wrapper"
        style={{ height: "96px" }}
      >
        <header
          className="site-navbar js-sticky-header site-navbar-target"
          role="banner"
          style={{ width: "1263.33px" }}
        >
          <div className="container">
            <div className="row align-items-center position-relative">
              <div className="site-logo">
                <Link to="/" className="">
                  
                  <span className="" style={{color:"#ee0000", fontSize:"24px",fontFamily:"Segoe UI",fontWeight:700,letterSpacing:"nomarl"}}>Dream Apartments</span>
                </Link>
              </div>
              <div className="col-12">
                <nav
                  className="site-navigation text-right ml-auto"
                  role="navigation"
                >
                  <ul className="site-menu main-menu js-clone-nav ml-auto d-none d-lg-block">
                    <li>
                      <Link to="/" className="nav-link">
                        Trang chủ
                      </Link>
                    </li>
                    <li>
                      <Link to="/services" className="nav-link">
                        Dịch vụ
                      </Link>
                    </li>
                    <li className="has-children">
                      <Link to="/list-apartment" className="nav-link">
                        Căn hộ
                      </Link>
                      <ul className="dropdown arrow-top">
                    
                        <li>
                          <Link to="/short-term-apartments" className="nav-link">
                            Ngắn hạn
                          </Link>
                        </li>
                        <li>
                          <Link to="/long-term-apartments" className="nav-link">
                            Dài hạn
                          </Link>
                        </li>
                      </ul>
                    </li>
                    <li>
                      <Link to="/introduce" className="nav-link">
                        Giới thiệu
                      </Link>
                    </li>
                    <li>
                      <Link to="" className="nav-link">
                        Về chúng tôi
                      </Link>
                    </li>
                    <li>
                      <Link to="/co-living" className="nav-link">
                        Co-Living
                      </Link>
                    </li>
                    <li>
                      <Link to="/history" className="nav-link">
                        Lịch sử
                      </Link>
                    </li>
                  </ul>
                </nav>
              </div>
              <div className="toggle-button d-inline-block d-lg-none">
                <Link
                  to="#"
                  className="site-menu-toggle py-5 js-menu-toggle text-black"
                >
                  <span className="icon-menu h3"></span>
                </Link>
              </div>
            </div>
          </div>
        </header>
      </div>
    </div>
  );
};

export default Header;
