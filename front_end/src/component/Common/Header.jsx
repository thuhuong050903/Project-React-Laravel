import React, { useState } from "react";
import { Navbar, Nav } from 'react-bootstrap';
import { NavDropdown } from 'react-bootstrap';
import { Container, Form, FormControl, Button } from 'react-bootstrap';
import "../../assets/style/Header.css";

function Header() {
  const [showDropdown1, setShowDropdown1] = useState(false);
  const [showDropdown2, setShowDropdown2] = useState(false);

  return (
     
      <div className="header">
      <Nav.Link href="/" className="dreamhome">
        <img src={`http://localhost:8000/photos/LogoWeb.png`} style={{ width: '7rem' }}></img>
      </Nav.Link>
      <NavDropdown
        title="Loại phòng"
        className="custom-dropdown"        
        show={showDropdown1}
        onMouseEnter={() => setShowDropdown1(true)}
        onMouseLeave={() => setShowDropdown1(false)}
      >
        <NavDropdown.Item href="/ShowApartment">Phòng dài hạn</NavDropdown.Item>
        <NavDropdown.Item href="/AnotherPage">Phòng ngắn hạn</NavDropdown.Item>
      </NavDropdown>
      <NavDropdown
        title="Tùy chọn"
        className="custom-dropdown"        

        show={showDropdown2}
        onMouseEnter={() => setShowDropdown2(true)}
        onMouseLeave={() => setShowDropdown2(false)}
      >
        <NavDropdown.Item href="/History">Lịch sử</NavDropdown.Item>
        <NavDropdown.Item href="/AnotherPage">Thông tin cá nhân</NavDropdown.Item>
        <NavDropdown.Item href="/AnotherPage">Yêu cầu sửa chữa</NavDropdown.Item>
        <NavDropdown.Item href="/AnotherPage">Đánh giá</NavDropdown.Item>
      </NavDropdown>

      <Nav.Link href="/Introduce" className="header-item">Giới thiệu</Nav.Link>
      <Nav.Link href="/Co_Living" className="header-item">Co-Living</Nav.Link>
      <Nav.Link href="/services" className="header-item">Dịch vụ</Nav.Link>
     
      <div className="rectangle-parent23">
        <Nav.Link href="/Sign_in" className="header-login">Đăng nhập</Nav.Link>
      </div>
      </div>
  );
}

export default Header;
