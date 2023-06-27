import { Routes, Route, Link, useParams } from "react-router-dom";
import Home from "../view/User/Home";
import Introduce from "../view/User/Introduce";
import Co_Living from "../view/User/Co_Living";
import Dashboard from "../component/Common/Dashboard";
import DashboardManagement from "../view/Management/DashboardManagement";
import AuthUser from "../component/AuthUser";
import "../assets/style/auth.css";
import { useEffect, useState } from "react";
import List_Apartment from "../view/User/List_Apartment";
import Detail from "../view/User/Detail";
import AppManagement from "../AppManagement";
import Apartment from "../view/Management/Shows/Apartment";
import Footer from "../component/Common/Footer";
import App_admin from "../App_admin";
import HeaderManagement from "../view/Management/HeaderManagement";
import MenuManagement from "../view/Management/MenuManagement";
import ConfirmAppointment from "../view/Management/Shows/ConfirmAppointment";
function Auth({ id }) {
  const { token, logout } = AuthUser();
  const [hasAlertShown, setHasAlertShown] = useState(false);
  const [redirectAdmin, setRedirectAdmin] = useState(false);
  const { http } = AuthUser();
  const [userdetail, setUserdetail] = useState(null);

  const logoutUser = () => {
    if (token !== undefined) {
      logout();
    }
  };

  useEffect(() => {
    fetchUserDetail();
  }, []);

  const fetchUserDetail = () => {
    http.post("/me").then((res) => {
      setUserdetail(res.data);
    });
  };

  useEffect(() => {
    if (userdetail?.role === "Nguoi cho thue" && !hasAlertShown) {
      alert("Bạn đã đăng nhập với tư cách chủ sở hữu");
      setHasAlertShown(true);
    } else if (userdetail?.role === "Nguoi thue" && !hasAlertShown) {
      setHasAlertShown(true);
    }
  }, [userdetail, hasAlertShown]);

  return (
    <div>
      {userdetail?.role === "Nguoi thue" ? (
        <div className="auth-header">
          <nav className="navbar navbar-expand-sm">
            <ul className="navbar-nav list-item">
              <li className="dreamhome">
                <Link className="dreamhome-link" to="/">
                  DreamHome
                </Link>
              </li>

              <li className="item-header">
                <Link className="item-header-link" to="/Introduce">
                  Giới thiệu
                </Link>
              </li>
              <li className="item-header">
                <Link className="item-header-link" to="/Co_Living">
                  Co_Living
                </Link>
              </li>
              <li className="item-header">
                <Link className="item-header-link" to="/Co_Living">
                  Đối tác
                </Link>
              </li>
              <li className="item-header">
                <Link className="item-header-link" to="/Co_Living">
                  Tin tức
                </Link>
              </li>
              <li className="item-header">
                <Link className="item-header-link" to="/Co_Living">
                  Dịch vụ
                </Link>
              </li>
              <li className="item-header">
                <Link className="item-header-link" to="/ShowApartment">
                  Loại phòng
                </Link>
              </li>

              {userdetail && (
                <>
                  <li className="item-header">
                    <span className="item-header-link greeting">
                      Xin chào, {userdetail.username}
                    </span>
                  </li>
                  <li className="item-header">
                    <Link
                      className="item-header-link settings-link"
                      to="/dashboard"
                    >
                      Cài đặt
                    </Link>
                  </li>
                  <li className="item-header">
                    <span
                      role="button"
                      className=" logout-button"
                      onClick={logoutUser}
                    >
                      Logout
                    </span>
                  </li>
                </>
              )}
            </ul>
          </nav>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="Introduce" element={<Introduce />} />
            <Route path="Co_Living" element={<Co_Living />} />
            <Route path="ShowApartment" element={<List_Apartment />} />
            <Route path="apartment/:id" element={<Detail />} />
            <Route path="formBook/:id" />
          </Routes>
          <Footer></Footer>
        </div>
      ) : userdetail?.role === "Nguoi cho thue" ? (
        <div>
          <HeaderManagement></HeaderManagement>
          <Routes>
            <Route path="/" element={<AppManagement id={id} />} />
            <Route
              path="/apartment"
              element={<Apartment user_id={id} />} // Truyền ID người dùng vào prop user_id
            />
            <Route
              path="/confirmappointment"
              element={<ConfirmAppointment />}
            ></Route>
          </Routes>
          <MenuManagement></MenuManagement>
        </div>
      ) : null}
    </div>
  );
}

export default Auth;
