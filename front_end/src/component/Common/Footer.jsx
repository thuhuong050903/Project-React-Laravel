import React, { Component } from 'react';
import '../../assets/style/Footer.css';

class Footer extends Component {
    render() {
        return (
            <div className="footer">
                <img className="footer-icon" alt="" src="/image-4@2x.png" />
                <div className='footer-1'>
                <div className="company-name">
                    Công Ty TNHH Famous Express International
                </div>
                <div className="business-certificate">
                    Giấy chứng nhận đăng ký kinh doanh số 0315758622
                </div>
                <div className="planning-investment">
                    Do Sở Kế hoạch và Đầu tư Thành phố Hồ Chí Minh cấp ngày 27/06/2019
                </div>
                <div className="address">
                    106Bis Nguyễn Văn Cừ, Phường Nguyễn Cư Trinh, Quận 1, TP.HCM
                </div>
                <div className="contact-info">info@dreamhome.com</div>
                <div className="contact-info">(+84) 369 912 793</div>
                </div>
                <div className='footer-2'>
                <div className="footer-link">Về DreamHome</div>
                <div className="footer-link-group">
                    <p className="footer-link">Giới thiệu</p>
                    <p className="footer-link">Tin tức</p>
                    <p className="footer-link">Tuyển dụng</p>
                    <p className="footer-link">Chính sách bảo mật</p>
                    <p className="footer-link">Chính sách điều khoản</p>
                </div>
                </div>
                <div className='footer-3'>
                <div className="footer-link">Về DreamHome</div>

                <div className="footer-link-group">
                    <p className="footer-link">Quản lí bất động sản</p>
                    <p className="footer-link">Cho thuê phòng</p>
                    <p className="footer-link">Nhận kí gửi</p>
                    <p className="footer-link">Liên hệ hợp tác</p>
                </div>
                </div>
                <div className="address-icons-parent">
                    <div className="address-icon" />
                    <div className="group-child40" />
                    <img
                        className="address-icon-2"
                        alt=""
                        src="/icons8address64-2-1@2x.png"
                    />
                </div>
                <div className="address-icons-group">
                    <div className="address-icon" />
                    <div className="group-child40" />
                </div>
                <div className="address-icons-container">
                    <div className="address-icon" />
                    <div className="group-child40" />
                </div>
                <img className="contact-icon" alt="" src="/icons8email50-1@2x.png" />
                <img className="contact-icon" alt="" src="/icons8phone50-1@2x.png" />
            </div>
        );
    }
}

export default Footer;
