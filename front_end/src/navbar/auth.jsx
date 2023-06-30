import { Routes, Route, Link, useParams } from "react-router-dom";
import Home from "../view/User/Home";
import Introduce from "../view/User/Introduce";
import Co_Living from "../view/User/Co_Living";
import Dashboard from "../component/Common/Dashboard";
import DashboardManagement from "../view/Management/DashboardManagement";
import AuthUser from "../component/AuthUser";
import "../assets/style/auth.css";
import { NavDropdown } from 'react-bootstrap';
import { useEffect, useState } from "react";
import List_Apartment from "../view/User/List_Apartment";
import Detail from "../view/User/Detail";
import AppManagement from "../AppManagement";
import Apartment from "../view/Management/Shows/Apartment";
import Footer from "../component/Common/Footer";
import App_admin from "../App_admin";
import { Navbar, Nav } from 'react-bootstrap';
import HeaderManagement from "../view/Management/HeaderManagement";
import MenuManagement from "../view/Management/MenuManagement";
import ConfirmAppointment from "../view/Management/Shows/ConfirmAppointment";
import History from "../view/User/History";
function Auth({ id }) {
  const { token, logout } = AuthUser();
  const [hasAlertShown, setHasAlertShown] = useState(false);
  const [redirectAdmin, setRedirectAdmin] = useState(false);
  const { http } = AuthUser();
  const [userdetail, setUserdetail] = useState(null);
  const [showDropdown1, setShowDropdown1] = useState(false);
  const [showDropdown2, setShowDropdown2] = useState(false);

  const logoutUser = () => {
    if (token !== undefined) {
      logout();
    }
  };

  const fetchUserDetail = () => {
    http.post("/me").then((res) => {
      setUserdetail(res.data);
    });
  };
  useEffect(() => {
    fetchUserDetail();
  }, []);

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
        <div className="main-user-container">
        <div className="auth-header">
          <Nav.Link href="/" className="dreamhome">
        <img src={`http://localhost:8000/photos/LogoWeb.png`} style={{ width: '7rem' }}></img>
        </Nav.Link>
      <NavDropdown
        title="Loại phòng"
        className="custom-dropdown"        
        show={showDropdown1}
        onMouseEnter={() => setShowDropdown1(true)}
        onMouseLeave={() => setShowDropdown1(false)}
      >
        <NavDropdown.Item href="/ShowApartment">Phòng dài hạn</NavDropdown.Item>
        <NavDropdown.Item href="/AnotherPage">Phòng ngắn hạn</NavDropdown.Item>
      </NavDropdown>
      <NavDropdown
        title="Tùy chọn"
        className="custom-dropdown"        

        show={showDropdown2}
        onMouseEnter={() => setShowDropdown2(true)}
        onMouseLeave={() => setShowDropdown2(false)}
      >
        <NavDropdown.Item href={`/History/${userdetail.id}`}>Lịch sử</NavDropdown.Item>
          <NavDropdown.Item href="/AnotherPage">Thông tin cá nhân</NavDropdown.Item>
        <NavDropdown.Item href="/AnotherPage">Yêu cầu sửa chữa</NavDropdown.Item>
        <NavDropdown.Item href="/AnotherPage">Đánh giá</NavDropdown.Item>
      </NavDropdown>
      <Nav.Link href="/Introduce" className="header-item">Giới thiệu</Nav.Link>
      <Nav.Link href="/Co_Living" className="header-item">Co-Living</Nav.Link>
      <Nav.Link href="#" className="header-item">Dịch vụ</Nav.Link>
     
      <div className="rectangle-parent23">
        <Nav.Link href="/sign_in" onClick={logoutUser} className="header-logout">Đăng xuất</Nav.Link>
      </div>
         
        </div>
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="Introduce" element={<Introduce />} />
            <Route path="Co_Living" element={<Co_Living />} />
            <Route path="ShowApartment" element={<List_Apartment />} />
            <Route path="apartment/:id" element={<Detail />} />
            <Route path="formBook/:id" />
            <Route path="/History/:userId" element={<History/>}></Route>
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
