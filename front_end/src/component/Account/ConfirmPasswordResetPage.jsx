import React, { useState } from 'react';
import '../../assets/style/Form.css';

function ConfirmPasswordResetPage({ email, resetCode }) {
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    // Gửi yêu cầu đặt lại mật khẩu đến Laravel
    fetch('/api/password/reset', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        verificationCode: resetCode,
        newPassword,
        newPassword_confirmation: confirmPassword,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        // Xử lý phản hồi từ Laravel
        console.log(data);
        // Thực hiện các thao tác phù hợp (hiển thị thông báo, chuyển hướng, vv.)
        setMessage(data.message);
      })
      .catch((error) => {
        // Xử lý lỗi (hiển thị thông báo lỗi, vv.)
        console.error(error);
        setMessage('Error occurred while resetting password.');
      });
  };

  return (
    <form onSubmit={handleSubmit} className='new_password'>
      <label>
        New Password:
        <input
          type="password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
        />
      </label>
      <br />
      <label>
        Confirm Password:
        <input
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
      </label>
      <br />
      <button type="submit">Reset Password</button>
      {message && <div>{message}</div>}
    </form>
  );
}

export default ConfirmPasswordResetPage;
