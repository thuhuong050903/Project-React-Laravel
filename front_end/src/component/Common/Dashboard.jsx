import "../../assets/style/Dashboard.css";
import React, { Component, useEffect, useState } from "react";
import { Navbar, Nav } from 'react-bootstrap';
import { Container, Form, FormControl, Button} from 'react-bootstrap';
import axios from 'axios';
const Dashboard = () => {
  const [apartmentCount, setApartmentCount] = useState(0);
  const [addressCount, setAddressCount] = useState(0);
  const [seederCount, setSeederCount] = useState(0);
  const [userCount, setUserCount] = useState(0);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchApartmentCount();
    fetchSeederCount();
    fetchUserCount();
    fetchAddressCount();
  }, []);

  const fetchApartmentCount = async () => {
    try {
      const response = await axios.get("http://localhost:8000/api/get-apartment");
      const apartments = response.data; // Assuming the response is an array of apartments
      const count = apartments.length;
      setApartmentCount(count);
    } catch (error) {
      console.error("Error fetching apartment count:", error);
      setError("Error fetching apartment count");
    }
  };

  const fetchAddressCount = async () => {
    try {
      const response = await axios.get("http://localhost:8000/api/get-address");
      const addresses = response.data; // Assuming the response is an array of addresses
      const count = addresses.length;
      setAddressCount(count);
    } catch (error) {
      console.error("Error fetching address count:", error);
      setError("Error fetching address count");
    }
  };
  const fetchSeederCount = async () => {
    try {
      const response = await axios.get("http://localhost:8000/api/get-user");
      const seeders = response.data; // Assuming the response is an array of seeders
      const filteredSeeders = seeders.filter(seeder => seeder.role === "Chủ sở hữu");
      const count = filteredSeeders.length;
      setSeederCount(count);
    } catch (error) {
      console.error("Error fetching seeder count:", error);
      setError("Error fetching seeder count");
    }
  };
  

  const fetchUserCount = async () => {
    try {
      const response = await axios.get("http://localhost:8000/api/get-user");
      const users = response.data; // Assuming the response is an array of users
      const count = users.length;
      setUserCount(count);
    } catch (error) {
      console.error("Error fetching user count:", error);
      setError("Error fetching user count");
    }
  };
  return (
    <div className="dashboard">
        <div id="wrapper" className="bg-danger">
          <ul className="navbar-nav bg-danger-primary sidebar sidebar-dark accordion" id="accordionSidebar">
            <a className="sidebar-brand d-flex align-items-center justify-content-center" href="index.html">
              <div className="sidebar-brand-icon rotate-n-15">
               
              </div>
              <Navbar.Brand href="Dashboard" className="sidebar-brand-text mx-3 ">DREAMHOME </Navbar.Brand>
</a>
<hr className="sidebar-divider my-0"/>      
            <li className="nav-item active">
              <a className="nav-link" href="index.html">
                
                <span>Dashboard</span></a>
            </li>   
            <hr className="sidebar-divider" />  
            <div className="sidebar-heading">
              Interface
            </div>
            <li className="nav-item">
              <a className="nav-link collapsed" href="#" data-toggle="collapse" data-target="#collapseUtilities" aria-expanded="true" aria-controls="collapseUtilities">
                <Nav.Link href="Report">Report</Nav.Link>
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link collapsed" href="#" data-toggle="collapse" data-target="#collapseUtilities" aria-expanded="true" aria-controls="collapseUtilities">
                <Nav.Link href="List_user">List_User</Nav.Link>
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link collapsed" href="#" data-toggle="collapse" data-target="#collapseUtilities" aria-expanded="true" aria-controls="collapseUtilities">
                
                <Nav.Link href="List_seeder">List_Seeder</Nav.Link>
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link collapsed" href="#" data-toggle="collapse" data-target="#collapseTwo" aria-expanded="true" aria-controls="collapseTwo">
              
                <Nav.Link href="List_apartment">List_Apartment</Nav.Link>
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link collapsed" href="#" data-toggle="collapse" data-target="#collapseTwo" aria-expanded="true" aria-controls="collapseTwo">
              
                <Nav.Link href="List_address">List_Addresses</Nav.Link>
              </a>
            </li>
            <hr className="sidebar-divider" />
          
            <li className="nav-item">
              <a className="nav-link" href="charts.html">
                
                <span>Charts</span></a>
            </li>
            
            <li className="nav-item">
              <a className="nav-link" href="tables.html">
             
                <span>Tables</span></a>
            </li>
            
            <hr className="sidebar-divider d-none d-md-block" />
          
           
          </ul>
          
          <div id="content-wrapper" className="d-flex flex-column"  >
           
            <div id="content">
             
              <nav className="navbar navbar-expand navbar-light bg-white topbar mb-4 static-top shadow">
          
                <button id="sidebarToggleTop" className="btn btn-link d-md-none rounded-circle mr-3">
                  <i className="fa fa-bars" />
                </button>
<form className="d-none d-sm-inline-block form-inline mr-auto ml-md-3 my-2 my-md-0 mw-100 navbar-search">
                  <div className="input-group">
                    <input type="text" className="form-control bg-light border-0 small" placeholder="Search for..." aria-label="Search" aria-describedby="basic-addon2" />
                    <div className="input-group-append">
                      <button className="btn btn-danger" type="button">
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
                    <a className="nav-link dropdown-toggle" href="#" id="userDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                      <span className="mr-2 d-none d-lg-inline text-gray-600 small">Tran Quoc Huu</span>
                      <img className="img-profile rounded-circle" src="https://png.pngtree.com/template/20190716/ourlarge/pngtree-farm-linear-cartoon-logo-design-image_226684.jpg" />
                    </a>
                   
                   
                  </li>
                </ul>
              </nav>        
              <div className="container-fluid">         
                <div className="d-sm-flex align-items-center justify-content-between mb-4">
                  <h1 className="h3 mb-0 text-gray-800" >Hello Boss</h1>
                  <a href="#" className="d-none d-sm-inline-block btn btn-sm btn-danger shadow-sm"><i className="fas fa-download fa-sm text-white-50" /> Generate Report</a>
                </div>       
                <div className="row">          
                  <div className="col-xl-3 col-md-6 mb-4">
                    <div className="card border-left-primary shadow h-100 py-2">
                      <div className="card-body">
                        <div className="row no-gutters align-items-center">
                          <div className="col mr-2">
                            <div className="text-xs font-weight-bold text-primary text-uppercase mb-1">
                              Amount Users</div>
                              <div className="row no-gutters align-items-center">
                              <div className="col-auto">
                                <div className="h5 mb-0 mr-3 font-weight-bold text-gray-800"></div>
                              </div>
                              <div className="col">
                              <div className="card-body">{userCount}</div>
                              </div>
                            </div>
                          </div>
                          <div className="col-auto">
                            <i className="fas fa-calendar fa-2x text-gray-300" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>         
                  <div className="col-xl-3 col-md-6 mb-4">
                    <div className="card border-left-success shadow h-100 py-2">
                      <div className="card-body">
                        <div className="row no-gutters align-items-center">
                          <div className="col mr-2">
                            <div className="text-xs font-weight-bold text-success text-uppercase mb-1">
                              Amount Seeder</div>
<div className="row no-gutters align-items-center">
<div className="col-auto">
                                <div className="h5 mb-0 mr-3 font-weight-bold text-gray-800"></div>
                              </div>
                              <div className="col">
                              <div className="card-body">{seederCount}</div>
                              </div>
                              </div>
                          </div>
                          <div className="col-auto">
                            <i className="fas fa-dollar-sign fa-2x text-gray-300" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>          
                  <div className="col-xl-3 col-md-6 mb-4">
                    <div className="card border-left-info shadow h-100 py-2">
                      <div className="card-body">
                        <div className="row no-gutters align-items-center">
                          <div className="col mr-2">
                            <div className="text-xs font-weight-bold text-info text-uppercase mb-1">
                              Amount Apartment
                            </div>
                            <div className="row no-gutters align-items-center">
                              <div className="col-auto">
                                <div className="h5 mb-0 mr-3 font-weight-bold text-gray-800"></div>
                              </div>
                              <div className="col">
                              <div className="card-body">{apartmentCount}</div>
                              </div>
                            </div>
                          </div>
                          <div className="col-auto">
                            <i className="fas fa-clipboard-list fa-2x text-gray-300" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>         
                  <div className="col-xl-3 col-md-6 mb-4">
                    <div className="card border-left-warning shadow h-100 py-2">
                      <div className="card-body">
                        <div className="row no-gutters align-items-center">
                          <div className="col mr-2">
                            <div className="text-xs font-weight-bold text-warning text-uppercase mb-1">
                              Amount Address</div>
                              <div className="row no-gutters align-items-center">
                              <div className="col-auto">
                                <div className="h5 mb-0 mr-3 font-weight-bold text-gray-800"></div>
                              </div>
                              <div className="col">
                              <div className="card-body">{addressCount}</div>
                              </div>
</div>
                          </div>
<div className="col-auto">
                            <i className="fas fa-comments fa-2x text-gray-300" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>          
                <div className="row">
                </div>          
                <div className="row">              
                </div>
              </div>  
             
               
            </div>   
          
               
          </div>     
        </div> 
       
        
      </div>
  );
};
export default Dashboard;