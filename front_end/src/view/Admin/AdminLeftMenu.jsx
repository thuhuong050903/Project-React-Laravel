import React from "react";
import { Link } from "react-router-dom";
import { Navbar, Nav } from 'react-bootstrap';

const AdminLeftMenu = () => {
  return (
    <ul className="navbar-nav bg-secondary sidebar sidebar-dark accordion" id="accordionSidebar">
      <Link to="/" className="sidebar-brand d-flex align-items-center justify-content-center">
        <div className="sidebar-brand-icon rotate-n-15"></div>
        <Navbar.Brand className="sidebar-brand-text mx-3">DREAMHOME </Navbar.Brand>
      </Link>
      <hr className="sidebar-divider my-0" />
      <li className="nav-item active">
        <Link to="/admin/dashboard" className="nav-link">
          <span>Dashboard</span>
        </Link>
      </li>
      <hr className="sidebar-divider" />
      <div className="sidebar-heading">Interface</div>
      <li className="nav-item">
        <Link to="/admin/list-users" className="nav-link">
          List_User
        </Link>
      </li>
      <li className="nav-item">
        <Link to="/admin/list-seeders" className="nav-link">
          List_Seeder
        </Link>
      </li>
      <li className="nav-item">
        <Link to="/admin/list-apartments" className="nav-link">
          List_Apartment
        </Link>
      </li>
      <li className="nav-item">
        <Link to="/admin/list-address" className="nav-link">
          List_Addresses
        </Link>
      </li>
      <li className="nav-item">
        <Link to="/admin/list-contracts" className="nav-link">
          List_Contracts
        </Link>
      </li>
    </ul>
  );
};

export default AdminLeftMenu;
