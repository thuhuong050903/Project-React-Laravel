import React ,{useState, useEffect,useRef} from 'react';
import SearchBar from './SearchBar';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
// import "../../assets/style/Co_Living.css";
import 'slick-carousel/slick/slick.css';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick-theme.css';
import "../../assets/style/Home.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapMarkerAlt, faBuilding, faExpand } from '@fortawesome/free-solid-svg-icons';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const Home = () => {
  const [apartments, setApartments] = useState([]);
  const sliderRef = useRef(null);
  const [loading, setLoading] = useState(true); // Thêm biến trạng thái loading

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

  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/get-apartment")
      .then((response) => response.json())
      .then((data) => {
        setApartments(data);
        setLoading(false); // Kết thúc quá trình tải dữ liệu
      });
  }, []);
  // Kiểm tra nếu đang tải dữ liệu, hiển thị biểu tượng loading
// Kiểm tra nếu đang tải dữ liệu, hiển thị biểu tượng loading
if (loading) {
  return (
    <div className="loading-container">
      <FontAwesomeIcon className="loading-icon" icon={faSpinner} spin />
    </div>
  );
}


 
  return (

    <div className="homePage">
      <div className='homePage-first-img'>
        <img style={{ width: "100%", marginTop: "-15rem", marginBottom: "4rem" }} src={`http://localhost:8000/photos/Cho-thue-can-ho-img.webp`} alt="" />
        <div className="fixed-searchbar">
        </div>
      </div>
      <div>
        <div>
          <h3 className="title-noibat">Tất cả căn hộ</h3>
          <br /> <br /> <br />
          <Slider {...settings} ref={sliderRef} className="coLiving-slider">
          {apartments.map(apartment => (
            <div className="coLiving-apartment-item">
              <Link to={`/detail-apartment/${apartment.apartment_id}`} key={apartment.apartment_id} className="card">
                <div className="coLiving-image-gallery">
                  <Slider arrows={false} dots={false} autoplay={true} speed={5000} >
                    {apartment.apartment_image.map((image, index) => (
                      <div key={index}>
                      <img src={`http://localhost:8000/uploads/${image.name}`} alt="Apartment" />
                      </div>
                    ))}
                  </Slider>
                </div>
                <div className='apartment-item'>Cho thuê phòng - Dream Home - {apartment.ward} - {apartment.district}</div>
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
                  {apartment.number_address}, {apartment.street}, {apartment.ward}, {apartment.district}
                </div>
              </Link>
              </div>
          ))}

        </Slider>        
        </div>
      </div>

      <div className="desktop-13">
        <b className="v-sao-jinjoo">
          VÌ SAO JINJOO HOME PHÁT TRIỂN MÔ HÌNH SỐNG CO-LIVING?
        </b>

        <img className="image-48-icon" alt="" src="/image-48@2x.png" />
        <b className="khng-gian-thoi">Không gian thoải mái và tiện lợi</b>
        <img className="image-49-icon" alt="" src="/image-49@2x.png" />
        <img className="image-50-icon" alt="" src="/image-50@2x.png" />
        <img className="image-51-icon" alt="" src="/image-51@2x.png" />
        <b className="nhiu-nim-vui-container">
          <p className="nhiu-nim-vui">{`Nhiều niềm vui hơn khi sống `}</p>
          <p className="nhiu-nim-vui">cùng nhau</p>
        </b>
        <b className="ngun-nng-lng-container">
          <p className="nhiu-nim-vui">{`Nguồn năng lượng mới từ những `}</p>
          <p className="nhiu-nim-vui">người bạn mới.</p>
        </b>
        <b className="cng-nhau-khm">Cùng nhau khám phá thế giới.</b>
        <div className="desktop-13-child" />
        <div className="tm-hiu-thm">Tìm hiểu thêm</div>

      </div>
      <div className="desktop-14">
        <div className="tin-tc-ni">TIN TỨC NỔI BẬT</div>
        <div className="desktop-14-child" />
        <img className="image-52-icon" alt="" src="/image-52@2x.png" />
        <div className="desktop-14-item" />
        <div className="desktop-14-inner" />
        <img className="image-53-icon" alt="" src="/image-53@2x.png" />
        <img className="image-54-icon" alt="" src="/image-53@2x.png" />
      </div>
    </div>
  );
};


export default Home;