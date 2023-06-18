import { useState } from "react";
import axios from "axios";

export default function ConfirmPasswordResetPage() {
  const [verificationCode, setVerificationCode] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleConfirmPasswordReset = () => {
    // Gửi yêu cầu xác nhận mã và đặt lại mật khẩu tới server
    axios
      .post("http://localhost:8000/api/confirm-password-reset", {
        verificationCode,
        newPassword,
      })
      .then((response) => {
        setSuccessMessage("Mật khẩu đã được đặt lại thành công.");
      })
      .catch((error) => {
        setErrorMessage("Đã xảy ra lỗi khi xác nhận và đặt lại mật khẩu.");
      });
  };

  return (
    <div>
      {successMessage && <div>{successMessage}</div>}
      {errorMessage && <div>{errorMessage}</div>}
      <h1>Confirm Password Reset</h1>
      <div>
        <label>Verification Code:</label>
        <input
          type="text"
          value={verificationCode}
          onChange={(e) => setVerificationCode(e.target.value)}
        />
      </div>
      <div>
        <label>New Password:</label>
        <input
          type="password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
        />
      </div>
      <button onClick={handleConfirmPasswordReset}>Submit</button>
    </div>
  );
}
