import '../../assets/style/Introduce.css';
import React, { useContext, useEffect, useState, useRef } from 'react';
const Introduce = () => {
  useEffect(()=>{
    
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
  return (
    
    <div className="desktop-1">
      <div className="quy-m-container">
        <p className="quy-m">1. Quy mô:</p>
        <p className="nm-2020-jinjoo">
          • Năm 2020, JinJoo đặt 500 căn hộ trên toàn thành phố Hồ Chí Minh, từ
          khu trung tâm đến ngoại thành.
        </p>
        <p className="nm-2020-jinjoo">
          • Năm 2021, JinJoo sẽ đạt 1000 căn hộ tại thành phố Hồ Chí Minh và có
          kế hoạch mở rộng ra Hà Nội, Đà Nẵng.
        </p>
        <p className="nm-2020-jinjoo">&nbsp;</p>
        <p className="quy-m">2. Tầm nhìn:</p>
        <p className="nm-2020-jinjoo">
          JinJoo Home hướng tới mục tiêu phát triển toàn diện trong lĩnh vực lưu
          trú, không ngừng thay đổi mới và sáng tạo để tạo ra hệ thống phòng trọ
          rộng khắp TP.HCM và có kế hoạch mở rộng tại Hà Nội, Đà Nẵng. Góp phần
          nâng cao chất lượng đời sống của người Việt Nam và nâng cấp vị thế
          Việt Nam trên trường quốc tế.
        </p>
      </div>
      <div className="nhim-v-s-container">
        <p className="quy-m">3. Nhiệm vụ:</p>
        <p className="nm-2020-jinjoo">
          Sứ mệnh của chúng tôi là cung cấp cộng đồng chung sống hiện đại cho
          người trẻ, kết nối thế hệ những người trẻ đến với cộng đồng dành cho
          họ.
        </p>
        <p className="nm-2020-jinjoo">
          Với mong muốn thúc đẩy sự đổi mới và nâng cao tiêu chuẩn thị trường,
          chúng tôi đem lại các tiện ích cho người thuê bao gồm nhà ở với thiết
          kế hiện đại phù hợp với thị hiếu của người trẻ, nội thất đầy đủ tiện
          nghi, dịch vụ chăm sóc khách hàng xử lí các tình huống phát sinh trong
          24h, dịch vụ bảo trì, đảm bảo an ninh nhà ở, các tiện ích bổ sung
          (giặt là, vận chuyển nhà, nhận hộ bưu phẩm, vệ sinh nhà ở theo yêu
          cầu…).
        </p>
        <p className="nm-2020-jinjoo">&nbsp;</p>
        <p className="nm-2020-jinjoo">
          Nằm ở vị trí đắc địa là trung tâm thành phố, trung tâm các quận, gần
          các trường đại học lớn, khu trung tâm thương mại, các siêu thị tiện
          lợi, chợ…, hệ thống căn hộ của JinJoo Home luôn luôn đặt mục tiêu đem
          đến sự thuận tiện trong vấn đề di chuyển, đáp ứng nhu cầu vui chơi
          giải trí, sinh hoạt văn hóa, hoạt động cộng đồng hay nhu cầu ăn uống,
          …
        </p>
        <p className="nm-2020-jinjoo">&nbsp;</p>
        <p className="nm-2020-jinjoo">
          Chúng tôi hướng đến những tiện nghi của co-living và loại bỏ những
          phiền toái của việc thuê nhà trọ thông thường. Trong cộng đồng JinJoo
          Home các cư dân sẽ có cơ hội gặp gỡ, giao tiếp và kết nối. Chúng tôi
          có các hoạt động cộng đồng độc quyền, các chương trình sinh hoạt vui
          chơi giải trí, các khóa học bổ ích, … Và một điều quan trọng hơn hết
          co-living giúp bạn tiết kiệm chi phí. Khi là một thành viên của cộng
          đồng JinJoo Home, bạn sẽ không bao giờ phải lo lắng về việc dọn dẹp,
          di chuyển đồ đạc, hoặc tính toán về các khoản phí, đã có chúng tôi làm
          điều đó giúp bạn.
        </p>
      </div>
      <div className="tr-s-chnh">5. Trụ sở chính:</div>
      <div className="cng-ty-tnhh-container">
        <p className="nm-2020-jinjoo">
          Công ty TNHH Famous Express International
        </p>
        <p className="nm-2020-jinjoo">&nbsp;</p>
        <p className="nm-2020-jinjoo">MST: 0315758622</p>
        <p className="nm-2020-jinjoo">&nbsp;</p>
        <p className="nm-2020-jinjoo">
          Địa chỉ: 101B Lê Hữu Trác, P.Phước Mỹ, Quận Sơn Trà Đà Nẵng, Đà Nẵng
        </p>
        <p className="nm-2020-jinjoo">&nbsp;</p>
        <p className="nm-2020-jinjoo">Email: info@jinjoohome.com</p>
        <p className="nm-2020-jinjoo">&nbsp;</p>
        <p className="nm-2020-jinjoo">Hotline: (+84) 369 912 793</p>
      </div>
      <iframe className='map' src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3834.1104354866766!2d108.24107707479844!3d16.05975803461834!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3142177f2ced6d8b%3A0xeac35f2960ca74a4!2zOTkgVMO0IEhp4bq_biBUaMOgbmgsIFBoxrDhu5tjIE3hu7ksIFPGoW4gVHLDoCwgxJDDoCBO4bq1bmcgNTUwMDAwLCBWaeG7h3QgTmFt!5e0!3m2!1svi!2s!4v1686536249089!5m2!1svi!2s" width={600} height={450} style={{border: 0}} allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade" />
      <div className="desktop-1-child" />
      <iframe className='video_1' width="639" height="315" src="https://www.youtube.com/embed/_qNDxJhNZrg" title="[JinJoo Home] Cùng JinJoo kiến tạo không gian sống || Cho thuê phòng - Căn hộ dịch vụ tại TP.HCM" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
      
      <div className="footer-parent">
     
        
        <div className="group-child65" />
      </div>
      {apartments.slice(0, 4).map(apartment => (
  <div className="col-md-3 mb-3" key={apartment.id}>
    <div className='Content'>
    <div className="introduct-card">
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
  </div>
))}

    </div>
  );
};

export default Introduce;