import React from "react";
import HeaderManagement from "./view/Management/HeaderManagement";
// import DashboardManagement from "./view/Management/DashboardManagement";
import MenuManagement from "./view/Management/MenuManagement";
import { Route, Routes } from "react-router-dom";
import Confirmappointment from "./view/Management/Shows/ConfirmAppointment";
import Contact from "./view/Management/Shows/Contract";
import Apartment from "./view/Management/Shows/Apartment";


function AppManagement() {
  return <div className="Wrapper">

    <HeaderManagement></HeaderManagement>
    <div className="content-wrapper">
       
          <div className="content-header">
            <div className="container-fluid">
              <div className="row mb-2">               
                  <Routes>
                  <Route exact path="/confirmappointment" element={< Confirmappointment/>}></Route>
                  <Route path="/contact" element={< Contact/>}></Route>
                  <Route path="/apartment" element={<Apartment user_id="1" />} />
                  </Routes>
              </div>
            </div>     
          </div>

          <section className="content">
            <div className="container-fluid">

            </div>
          </section>
        </div>
    
    <MenuManagement></MenuManagement>
  </div>;
}


export default AppManagement;