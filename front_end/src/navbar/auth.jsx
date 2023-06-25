import { Routes, Route, Link } from 'react-router-dom';
import Home from '../view/User/Home';
import Introduce from '../view/User/Introduce';
import Co_Living from '../view/User/Co_Living';
import Dashboard from '../component/Common/Dashboard';
import DashboardManagement from '../view/Management/DashboardManagement';
import AuthUser from '../component/AuthUser';
import '../assets/style/auth.css';
import { useEffect, useState } from 'react';
import List_Apartment from '../view/User/List_Apartment';
import Detail from '../view/User/Detail';
import AppManagement from '../AppManagement';
import Footer from '../component/Common/Footer';
import App_admin from '../App_admin';

function Auth() {
  const { token, logout } = AuthUser();
  const [hasAlertShown, setHasAlertShown] = useState(false); // Thêm state cho biến flag
  const [redirectAdmin, setRedirectAdmin] = useState(false); // Thêm state cho chuyển hướng

  const logoutUser = () => {
    if (token != undefined) {
      logout();
    }
  };
  const { http } = AuthUser();
  const [userdetail, setUserdetail] = useState(null);
  useEffect(() => {
    fetchUserDetail();

  }, []);


  const fetchUserDetail = () => {
    // if (userdetail.email === 'huutran@gmail.com' && userdetail.password === '$2y$10$cMSmaYshew6Q.EBx7HFpAe5e/gV/r9ywN/BovcXnguc/hFIioiACi') {
    //   setRedirectAdmin(true); // Chuyển hướng tới trang AppManagement nếu email và mật khẩu hợp lệ
    // }  else{
    http.post('/me').then((res) => {
      setUserdetail(res.data);
       });
  }
  useEffect(() => {
    if (userdetail?.role === 'Nguoi cho thue' && !hasAlertShown) { 
      alert('Bạn đã đăng nhập với tư cách chủ sở hữu');
      setHasAlertShown(true); // Đánh dấu là đã hiển thị alert
    } else if (userdetail?.role === 'Nguoi thue' && !hasAlertShown) { 
      setHasAlertShown(true); // Đánh dấu là đã hiển thị alert
    }
   
  }, [userdetail, hasAlertShown]); 

  // if (redirectAdmin) {
  //   return <Routes>
  //     <Route path="/" element={<App_admin />} />
  //   </Routes>;
  // }

  return (
    <div>
      {userdetail?.role === 'Nguoi thue' ? (
        <div className="auth-header">
          <nav className="navbar navbar-expand-sm ">
            <ul className="navbar-nav list-item">
              <li className="dreamhome">
                <Link className="dreamhome-link" to="/">
                  DreamHome
                </Link>
              </li>
              <li className="item-header">
                <Link className="item-header-link" to="/Introduce">Giới thiệu</Link>
              </li>
              <li className="item-header">
                <Link className="item-header-link" to="/Co_Living">Co_Living</Link>
              </li>
              <li className="item-header">
                <Link className="item-header-link" to="/Co_Living">Đối tác</Link>
              </li>
              <li className="item-header">
                <Link className="item-header-link" to="/Co_Living">Tin tức</Link>
              </li>
              <li className="item-header">
                <Link className="item-header-link" to="/Co_Living">Dịch vụ</Link>
              </li>
              <li className="item-header">
                <Link className="item-header-link" to="/ShowApartment">Loại phòng</Link>
              </li>

              {userdetail && (
                <>
                  <li className="item-header">
                    <span className="item-header-link greeting">
                      Xin chào, {userdetail.username}
                    </span>
                  </li>
                  <li className="item-header">
                    <Link className="item-header-link settings-link" to="/dashboard">
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
      ) 
       : userdetail?.role === 'Nguoi cho thue' ? (
          <Routes>
            <Route path="/" element={<AppManagement/>} />
          </Routes>
        ) : null}
    
    </div>
  );
}

export default Auth;
