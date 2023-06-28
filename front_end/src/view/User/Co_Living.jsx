import React, { useContext, useEffect, useState, useRef } from "react";
import axios from "axios";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapMarkerAlt, faBuilding, faExpand } from '@fortawesome/free-solid-svg-icons';
import "../../assets/style/Co_Living.css";
const Co_Living = () => {
  const [apartments, setApartments] = useState([]);
  const sliderRef = useRef(null);

  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/get-apartment")
      .then((response) => response.json())
      .then((data) => setApartments(data));
  }, []);

  const handleAddToCart = (apartment) => {
    addToCart(apartment);
  };

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 4,
    autoplay: true,
    autoplaySpeed: 1500,
    centerMode: true,
    centerPadding: "100px",
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 4,
          centerMode: false,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 4,
          centerMode: false,
        },
      },
    ],
  };

  var slideshow = document.querySelector(".slide");

  // Dừng animation
  function pauseSlideshow() {
    slideshow.style.animationPlayState = "paused";
  }

  // Khởi chạy lại animation
  function resumeSlideshow() {
    slideshow.style.animationPlayState = "running";
  }

  const [slidesData, setSlidesData] = useState([]);

  useEffect(() => {
    axios
      .get("https://648a7ed717f1536d65e92e4e.mockapi.io/service")
      .then((response) => {
        setSlidesData(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  if (slidesData.length === 0) {
    return <div>Loading...</div>;
  }

  return (
    <div className="desktop-6">
      <iframe
        className="video_2"
        width="527"
        height="298"
        src="https://www.youtube.com/embed/-Xf-3IrIkOk"
        title="[JinJoo Home] Dự án phòng Co-living (D72) - Cao Lỗ || Cho thuê phòng - Căn hộ dịch vụ tại TP.HCM"
        frameborder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowfullscreen
      ></iframe>
      <div className="co-living-l-g">Co-living là gì?</div>
      <div className="nu-co-working-l-container">
        <p className="nu-co-working-l">{`Nếu co-working là không gian chung để làm việc, thì co-living là không gian chung để sinh sống. Bạn sẽ cùng những người bạn “cùng nhà” chia sẻ không gian sinh hoạt chung. Gồm phòng bếp, phòng khách, một số vật dụng chung và cả tiền thuê phòng. `}</p>
        <p className="nu-co-working-l">
          Sự kết nối chính là điểm khác biệt lớn giữa căn hộ co-living với những
          căn hộ thông thường khác.
        </p>
        <p className="nu-co-working-l">&nbsp;</p>
        <p className="nu-co-working-l">
          Một co-living “chuẩn” phải bao gồm hai yếu tố chính là chung và riêng.
          Tức là, dù sống chung nhưng mỗi cá nhân đều có không
        </p>
        <p className="nu-co-working-l">
          gian riêng cho mình. Có thể nấu và ăn cùng nhau, nhưng nhất định không
          gian nghỉ ngơi của mỗi người phải hoàn toàn riêng biệt.
        </p>
      </div>
      <div className="co-living-s-l-container">
        <p className="nu-co-working-l">&nbsp;</p>
        <p className="nu-co-working-l">&nbsp;</p>
        <p className="nu-co-working-l">{`Co-living sẽ là một khái niệm khá lạ lẫm nếu bạn chưa từng tìm hiểu trước đó. Mô hình căn hộ này phổ biến ở các nước Châu Âu. Nhưng ở Việt Nam thì đây là một lĩnh vực   mới đáng để khai
          thác.  Thay vì sống độc lập trong một căn hộ,bạn có thể chọn lối sống khác nhộn nhịp và tiết kiệm chi phí hơn. `}</p>
        <p className="nu-co-working-l"></p>
        <p className="nu-co-working-l">&nbsp;</p>
        <p className="nu-co-working-l">
          Với sự phát triển ngày nay, sự gắn kết và hội nhập dần trở nên quan
          trọng. Những người trẻ luôn không ngừng tìm kiếm cơ hội giao lưu, kết
          nối và học hỏi từ những người cùng chung chí hướng, niềm đam mê và sở
          thích. Chính vì vậy mà lối sống Co-living với những lợi ích của nó đã
          trở nên phổ biến hơn ở Việt Nam.
        </p>
      </div>
      <div className="u-im-ln">
        <div class="title">
          <ul>
            <li>
              <strong>Tinh giảm chi phí</strong>
            </li>
          </ul>
        </div>
        Ưu điểm lớn nhất của Co-living là giúp giảm thiểu chi phí cho người
        thuê. Các thành viên trong Co-living Space sẽ có giường riêng hoặc thậm
        chí phòng tắm riêng, nhưng bản chất của Co-living là chia sẻ các không
        gian chung như không gian sinh hoạt, bếp, phòng khách,…Do đó, họ cùng
        nhau chia sẻ các khoản chi tiêu như điện, nước và các khoản chi phí
        khác.
      </div>
      <div className="im-ging-nhau">
        <div class="title">
          <ul>
            <li>
              <strong>Nâng cao năng suất làm việc</strong>
            </li>
          </ul>
        </div>
        Điểm giống nhau giữa Co-living và Co-working space là: đây đều là nơi
        cho phép mọi người cởi mở và cộng tác với nhau tạo nên một cộng đồng
        vững mạnh. Co-living có xu hướng được tích hợp trong cùng một tòa nhà
        hoặc cùng một khu vực với Co-working space để mọi người có thể sống và
        làm việc cùng nhau mà không phải mất quá nhiều thời gian để di chuyển
        qua lại từ nhà đến văn phòng. Điều này giúp nâng cao năng suất làm việc
        cho người thuê.
      </div>
      <div className="ngy-nay-vic">
        <div class="title">
          <ul>
            <li>
              <strong>Thời gian thuê linh hoạt</strong>
            </li>
          </ul>
        </div>
        Ngày nay, việc đổi chỗ ở để gần nơi làm, nơi học tập là chuyện diễn ra
        khá thường xuyên. Không phải ai cũng có nhu cầu thuê một chỗ để ở dài
        hạn. Đây cũng là một lý do cho việc Co-living phát triển trở thành xu
        hướng những năm gần đây. Hợp đồng thuê căn hộ co-living có thể linh hoạt
        kéo dài 3 tháng đến 1 năm. Điều này sẽ tạo điều kiện trong việc linh
        hoạt về chỗ ở của khách hàng.
      </div>
      <div className="cc-thnh-vin-container">
        <p className="nu-co-working-l">
          <div class="title">
            <ul>
              <li>
                <strong>Tạo dựng mối quan hệ mới</strong>
              </li>
            </ul>
          </div>
          Các thành viên của Co-living space sống và chia sẻ những sở thích, giá
          trị và hỗ trợ lẫn nhau tạo thành một cộng đồng. Họ có thể đến từ nhiều
          nơi khác nhau nhưng nhờ mô hình Co-living họ có cơ hội gặp gỡ và trò
          chuyện hằng ngày dưới một mái nhà từ đó hình thành những mối quan hệ
          mới. Đây là cơ hợi tốt khi bạn muốn kết bạn, mở rộng mạng lưới hoặc
          thậm chí tìm kiếm đối tác kinh doanh giữa những người cùng chí hướng.
        </p>
        <p className="nu-co-working-l">&nbsp;</p>
        <p className="nu-co-working-l">
          Hơn thế nữa, cư dân tại Co-living còn có nhiều cơ hội kết nối với
          những sự kiện, hoạt động do chủ nhà hoặc chính họ tự tổ chức.
        </p>
      </div>
      <div className="nu-bn-mun">
        <div class="title">
          <ul>
            <li>
              <strong>Không đàm bảo tính riêng tư tuyệt đối</strong>
            </li>
          </ul>
        </div>
        Nếu bạn muốn có sự riêng tư tuyệt đối như ở trong nhà riêng của mình thì
        Co-living không phải là một lựa chọn hoàn hảo bởi tính chất “chia sẻ”
        của loại hình này. Là thành viên của một cộng đồng, bạn sẽ gặp gỡ rất
        nhiều người, cùng sống chung và chia sẻ những điều khác với họ. Vì vậy
        sẽ hơi khó khăn nếu bạn là một người hướng nội, không có nhu cầu giao
        thiệp và kết bạn với người lạ.
      </div>
      <div className="nhiu-bn-s-container">
        <p className="nu-co-working-l">
          <div class="title">
            <ul>
              <li>
                <strong>Khó đảm bảo tính an toàn và bảo mật</strong>
              </li>
            </ul>
          </div>
          Nhiều bạn sẽ băn khoăn: “Làm thế nào có thể giữ an toàn cho bản thân
          và tài sản nếu chung sống cùng người lạ?”
        </p>
        <p className="nu-co-working-l">&nbsp;</p>
        <p className="nu-co-working-l">
          Đúng vậy, sống với người lạ sẽ rất dễ xảy ra các vấn đề về lòng tin và
          lợi ích cá nhân. Vì vậy, bạn nên cân nhắc và tìm hiểu kỹ lưỡng khi lựa
          chọn không gian Co-living uy tín để lưu trú. Bạn cần lưu ý nghiệp vụ
          của nhân viên và hệ thống an ninh trong tòa nhà khi khảo sát địa điểm
          cho thuê.
        </p>{" "}
        <center>
          <div className="serve">
            <center>
              <b className="v-sao-jinjoo22">
                VÌ SAO JINJOO HOME PHÁT TRIỂN MÔ HÌNH SỐNG CO-LIVING?
              </b>
            </center>

            <img className="image-11-icon" alt="" src="/image-48@2x.png" />
            <b className="khng-gian-thoi">Không gian thoải mái và tiện lợi</b>
            <img className="image-12-icon" alt="" src="/image-49@2x.png" />
            <img className="image-13-icon" alt="" src="/image-50@2x.png" />
            <img className="image-14-icon" alt="" src="/image-51@2x.png" />
            <b className="nim-vui-container">
              <p className="nim-vui">{`Nhiều niềm vui hơn khi sống `}</p>
              <p className="nim-vui">cùng nhau</p>
            </b>
            <b className="nng-lng-container">
              <p className="nim-vui">{`Nguồn năng lượng mới từ những `}</p>
              <p className="nim-vui">người bạn mới.</p>
            </b>
            <b className="cng-nhau">Cùng nhau khám phá thế giới.</b>
            </div>
        </center>
      </div>
      <div>
        <div>
        <h1 className="tieude">Các dự án theo mô hình Co-living tiêu biểu tại DreamHome</h1>
        <Slider {...settings} ref={sliderRef} className="coLiving-slider">
          {apartments.map(apartment => (
            <div className="coLiving-apartment-item">
              <Link to={`/apartment/${apartment.apartment_id}`} key={apartment.apartment_id} className="card">
                <div className="coLiving-image-gallery">
                  <Slider arrows={false} dots={false} autoplay={true} speed={5000}>
                    {apartment.apartment_image.map((image, index) => (
                      <div key={index}>
                        <img src={image.name} alt="Apartment" />
                      </div>
                    ))}
                  </Slider>
                </div>
                <div className='apartment-item'>Cho thuê phòng - Dream Home - {apartment.addresses.ward} - {apartment.addresses.district}</div>
                <div className='apartment-price'>{apartment.price} đ</div>
                <div className='apartment-item'>
                  <FontAwesomeIcon icon={faBuilding} className="icon" style={{ color: '#555555' }} />&nbsp;
                  Số phòng:{apartment.number_room}
                </div>
                <div className='apartment-item'>
                  <FontAwesomeIcon icon={faExpand} className="icon" style={{ color: '#555555' }} />&nbsp;
                  Diện tích: {apartment.area}
                </div>
                <div className='address'>
                  <FontAwesomeIcon icon={faMapMarkerAlt} className="address-icon" style={{ color: '#555555' }} />&nbsp;
                  {apartment.addresses.number}, {apartment.addresses.street}, {apartment.addresses.ward}, {apartment.addresses.district}
                </div>
              </Link>
              </div>
          ))}

        </Slider>
    </div>
    </div>
      <div className="cm-t-co-living">
        Cụm từ Co-living có phổ biến ở Việt Nam?
      </div>
      <div className="u-im-ca">Ưu điểm của Co-living là gì ?</div>
      <div className="nhc-im-ca">Nhược điểm của Co-living là gì ?</div>
      <img
        className="untitled-2-300x150-1-icon"
        alt=""
        src="/untitled2300x150-1@2x.png"
      />
      <img
        className="untitled-2-300x150-2-icon"
        alt=""
        src="/untitled2300x150-1@2x.png"
      />
      <iframe
        className="video_3"
        width="862"
        height="452"
        src="https://www.youtube.com/embed/vVkLE6qXz0s"
        title='[Event Nov] "Green Tree - Green Life" cùng với cư dân của JinJoo Home !!!'
        frameborder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowfullscreen
      ></iframe>

      <div className="s-kin-c">
        Sự kiện độc quyền dành riêng cho cư dân của JinJoo Home
        
      </div>
      <div className="hp-mt-hng-container">
        <p className="blank-line1">&nbsp;</p>
        <p className="blank-line1">&nbsp;</p>
        <p className="nu-co-working-l">Họp mặt hàng tháng</p>
        <p className="nu-co-working-l">&nbsp;</p>
        <p className="nu-co-working-l">
          Ưu đãi đặc biệt chỉ dành cho quý cư dân
        </p>
        <p className="nu-co-working-l">&nbsp;</p>
        <p className="nu-co-working-l">Kết nối với mọi người</p>
        <p className="nu-co-working-l">&nbsp;</p>
        <p className="nu-co-working-l">
          Thường xuyên tổ chức các buổi workshop bổ ích,
        </p>
        <p className="nu-co-working-l"> tập thể thao</p>
      </div>
      <div className="s-kin-kt-container">
        <Slider {...settings}>
          {slidesData.map((slide) => (
            <div className="col-md-1 mb-3" key={slide.id}>
              <div className="card">
                <img src={slide.img} className="card-img-top" alt="Hình ảnh" />
                <p className="card-text1">{slide.name}</p>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </div>
    // </div>
  );
};

export default Co_Living;
