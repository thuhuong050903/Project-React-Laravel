import React  from 'react';
import SearchBar from './SearchBar';
// import "../../assets/style/Co_Living.css";
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import "../../assets/style/Home.css";
import ShowApartments from './ShowApartments';
const Home = () => {

  return (

    <div className="homePage">

      <div className='homePage-first-img'>
        <img style={{ width: "100%", marginTop: "-15rem", marginBottom: "4rem" }} src={`http://localhost:8000/photos/Cho-thue-can-ho-img.webp`} alt="" />
        <div className="fixed-searchbar">
          <SearchBar />
        </div>
      </div>

      <div>
        <div>
          <h3 className="title-noibat">Chung cư/ phòng cho thuê ngắn hạn</h3>
          <br /> <br /> <br />
          <ShowApartments type_room="Phòng ngắn hạn" />
          <h3 className="title-noibat">Chung cư/ phòng cho thuê dài hạn</h3>
          <br /> <br /> <br />
          <ShowApartments type_room="Phòng dài hạn" />

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