import React, { useContext, useEffect, useState, useRef } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import "../../assets/style/Home.css";
const Home=()=>{
  const slideImages = [
    'https://static1.cafeland.vn/cafelandnew/hinh-anh/2021/01/06/124/can---ho---chung-cu.jpg',
    'https://media.vneconomy.vn/w800/images/upload/2021/04/20/pic-13-15367166803231878511339-105-0-1229-2000-crop-1536716689366457700181.jpg',
    'https://media.vneconomy.vn/w800/images/upload/2021/04/20/pic-13-15367166803231878511339-105-0-1229-2000-crop-1536716689366457700181.jpg',
    // Add other image URLs here
  ];
  let slideIndex = 0;

  function showSlides() {
    let i;
    let slides = document.getElementsByClassName("mySlides");
    let dots = document.getElementsByClassName("dot");

    if (slides.length === 0) {
      return;
    }

    for (i = 0; i < slides.length; i++) {
      slides[i].style.display = "none";
    }

    slideIndex++;
    if (slideIndex > slides.length) {
      slideIndex = 1;
    }

    for (i = 0; i < dots.length; i++) {
      dots[i].className = dots[i].className.replace(" active", "");
    }

    slides[slideIndex - 1].style.display = "block";
    dots[slideIndex - 1].className += " active";
    setTimeout(showSlides, 1500);
  }
  useEffect(()=>{
    showSlides();
  }, []);
  const [apartments, setApartments] = useState([]);
  const sliderRef = useRef(null);
  useEffect(() => {
    fetch('http://127.0.0.1:8000/api/get-apartment')
      .then(response => response.json())
      .then(data => setApartments(data));
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
    centerMode: true,
    centerPadding: '100px',
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 4,
          centerMode: false
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 4,
          centerMode: false
        }
      }
    ]
  };




  return (
    
    <div className="home">
      <div className="slideshow-container">
          <div className="mySlides">
            <img src="https://static1.cafeland.vn/cafelandnew/hinh-anh/2021/01/06/124/can---ho---chung-cu.jpg" style={{width: '100%', height: '105vh', objectFit: 'cover', objectPosition: 'center'}} />          
          </div>
          <div className="mySlides">
            <img src="https://media.vneconomy.vn/w800/images/upload/2021/04/20/pic-13-15367166803231878511339-105-0-1229-2000-crop-1536716689366457700181.jpg" style={{width: '100%', height: '105vh', objectFit: 'cover', objectPosition: 'center'}} />
          </div>
          <div className="mySlides">
            <img src="https://media.vneconomy.vn/w800/images/upload/2021/04/20/pic-13-15367166803231878511339-105-0-1229-2000-crop-1536716689366457700181.jpg" style={{width: '100%', height: '105vh', objectFit: 'cover', objectPosition: 'center'}} />
          </div>
        </div>
        <br/>      
        <div style={{textAlign: 'center'}}>
          <span className="dot"/> 
          <span className="dot"/> 
          <span className="dot"/> 
        </div>
  
        
        <div>
        <div>
        <h1 className="title">Danh Sách Sản Phẩm Nổi Bật</h1>
        <br /> <br /> <br />
        <Slider {...settings} ref={sliderRef}>
          {apartments.map(apartment => (
            <div className="col-md-3 mb-3" key={apartment.id}>
              <div className="card">
                <img src="https://danhkhoireal.vn/wp-content/uploads/2022/03/Can-ho-Calla-Apartment-Quy-Nhon.jpg" className="card-img-top" alt={apartment.description} />
                <div className="card-body">
                  <h5 className="card-text">{apartment.address_id}</h5>
                  <p className="card-text">NumberRoom: {apartment.number_room}</p>
                  <p className="card-text">TypeRoom: {apartment.typeroom}</p>
                  <p className="card-text">Giá: {apartment.price}</p>
                  <p className="card-text">Area: {apartment.area}</p>
                  <div className="card-buttons">
                    <button className="btn btn-primary" onClick={() => handleAddToCart(product)}>
                      Add Cart
                    </button>
                    <button href="./Detail.jsx"  className="btn btn-secondary">Detail</button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </div>
      {/* <div className="desktop-12">
      <div className="desktop-12-child" />
      <img className="image-24-icon" alt="" src="/image-24@2x.png" />
      <div className="room-for-rent-container4">
        <p className="room-for-rent4">Room for rent - JinJoo</p>
        <p className="room-for-rent4">{`Home - Ky Con, P.Nguyen Thai `}</p>
        <p className="room-for-rent4">Binh, District 1</p>
      </div>
      <div className="div4">10.000.000</div>
      <div className="s-phng-054">Số Phòng: 05</div>
      <div className="district-1-ho4">District 1, Ho Chi Minh</div>
      <img className="image-25-icon" alt="" src="/image-36@2x.png" />
      <img className="image-26-icon" alt="" src="/image-37@2x.png" />
      <div className="phng-dch-v4"> Phòng dịch vụ</div>
      <div className="desktop-12-item" />
      <img className="image-27-icon" alt="" src="/image-24@2x.png" />
      <div className="room-for-rent-container5">
        <p className="room-for-rent4">Room for rent - JinJoo</p>
        <p className="room-for-rent4">{`Home - Ky Con, P.Nguyen Thai `}</p>
        <p className="room-for-rent4">Binh, District 1</p>
      </div>
<div className="div5">10.000.000</div>
      <div className="s-phng-055">Số Phòng: 05</div>
      <div className="district-1-ho5">District 1, Ho Chi Minh</div>
      <img className="image-28-icon" alt="" src="/image-36@2x.png" />
      <img className="image-29-icon" alt="" src="/image-37@2x.png" />
      <div className="phng-dch-v5"> Phòng dịch vụ</div>
      <div className="desktop-12-inner" />
      <img className="image-30-icon" alt="" src="/image-24@2x.png" />
      <div className="room-for-rent-container6">
        <p className="room-for-rent4">Room for rent - JinJoo</p>
        <p className="room-for-rent4">{`Home - Ky Con, P.Nguyen Thai `}</p>
        <p className="room-for-rent4">Binh, District 1</p>
      </div>
      <div className="div6">10.000.000</div>
      <div className="s-phng-056">Số Phòng: 05</div>
      <div className="district-1-ho6">District 1, Ho Chi Minh</div>
      <img className="image-31-icon" alt="" src="/image-36@2x.png" />
      <img className="image-32-icon" alt="" src="/image-37@2x.png" />
      <div className="phng-dch-v6"> Phòng dịch vụ</div>
      <div className="desktop-12-child1" />
      <img className="image-33-icon" alt="" src="/image-24@2x.png" />
      <div className="room-for-rent-container7">
        <p className="room-for-rent4">Room for rent - JinJoo</p>
        <p className="room-for-rent4">{`Home - Ky Con, P.Nguyen Thai `}</p>
        <p className="room-for-rent4">Binh, District 1</p>
      </div>
      <div className="div7">10.000.000</div>
      <div className="s-phng-057">Số Phòng: 05</div>
      <div className="district-1-ho7">District 1, Ho Chi Minh</div>
      <img className="image-34-icon" alt="" src="/image-36@2x.png" />
      <img className="image-35-icon" alt="" src="/image-37@2x.png" />
      <div className="phng-dch-v7"> Phòng dịch vụ</div>
      <div className="desktop-12-child2" />
      <div className="room-for-rent-container8">
        <p className="room-for-rent4">Room for rent - JinJoo</p>
        <p className="room-for-rent4">{`Home - Ky Con, P.Nguyen Thai `}</p>
        <p className="room-for-rent4">Binh, District 1</p>
      </div>
      <div className="div8">10.000.000</div>
      <div className="s-phng-058">Số Phòng: 05</div>
      <div className="district-1-ho8">District 1, Ho Chi Minh</div>
      <img className="image-36-icon4" alt="" src="/image-36@2x.png" />
      <img className="image-37-icon4" alt="" src="/image-37@2x.png" />
      <div className="phng-dch-v8"> Phòng dịch vụ</div>
      <div className="desktop-12-child3" />
      <img className="image-38-icon" alt="" src="/image-24@2x.png" />
      <img className="image-47-icon4" alt="" src="/image-24@2x.png" />
      <div className="room-for-rent-container9">
        <p className="room-for-rent4">Room for rent - JinJoo</p>
        <p className="room-for-rent4">{`Home - Ky Con, P.Nguyen Thai `}</p>
        <p className="room-for-rent4">Binh, District 1</p>
</div>
      <div className="div9">10.000.000</div>
      <div className="s-phng-059">Số Phòng: 05</div>
      <div className="district-1-ho9">District 1, Ho Chi Minh</div>
      <img className="image-39-icon" alt="" src="/image-36@2x.png" />
      <img className="image-40-icon" alt="" src="/image-37@2x.png" />
      <div className="phng-dch-v9"> Phòng dịch vụ</div>
      <div className="desktop-12-child4" />
      <img className="image-41-icon" alt="" src="/image-24@2x.png" />
      <div className="room-for-rent-container10">
        <p className="room-for-rent4">Room for rent - JinJoo</p>
        <p className="room-for-rent4">{`Home - Ky Con, P.Nguyen Thai `}</p>
        <p className="room-for-rent4">Binh, District 1</p>
      </div>
      <div className="div10">10.000.000</div>
      <div className="s-phng-0510">Số Phòng: 05</div>
      <div className="district-1-ho10">District 1, Ho Chi Minh</div>
      <img className="image-42-icon" alt="" src="/image-36@2x.png" />
      <img className="image-43-icon" alt="" src="/image-37@2x.png" />
      <div className="phng-dch-v10"> Phòng dịch vụ</div>
      <div className="desktop-12-child5" />
      <img className="image-44-icon" alt="" src="/image-24@2x.png" />
      <div className="room-for-rent-container11">
        <p className="room-for-rent4">Room for rent - JinJoo</p>
        <p className="room-for-rent4">{`Home - Ky Con, P.Nguyen Thai `}</p>
        <p className="room-for-rent4">Binh, District 1</p>
      </div>
      <div className="div11">10.000.000</div>
      <div className="s-phng-0511">Số Phòng: 05</div>
      <div className="district-1-ho11">District 1, Ho Chi Minh</div>
      <img className="image-45-icon" alt="" src="/image-36@2x.png" />
      <img className="image-46-icon" alt="" src="/image-37@2x.png" />
      <div className="phng-dch-v11"> Phòng dịch vụ</div>
      <b className="chung-c-phng">CHUNG CƯ/ PHÒNG CHO THUÊ DÀI HẠN</b>
      <b className="chung-c-phng1">CHUNG CƯ/ PHÒNG CHO THUÊ NGẮN HẠN</b>
    </div> */}
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