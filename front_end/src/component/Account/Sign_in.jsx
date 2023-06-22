// Sign_in.js
import { useState } from "react";
import AuthUser from '../AuthUser';
import ResetPasswordPage from "./ResetPasswordPage";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebookSquare, faInstagram, faTwitterSquare } from '@fortawesome/free-brands-svg-icons';
import '../../assets/style/Sign_in.css'
export default function Sign_in() {
  const [role,setRole] = useState("");
  const { http, setToken } = AuthUser();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isForgotPassword, setIsForgotPassword] = useState(false);
  const [resetToken, setResetToken] = useState("");
  
  const submitForm = () => {
    // Send login request
    http.post('/login', { email: email, password: password })
      .then((res) => {
        const { user, access_token, role } = res.data;
        setToken(user, access_token);
        
        // // Redirect based on the user's role
        // if (role === 'Nguoi cho thue') {
        //   // Redirect to the nguoi_cho_thue page
        //   window.location.href = '/seeder';
        // } else if (role === 'admin') {
        //   // Redirect to the admin page
        //   window.location.href = '/admin';
        // } else if (role === 'Nguoi thue') {
        //   // Redirect to the nguoi_thue page
        //   window.location.href = '/';
        // }
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
    <div className="signin-container">
      <div className="row signin-form">
        <div className="col-sm-6 form-right">
        <div className="social-icons">
                    <FontAwesomeIcon className="icon" icon={faFacebookSquare} />
                    <FontAwesomeIcon className="icon" icon={faInstagram} />
                    <FontAwesomeIcon className="icon" icon={faTwitterSquare} />
                    </div>
                    <h1 className="signin-welcome">Welcome Back!</h1>
                    <h3 className="signin-title">To keep connected with us please login with your personal info
                    </h3>
                    <button type="button" onClick={submitForm} className="signin-mt-6">Đăng kí</button>
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
              <h1 className="text-center mb-3">Login</h1>
              <div className="form-group">
                <label>Email address:</label>
                <input
                  type="email"
                  className="form-control"
                  placeholder="Enter email"
                  onChange={(e) => setEmail(e.target.value)}
                  id="email"
                />
              </div>
              <div className="form-group mt-3">
                <label>Password:</label>
                <input
                  type="password"
                  className="form-control"
                  placeholder="Enter password"
                  onChange={(e) => setPassword(e.target.value)}
                  id="pwd"
                />
              </div>
              <button
                type="button"
                onClick={submitForm}
                className="mt-4"
              >
                Login
              </button>
              <div className="text-center mt-3">
                <a href="#" onClick={handleForgotPassword}>
                  Forgot Password?
                </a>
              </div>
            </>
          )}
        </div>
      </div>
    </div></div>
  );
}
