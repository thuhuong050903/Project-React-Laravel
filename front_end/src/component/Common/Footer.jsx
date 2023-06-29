import React, { Component } from 'react';
import '../../assets/style/Footer.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapMarkerAlt, faEnvelope, faPhone } from '@fortawesome/free-solid-svg-icons';
class Footer extends Component {
    render() {
        return (
            <div className="footer">
                <img className="footer-icon" alt="" src="http://localhost:8000/photos/LogoWeb.png" />
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
                <div className="footer-address">
                <FontAwesomeIcon icon={faMapMarkerAlt} />
                &nbsp;
                106Bis Nguyễn Văn Cừ, Phường Nguyễn Cư Trinh, Quận 1, TP.HCM
                </div>
                <div className="contact-info">
                <FontAwesomeIcon icon={faEnvelope} />&nbsp;
                info@dreamhome.com</div>
                <div className="contact-info">
                <FontAwesomeIcon icon={faPhone} />&nbsp;
                    (+84) 369 912 793</div>
                </div>
                <div className='footer-2'>
                <div className="footer-link"><b>Về DreamHome </b></div>
                <div className="footer-link-group">
                    <p className="footer-link">Giới thiệu</p>
                    <p className="footer-link">Tin tức</p>
                    <p className="footer-link">Tuyển dụng</p>
                    <p className="footer-link">Chính sách bảo mật</p>
                    <p className="footer-link">Chính sách điều khoản</p>
                </div>
                </div>
                <div className='footer-3'>
                <div className="footer-link"><b>Dịch vụ </b></div>

                <div className="footer-link-group">
                    <p className="footer-link">Quản lí bất động sản</p>
                    <p className="footer-link">Cho thuê phòng</p>
                    <p className="footer-link">Nhận kí gửi</p>
                    <p className="footer-link"><b>Liên hệ hợp tác </b></p>
                </div>
                </div>
            </div>
        );
    }
}

export default Footer;
