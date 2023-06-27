import React, { Component } from "react";
import "../../assets/style/Footer.css";

class Footer extends Component {
  render() {
    return (
      <div className="footer">
        <img className="image-4-icon" alt="" src="/image-4@2x.png" />
        <div className="cng-ty-tnhh">
          Công Ty TNHH Famous Express International
        </div>
        <div className="giy-chng-nhn">
          Giấy chứng nhận đăng ký kinh doanh số 0315758622
        </div>
        <div className="do-s-k">
          Do Sở Kế hoạch và Đầu tư Thành phố Hồ Chí Minh cấp ngày 27/06/2019
        </div>
        <div className="bis-nguyn-vn">
          <a href="#">
            <img
              loading="lazy"
              class="alignleft wp-image-40789"
              src="https://jinjoohome.com/wp-content/uploads/2021/10/ffi.png.webp"
              alt=""
              width="25"
              height="25"
            ></img>
          </a>
          106Bis Nguyễn Văn Cừ, Phường Nguyễn Cư Trinh, Quận 1, TP.HCM
        </div>
        <div className="infodreamhomecom">
          <img
            loading="lazy"
            class="alignleft wp-image-40792"
            src="https://jinjoohome.com/wp-content/uploads/2021/10/ffm.png.webp"
            alt=""
            width="26"
            height="26"
          ></img>
          info@dreamhome.com
        </div>
        <div className="div12">
          <img
            loading="lazy"
            class="wp-image-40790 alignleft"
            src="https://jinjoohome.com/wp-content/uploads/2021/10/ffj.png.webp"
            alt=""
            width="25"
            height="25"
          ></img>
          (+84) 369 912 793
        </div>
        <div className="v-dreamhome">Về DreamHome</div>
        <div className="dch-v2">Dịch vụ</div>
        <div className="gii-thiu-tin-container">
          <p className="tuyn-dng">Giới thiệu</p>
          <p className="tuyn-dng">Tin tức</p>
          <p className="tuyn-dng">Tuyển dụng</p>
          <p className="tuyn-dng">Chính sách bảo mật</p>
          <p className="chnh-sch-iu">Chính sách điều khoản</p>
        </div>
        <div className="qun-l-bt-container">
          <p className="tuyn-dng">Quản lí bất động sản</p>
          <p className="tuyn-dng">Cho thuê phòng</p>
          <p className="tuyn-dng">{`Nhận kí gửi `}</p>
          <p className="tuyn-dng">Liên hệ hợp tác</p>
        </div>
        <footer id="footer" class="footer-wrapper">
          <div class="footer-widgets footer footer-1">
            <div class="row large-columns-2 mb-0">
              <div id="block-7" class="col pb-0 widget widget_block">
                <h5 class="widget-title-footer">
                  Bản quyền @2021 JinJoo Home{" "}
                </h5>
              </div>
              <div id="block-13" class="col pb-0 widget widget_block">
                <h5 class="widget-title-footer">Kết nối với chúng tôi </h5>
                <p>
                  <a
                    href="https://www.facebook.com/JinJooHomes
"
                  >
                    <img
                      decoding="async"
                      loading="lazy"
                      src="https://jinjoohome.com/wp-content/uploads/2021/10/at44.png.webp"
                      width="30"
                      height="30"
                      class="ffj"
                    ></img>
                  </a>
                  <a href="https://www.instagram.com/jinjoohome_coliving/">
                    <img
                      decoding="async"
                      loading="lazy"
                      src="https://jinjoohome.com/wp-content/uploads/2021/10/at45.png.webp"
                      width="30"
                      height="30"
                    ></img>
                  </a>
                  <a href="https://www.linkedin.com/company/jinjoo-home/mycompany/?viewAsMember=true">
                    <img
                      decoding="async"
                      loading="lazy"
                      src="https://jinjoohome.com/wp-content/uploads/2021/10/at46.png.webp"
                      width="30"
                      height="30"
                    ></img>
                  </a>
                  <a href="https://www.youtube.com/@jinjoohome">
                    <img
                      decoding="async"
                      loading="lazy"
                      src="https://jinjoohome.com/wp-content/uploads/2021/10/at47.png.webp"
                      width="30"
                      height="30"
                    ></img>
                  </a>
                </p>
              </div>
              <div
                id="block-8"
                class="col pb-0 widget widget_block widget_text"
              >
                <p></p>
              </div>
              <div
                id="block-9"
                class="col pb-0 widget widget_block widget_text"
              >
                <p></p>
              </div>
            </div>
          </div>

          <div class="absolute-footer dark medium-text-center small-text-center">
            <div class="container clearfix">
              <div class="footer-primary pull-left">
                <div class="copyright-footer"></div>
              </div>
            </div>
          </div>
        </footer>
      </div>
    );
  }
}

export default Footer;
