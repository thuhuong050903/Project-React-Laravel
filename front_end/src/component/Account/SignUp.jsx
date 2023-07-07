import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { Navbar, Nav, Button, Form, Col } from 'react-bootstrap';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebookSquare, faInstagram, faTwitterSquare } from '@fortawesome/free-brands-svg-icons';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import AuthUser from '../AuthUser';
import '../../assets/style/SignUp.css';

export default function SignUp() {
  const navigate = useNavigate();
  const { http, setToken } = AuthUser();
  const [username, setUsername] = useState('');
  const [fullname, setFullname] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [birthday, setBirthday] = useState('');
  const [role, setRole] = useState('');
  const [status, setStatus]=useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [formErrors, setFormErrors] = useState({});

  const submitForm = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await http.post("/register", {
        username: username,
        fullname: fullname,
        email: email,
        phone: phone,
        address: address,
        password: password,
        birthday: birthday,
        role: role,
      });
      alert("You registered successfully!");
      navigate("/sign-in");
    } catch (error) {
      if (error.response && error.response.data && error.response.data.errors) {
        setFormErrors(error.response.data.errors);
      } else {
        alert("An error occurred. Please try again later.");
      }
      setIsLoading(false);
    }
  };


  return (
      <div className="row signup-form" style={{margin:"9rem auto"}}>
        <div className="col-lg-6">
          <div className="social-icons">
            <FontAwesomeIcon className="icon" icon={faFacebookSquare} />
            <FontAwesomeIcon className="icon" icon={faInstagram} />
            <FontAwesomeIcon className="icon" icon={faTwitterSquare} />
          </div>
          <h1 className="welcome">Chào mừng đến với DreamHome!</h1>
          <h3 className="signup-title"> Hãy đăng nhập để tìm được căn hộ phù hợp ! </h3>
          <Button variant="primary" href="/sign-in" className="signin-mt-6" style={{ fontWeight: 500, backgroundColor:"#ffffff", color:"#000", border:"none"}}>
            Đăng nhập
          </Button>
        </div>
        <div className="col-sm-6 sign-up-card">
          <div className="p-4">
            <h1 className="text-center mb-3">Tạo tài khoản mới</h1>
            <Form onSubmit={submitForm}>
              <Form.Group controlId="username">
                <Form.Label className="title-title">Tên tài khoản:</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Nhập tên"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
                {formErrors.username && <div className="error-message">{formErrors.username}</div>}
              </Form.Group>
              <Form.Group controlId="fullname" className="mt-3">
                <Form.Label className="title-title">Tên đầy đủ:</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Tên đầy đủ"
                  value={fullname}
                  onChange={(e) => setFullname(e.target.value)}
                  required
                />
                {formErrors.fullname && <div className="error-message">{formErrors.fullname}</div>}
              </Form.Group>
              <Form.Group controlId="email" className="mt-3">
                <Form.Label className="title-title">Email:</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                {formErrors.email && <div className="error-message">{formErrors.email}</div>}
              </Form.Group>
              <Form.Group controlId="phone" className="mt-3">
                <Form.Label className="title-title">Số điện thoại:</Form.Label>
                <Form.Control
                  type="number"
                  placeholder="Số điện thoại"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  required
                />
                {formErrors.phone && <div className="error-message">{formErrors.phone}</div>}
              </Form.Group>
              <Form.Group controlId="address" className="mt-3">
                <Form.Label className="title-title">Địa chỉ:</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Địa chỉ"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  required
                />
                {formErrors.address && <div className="error-message">{formErrors.address}</div>}
              </Form.Group>
              <Form.Group controlId="pwd" className="mt-3">
                <Form.Label className="title-title">Mật khẩu:</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Mật khẩu"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                {formErrors.password && <div className="error-message">{formErrors.password}</div>}
              </Form.Group>
              <Form.Group controlId="birthday" className="mt-3">
                <Form.Label className="title-title">Ngày sinh:</Form.Label>
                <Form.Control
                  type="date"
                  placeholder="Ngày sinh"
                  value={birthday}
                  onChange={(e) => setBirthday(e.target.value)}
                  required
                />
                {formErrors.birthday && <div className="error-message">{formErrors.birthday}</div>}
              </Form.Group>
              <Form.Group controlId="role" className="mt-3">
                <Form.Label className="title-title">Đăng kí với tư cách:</Form.Label>
                <Form.Select
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  required
                >
                  <option value="">Select role</option>
                  <option value="Nguoi cho thue">Người cho thuê</option>
                  <option value="Nguoi thue">Người thuê</option>
                </Form.Select>
                {formErrors.role && <div className="error-message">{formErrors.role}</div>}
              </Form.Group>
              <Button
      type="submit"
      className="btn-signup"
      onClick={submitForm}
      style={{ backgroundColor: "#DA291C", border: "none", marginTop: "1rem", marginLeft: "9rem" }}
      disabled={isLoading} // Disable nút khi đang tải
    >
      {isLoading ? (
        <>
        <FontAwesomeIcon icon={faSpinner} spin style={{ marginRight: "0.5rem" }} />
        Đang đăng kí...
      </>
      ) : (
        "Đăng kí"
      )}
    </Button>
            </Form>
          </div>
        </div>
      </div>
  );
}
