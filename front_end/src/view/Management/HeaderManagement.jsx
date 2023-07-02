import { useEffect, useState } from "react";
import AuthUser from "../../component/AuthUser";



function HeaderManagement() {
  const { token, logout } = AuthUser();
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
    http.post("/me").then((res) => {
      setUserdetail(res.data);
    });
  };
  return (
    <div>
      <nav className="main-header navbar navbar-expand navbar-white navbar-light">
        <ul className="navbar-nav">
          <li className="nav-item"></li>
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
          {userdetail && (
            <>
              <li className="nav-item">
                <span className="nav-link">
                  Xin chào, {userdetail.fullname}
                </span>
              </li>
              <li className="nav-item">
            <button type="button" className="btn btn-primary" onClick={logoutUser}>
              Đăng Xuất
            </button>
          </li>
            </>
          )}
          
        </ul>
      </nav>
    </div>
  );
}

export default HeaderManagement;
