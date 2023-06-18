import React, { Component } from "react";
import { Navbar, Nav } from 'react-bootstrap';
import { Container, Form, FormControl, Button} from 'react-bootstrap';
import "../../assets/style/Header.css";

function Header(){

  
    return (
      <div className="header">
        <div className="desktop-9">
          <div className="image-22" ></div>
          <Navbar.Brand href="/Home" className="dreamhome2">DreamHome</Navbar.Brand>
          <Nav.Link href="Introduce" className="gii-thiu1">Giới thiệu</Nav.Link>
          <Nav.Link href="Co_Living" className="co-living1">Co-Living</Nav.Link>
          <Nav.Link href="#" className="i-tc1">Đối tác</Nav.Link>
          <Nav.Link href="#" className="tin-tc1">Tin tức</Nav.Link>
          <Nav.Link href="#" className="dch-v1">Dịch vụ</Nav.Link>
          <Nav.Link href="#" className="loi-phng1">Loại phòng</Nav.Link>
          <div className="rectangle-parent23">
            <Nav.Link href="./Sign_in" className="ng-nhp2">Đăng nhập</Nav.Link>
          </div>
          <div className="rectangle-parent24">
            <Nav.Link href="./Sign_up" className="ng-k2">Đăng ký</Nav.Link>
          </div>
        </div>
      </div>
    );
  }


export default Header;
