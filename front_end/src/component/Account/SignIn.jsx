import React, { useState, useEffect } from "react";
import { Navbar, Nav, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import AuthUser from '../AuthUser';
import ResetPasswordPage from "./ResetPasswordPage";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebookSquare, faInstagram, faTwitterSquare } from '@fortawesome/free-brands-svg-icons';
import '../../assets/style/SignIn.css';

export default function SignIn() {
  const { http, setToken } = AuthUser();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isForgotPassword, setIsForgotPassword] = useState(false);
  const [resetToken, setResetToken] = useState("");

  useEffect(() => {
    const user = JSON.parse(sessionStorage.getItem('user'));
    if (user && user.role === 'admin') {
      window.location.href = '/admin/dashboard';
    }
  }, []);

  const submitForm = () => {
    http.post('/login', { email: email, password: password })
      .then((res) => {
        const { user, access_token,} = res.data;

        if (user.status === "Active") {
          setToken(user, access_token);
          window.location.reload(); // Refresh the page after successful login

        }
        else if (user.status === "Block") {
          alert("Tài khoản của bạn bị khóa! Vui lòng liên hệ admin!")
          console.log("User is blocked and cannot login.");
        } else {
          console.log("Unknown user status.");
        }
      });
  };

  const handleForgotPassword = () => {
    setIsForgotPassword(true);
  };

  const handleResetPassword = () => {
    // Gửi yêu cầu đặt lại mật khẩu
    http.post("/reset-password", { email: email })
      .then((res) => {
        setResetToken(res.data.resetToken);
        setIsForgotPassword(true);
      });
  };

  const handleSetNewPassword = (newPassword) => {
    // Gửi yêu cầu đặt lại mật khẩu mới
    http.post("/confirm-password-reset", { verificationCode: resetToken, newPassword })
      .then((res) => {
        // Xử lý thành công, bạn có thể thực hiện hành động bổ sung ở đây, ví dụ: chuyển hướng đến trang đăng nhập, hiển thị thông báo thành công, v.v.
      });
  };

  return (
    <div className="signin-container" style={{width:"60%"}}>
      <div className="row signin-form">
        <div className="col-sm-6 form-right">
          <div className="social-icons">
            <FontAwesomeIcon className="icon" icon={faFacebookSquare} />
            <FontAwesomeIcon className="icon" icon={faInstagram} />
            <FontAwesomeIcon className="icon" icon={faTwitterSquare} />
          </div>
          <h1 className="signin-welcome">Chào mừng bạn trở lại!</h1>
          <h3 className="signin-title">Hãy đăng nhập để khám phá nhiều căn hộ đẹp</h3>

          <Button href="/sign-up" className="" style={{ fontWeight: 500, fontSize: '1rem', backgroundColor: '#ffffff', color: 'black',border:"none"}}>Đăng kí</Button>
        </div>
        <div className="col-sm-6 form-left">
          <div className="signin-p-4">
            {isForgotPassword ? (
              <ResetPasswordPage
                email={email}
                setNewPassword={handleSetNewPassword}
              />
            ) : (
              <>
                <h1 className="text-center mb-3">Đăng nhập</h1>
                <div className="form-group">
                  <label>Email: </label>
                  <input
                    type="email"
                    className="form-control"
                    placeholder="Enter email"
                    onChange={(e) => setEmail(e.target.value)}
                    id="email"
                  />
                </div>
                <div className="form-group mt-3">
                  <label>Mật khẩu:</label>
                  <input
                    type="password"
                    className="form-control"
                    placeholder="Enter password"
                    onChange={(e) => setPassword(e.target.value)}
                    id="pwd"
                  />
                </div>
                <Button
                  variant="primary"
                  type="button"
                  onClick={submitForm}
                  className="mt-4"
                  style={{backgroundColor:"#DA291C", border:"none", marginTop:"1rem", marginLeft:"0rem", width:"7rem"  }}            >
                  Đăng nhập
                </Button>
                <div className="text-center mt-3" >
                  <Link to="#" onClick={handleForgotPassword}>
                    Quên mật khẩu?
                  </Link>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
