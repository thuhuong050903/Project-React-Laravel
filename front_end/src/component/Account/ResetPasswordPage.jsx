import { useState } from "react";
import axios from "axios";
import '../../assets/style/Form.css';
export default function ResetPasswordPage() {
  const [email, setEmail] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleResetPassword = () => {
    // Gửi yêu cầu đặt lại mật khẩu tới server
    axios
      .post("http://localhost:8000/api/reset-password", { email })
      .then((response) => {
        setSuccessMessage("Vui lòng kiểm tra email để lấy mã xác nhận.");
      })
      .catch((error) => {
        setErrorMessage("Đã xảy ra lỗi khi đặt lại mật khẩu.");
      });
  };

  return (
    <div className="form_group">
      {successMessage && <div>{successMessage}</div>}
      {errorMessage && <div>{errorMessage}</div>}
      <h1>Reset Password</h1>
      <div>
        <label>Email:</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <button onClick={handleResetPassword}>Submit</button>
    </div>
  );
}
