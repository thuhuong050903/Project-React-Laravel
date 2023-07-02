import React, { useState } from 'react';
import '../../assets/style/UserProfile.css'
const UserProfile = () => {
  const user = JSON.parse(sessionStorage.getItem('user'));
  const [formData, setFormData] = useState({
    username: user.username,
    email: user.email,
    phone: user.phone,
    birthday: user.birthday,
    fullname: user.fullname,
    address: user.address,
    role: user.role
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      // Gửi yêu cầu HTTP để cập nhật dữ liệu người dùng
      const response = await axios.put('', formData);
  
      // Kiểm tra kết quả từ API và xử lý tương ứng
      if (response.status === 200) {
        // Cập nhật thành công, xử lý tiếp theo (ví dụ: hiển thị thông báo thành công)
      } else {
        // Cập nhật thất bại, xử lý tiếp theo (ví dụ: hiển thị thông báo lỗi)
      }
    } catch (error) {
      // Xử lý lỗi khi gửi yêu cầu HTTP (ví dụ: hiển thị thông báo lỗi)
    }
    console.log(formData);
  };

  return (
    <div className="profile-container">
      <div className="row gutters">
        <div className="col-xl-3 col-lg-3 col-md-12 col-sm-12 col-12">
          <div className="card h-100">
            <div className="card-body">
              <div className="account-settings">
                <div className="user-profile">
                  <div className="user-avatar">
                    <img
                      src="https://bootdey.com/img/Content/avatar/avatar7.png"
                      alt="Maxwell Admin"
                    />
                  </div>
                  <h5 className="user-name">{formData.username}</h5>
                  <h6 className="user-email">{formData.email}</h6>
                </div>
                <div className="about">
                  <h5>About</h5>
                  <p>
                    I'm Yuki. Full Stack Designer I enjoy creating user-centric, delightful
                    and human experiences.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-xl-9 col-lg-9 col-md-12 col-sm-12 col-12">
          <div className="card h-100">
            <div className="card-body">
              <form onSubmit={handleSubmit}>
                <div className="row gutters">
                  <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                    <h6 className="mb-2 text-primary">Thông tin cá nhân</h6>
                  </div>
                  <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                    <div className="form-group">
                      <label for="fullName">Tên tài khoản</label>
                      <input type="text" className="form-control" id="userName"
                        name="userName"
                        value={formData.username}
                        onChange={handleChange} placeholder="Nhập thông tin tài khoản" />
                    </div>
                  </div>
                  <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                    <div className="form-group">
                      <label for="eMail">Email</label>
                      <input type="email" className="form-control" id="eMail" value={formData.email} onChange={handleChange} placeholder="Enter email ID" />
                    </div>
                  </div>
                  <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                    <div className="form-group">
                      <label for="phone">Số điện thoại</label>
                      <input type="text" className="form-control" id="phone" value={formData.phone} onChange={handleChange} placeholder="Enter phone number" />
                    </div>
                  </div>
                  <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                    <div className="form-group">
                      <label for="website">Ngày sinh</label>
                      <input type="url" className="form-control" id="website" value={formData.birthday} placeholder="Website url" />
                    </div>
                  </div>
                  <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                    <div className="form-group">
                      <label for="website">Ngày sinh</label>
                      <input type="url" className="form-control" id="website" value={formData.address} placeholder="Website url" />
                    </div>
                  </div>
                  <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                    <div className="form-group">
                      <label htmlFor="role">Vai trò</label>
                      <select
                        className="form-control"
                        id="role"
                        name="role"
                        value={formData.role}
                        onChange={handleChange}
                      >
                        <option value="">Chọn vai trò</option>
                        <option value="Nguoi cho thue">Chủ sở hữu</option>
                        <option value="Nguoi thue">Người thuê</option>
                      </select>
                    </div>
                  </div>


                </div>

                <div className="row gutters">
                  <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                    <div className="text-right">
                      <button type="button" className="btn btn-secondary">
                        Hủy
                      </button>
                      <button type="submit" className="btn btn-primary">
                        Cập nhật
                      </button>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
