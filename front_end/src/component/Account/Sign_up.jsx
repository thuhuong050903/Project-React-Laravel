import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { Navbar, Nav } from 'react-bootstrap';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebookSquare, faInstagram, faTwitterSquare } from '@fortawesome/free-brands-svg-icons';

import AuthUser from '../AuthUser';
import '../../assets/style/Sign_up.css';

export default function Sign_up() {
  const navigate = useNavigate();
  const { http, setToken } = AuthUser();
  const [username, setUsername] = useState('');
  const [fullname, setFullname] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [birthday, setBirthday] = useState('');
  const [role, setRole] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [formErrors, setFormErrors] = useState({});

  const submitForm = (e) => {
    e.preventDefault();
    const isValid = validateForm();

    if (isValid) {
      setIsLoading(true);

      http
        .post("/register", {
          username: username,
          fullname: fullname,
          email: email,
          phone: phone,
          address: address,
          password: password,
          birthday: birthday,
          role: role,
        })
        .then((res) => {
          alert("You registered successfully!");
          navigate("/Sign_in");
        })
        .catch((error) => {
          alert("Email already exists. Please enter a different email!");
          setIsLoading(false);
        });
    }
  };

  const validateForm = () => {
    const errors = {};

    if (!username) {
      errors.username = "Please enter your name";
    }

    if (!fullname) {
      errors.fullname = "Please enter your full name";
    }

    if (!email) {
      errors.email = "Please enter your email";
    }

    if (!phone) {
      errors.phone = "Please enter your phone number";
    }

    if (!address) {
      errors.address = "Please enter your address";
    }

    if (!password) {
      errors.password = "Please enter your password";
    }

    if (!birthday) {
      errors.birthday = "Please enter your birthday";
    }

    if (!role) {
      errors.role = "Please select your role";
    }

    setFormErrors(errors);

    return Object.keys(errors).length === 0;
  };

  return (
    <div className="signup-container">
      <div className="row signup-form">
        <div className="col-lg-6">
          <div className="social-icons">
            <FontAwesomeIcon className="icon" icon={faFacebookSquare} />
            <FontAwesomeIcon className="icon" icon={faInstagram} />
            <FontAwesomeIcon className="icon" icon={faTwitterSquare} />
          </div>
          <h2 className="welcome">Chào mừng đến với DreamHome!</h2>
          <h4 className="signup-title"> Hãy đăng nhập để tìm được căn hộ phù hợp ! </h4>
                    <Nav.Link href="/Sign_in" className="signin-mt-6" style={{fontWeight: 500, fontSize:'1rem', backgroundColor:'#ffffff',color:'black'}}>Đăng nhập</Nav.Link>
        </div>
        <div className="col-sm-6 sign-up-card">
          <div className="p-4">
            <h1 className="text-center mb-3">Tạo tài khoản mới</h1>
            <form onSubmit={submitForm}>
              <div className="form-group">
                <label className="title-title" htmlFor="username">
                  Tên tài khoản:
                </label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Nhập tên"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  id="username"
                  required
                />
                {formErrors.username && <div className="error-message">{formErrors.username}</div>}
              </div>
              <div className="form-group mt-3">
                <label className="title-title" htmlFor="fullname">
                  Tên đầy đủ:
                </label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Tên đầy đủ"
                  value={fullname}
                  onChange={(e) => setFullname(e.target.value)}
                  id="fullname"
                  required
                />
                {formErrors.fullname && <div className="error-message">{formErrors.fullname}</div>}
              </div>
              <div className="form-group mt-3">
                <label className="title-title" htmlFor="email">
                  Email:
                </label>
                <input
                  type="email"
                  className="form-control"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  id="email"
                  required
                />
                {formErrors.email && <div className="error-message">{formErrors.email}</div>}
              </div>
              <div className="form-group mt-3">
                <label className="title-title" htmlFor="phone">
                  Số điện thoại:
                </label>
                <input
                  type="number"
                  className="form-control"
                  placeholder="Số điện thoại"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  id="phone"
                  required
                />
                {formErrors.phone && <div className="error-message">{formErrors.phone}</div>}
              </div>
              <div className="form-group mt-3">
                <label className="title-title" htmlFor="address">
                  Địa chỉ:
                </label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Địa chỉ"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  id="address"
                  required
                />
                {formErrors.address && <div className="error-message">{formErrors.address}</div>}
              </div>
              <div className="form-group mt-3">
                <label className="title-title" htmlFor="pwd">
                  Mật khẩu:
                </label>
                <input
                  type="password"
                  className="form-control"
                  placeholder="Mật khẩu"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  id="pwd"
                  required
                />
                {formErrors.password && <div className="error-message">{formErrors.password}</div>}
              </div>
              <div className="form-group mt-3">
                <label className="title-title" htmlFor="birthday">
                 Ngày sinh:
                </label>
                <input
                  type="date"
                  className="form-control"
                  placeholder="Ngày sinh"
                  value={birthday}
                  onChange={(e) => setBirthday(e.target.value)}
                  id="birthday"
                  required
                />
                {formErrors.birthday && <div className="error-message">{formErrors.birthday}</div>}
              </div>
              <div className="form-group mt-3">
                <label className="title-title" htmlFor="role">
                  Đăng kí với tư cách:
                </label>
                <select
                  className="form-control"
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  id="role"
                  required
                >
                  <option value="">Select role</option>
                  <option value="Nguoi cho thue">Người cho thuê</option>
                  <option value="Nguoi thue">Người thuê</option>
                </select>
                {formErrors.role && <div className="error-message">{formErrors.role}</div>}
              </div>
              <button type="submit" className="mt-4">
                Đăng kí
              </button>
              {isLoading && <div>Loading</div>}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
