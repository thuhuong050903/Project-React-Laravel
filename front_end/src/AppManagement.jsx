import React from "react";
import { useParams } from "react-router-dom";
import HeaderManagement from "./view/Management/HeaderManagement";
import MenuManagement from "./view/Management/MenuManagement";
import { Route, Routes } from "react-router-dom";
import Confirmappointment from "./view/Management/Shows/ConfirmAppointment";
import Contact from "./view/Management/Shows/Contract";
import Apartment from "./view/Management/Shows/Apartment";

function AppManagement() {
  const { id } = useParams(); // Lấy ID từ URL

  return (
    <div className="Wrapper">
      <div className="content-wrapper">
        <div className="content-header">
          <div className="container-fluid">
            <div className="row mb-2">
              <Routes>
                <Route
                  exact
                  path="/confirmappointment"
                  element={<Confirmappointment />}
                ></Route>
                <Route path="/contact" element={<Contact />} />
                <Route
                  path="/apartment"
                  element={<Apartment user_id={id} />} // Truyền ID người dùng vào prop user_id
                />
              </Routes>
            </div>
          </div>
        </div>

        <section className="content">
          <div className="container-fluid"></div>
        </section>
      </div>

    </div>
  );
}

export default AppManagement;
