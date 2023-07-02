import "../../assets/style/Dashboard.css";
import React, { useEffect, useState } from "react";
import axios from 'axios';
import AdminCount from "./AdminCount";
import { BrowserRouter } from "react-router-dom";
import AdminLeftMenu from "./AdminLeftMenu";
import AdminHeader from "./AdminHeader";
const AdminDashboard = () => {
  const [apartmentCount, setApartmentCount] = useState(0);
  const [addressCount, setAddressCount] = useState(0);
  const [seederCount, setSeederCount] = useState(0);
  const [userCount, setUserCount] = useState(0);
  const [contractCount, setContractCount] = useState(0);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchApartmentCount();
    fetchSeederCount();
    fetchUserCount();
    fetchAddressCount();
    fetchContractCount();
    const interval = setInterval(() => {
      setSeederCount((prevCount) => {
        if (prevCount < 100) {
          return prevCount + 1;
        } else {
          clearInterval(interval);
          return prevCount;
        }
      }
      );
      setAddressCount((prevCount) => {
        if (prevCount < 100) {
          return prevCount + 1;
        } else {
          clearInterval(interval);
          return prevCount;
        }
      }
      );
      setApartmentCount((prevCount) => {
        if (prevCount < 100) {
          return prevCount + 1;
        } else {
          clearInterval(interval);
          return prevCount;
        }
      }
      );
      setUserCount((prevCount) => {
        if (prevCount < 100) {
          return prevCount + 1;
        } else {
          clearInterval(interval);
          return prevCount;
        }
      }
      );
      setContractCount((prevCount) => {
        if (prevCount < 100) {
          return prevCount + 1;
        } else {
          clearInterval(interval);
          return prevCount;
        }
      }
      );
    }, 10);

    return () => {
      clearInterval(interval);
    };
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
  const fetchContractCount = async () => {
    try {
      const response = await axios.get("http://localhost:8000/api/get-contract");
      const contracts = response.data; // Assuming the response is an array of users
      const count = contracts.length;
      setContractCount(count);
    } catch (error) {
      console.error("Error fetching contract count:", error);
      setError("Error fetching contract count");
    }
  };
  return (
      <div className="dashboard">
        <div id="wrapper">
          <AdminLeftMenu />
          <div id="content-wrapper" className="d-flex flex-column">
            <AdminHeader />
            <div id="content">
              <div className="container-fluid">
                <div className="d-sm-flex align-items-center justify-content-between mb-4">
                  <h1 className="h3 mb-0 text-gray-800">Hello Boss</h1>
                  <a
                    href="#"
                    className="d-none d-sm-inline-block btn btn-sm btn-secondary shadow-sm"
                  >
                    <i className="fas fa-download fa-sm text-white-50" /> Generate Report
                  </a>
                </div>
                <div className="row">
                  <AdminCount
                    title="Amount Seeder/Users"
                    count={`${seederCount}/${userCount}`}
                    iconClass="fa-calendar"
                    colorClass="primary"
                  />
                  <AdminCount
                    title="Amount Contracts"
                    count={contractCount}
                    iconClass="fa-dollar-sign"
                    colorClass="success"
                  />
                  <AdminCount
                    title="Amount Apartment"
                    count={apartmentCount}
                    iconClass="fa-clipboard-list"
                    colorClass="info"
                  />
                  <AdminCount
                    title="Amount Address"
                    count={addressCount}
                    iconClass="fa-comments"
                    colorClass="warning"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
  );

};
export default AdminDashboard;