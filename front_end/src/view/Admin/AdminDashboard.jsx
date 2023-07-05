import "../../assets/style/Dashboard.css";
import React, { useEffect, useState } from "react";
import axios from 'axios';
import AdminCount from "./AdminCount";
import AdminLeftMenu from "./AdminLeftMenu";
import AdminHeader from "./AdminHeader";
const AdminDashboard = () => {
  const [apartmentCount, setApartmentCount] = useState(0);
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



  const api = axios.create({
    baseURL: 'http://localhost:8000/api',
  });


  const fetchApartmentCount = async () => {
  try {
    const response = await api.get("/get-apartment");
    const apartments = response.data;
    const count = apartments.length;
    setApartmentCount(count);
  } catch (error) {
    console.error("Error fetching apartment count:", error);
    setError("Error fetching apartment count");
  }
};

const fetchAddressCount = async () => {
  try {
    const response = await api.get("/get-address");
    const addresses = response.data;
    const count = addresses.length;
    setAddressCount(count);
  } catch (error) {
    console.error("Error fetching address count:", error);
    setError("Error fetching address count");
  }
};
const fetchSeederCount = async () => {
  try {
    const response = await api.get("/get-user");
    const seeders = response.data;
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
    const response = await api.get("/get-user");
    const users = response.data;
    const count = users.length;
    setUserCount(count);} catch (error) {
      console.error("Error fetching user count:", error);
      setError("Error fetching user count");
    }
  };
  const fetchContractCount = async () => {
    try {
      const response = await api.get("/get-contract");
      const contracts = response.data;
      const count = contracts.length;
      setContractCount(count);
    } catch (error) {
      console.error("Error fetching contract count:", error);
      setError("Error fetching contracts count");
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
                    title="Amount Seeder"
                    count={seederCount}
                    iconClass="fa-calendar"
                    colorClass="primary"
                  />
                   <AdminCount
                    title="Amount User"
                    count={userCount}
                    iconClass="fa-dollar-sign"
                    colorClass="success"
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
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
  );

};
export default AdminDashboard;