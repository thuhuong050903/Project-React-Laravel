// Sign_in.js
import { useState } from "react";
import AuthUser from '../AuthUser';
import ResetPasswordPage from "./ResetPasswordPage";

export default function Sign_in() {
  const { http, setToken } = AuthUser();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isForgotPassword, setIsForgotPassword] = useState(false);
  const [resetToken, setResetToken] = useState("");
  
  const submitForm = () => {
    // Gửi yêu cầu đăng nhập
    http.post('/login', { email: email, password: password })
      .then((res) => {
        setToken(res.data.user, res.data.access_token);
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
    <div className="row justify-content-center pt-5">
      <div className="col-sm-6">
        <div className="card p-4">
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
                className="btn btn-primary mt-4"
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
    </div>
  );
}
