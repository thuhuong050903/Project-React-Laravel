import React, { Component } from "react";

class HeaderManagement extends Component {
  render() {
    return (
      <div>
        <nav className="main-header navbar navbar-expand navbar-white navbar-light" >
      
          <ul className="navbar-nav">
            <li className="nav-item">
            </li>
            <li className="nav-item d-none d-sm-inline-block">
              <a href="index3.html" className="nav-link">
                Home
              </a>
            </li>
            <li className="nav-item d-none d-sm-inline-block">
              <a href="#" className="nav-link">
                Contact
              </a>
            </li>
          </ul>
         
          <ul className="navbar-nav ml-auto">
         
            <li className="nav-item">
            <button type="button" className="btn btn-primary">Đăng Xuất</button>
      
            </li>
          </ul>
        </nav>
      </div>
    );
  }
}

export default HeaderManagement;