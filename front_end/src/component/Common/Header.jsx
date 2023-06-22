import React, { Component } from "react";
import { Navbar, Nav } from 'react-bootstrap';
import { Container, Form, FormControl, Button} from 'react-bootstrap';
import "../../assets/style/Header.css";

function Header(){

  
    return (
      <div className="header">
      
          <Nav.Link href="/Home" className="dreamhome">DreamHome</Nav.Link>
          <Nav.Link href="Introduce" className="header-item">Giới thiệu</Nav.Link>
          <Nav.Link href="Co_Living" className="header-item">Co-Living</Nav.Link>
          <Nav.Link href="" className="header-item">Đối tác</Nav.Link>
          <Nav.Link href="#" className="header-item">Tin tức</Nav.Link>
          <Nav.Link href="#" className="header-item">Dịch vụ</Nav.Link>
          <Nav.Link href="ShowApartment" className="header-item">Loại phòng</Nav.Link>
          <div className="rectangle-parent23">
            <Nav.Link href="/Sign_in" className="header-login">Đăng nhập</Nav.Link>
          </div>
          <div className="rectangle-parent24">
            <Nav.Link href="/Sign_up" className="header-signup">Đăng ký</Nav.Link>
          </div>
      </div>
    );
  }


export default Header;
