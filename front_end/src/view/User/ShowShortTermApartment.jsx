import React, { useState, useEffect } from 'react';
import Slider from 'react-slick';
import axios from 'axios';
import { Link } from 'react-router-dom';
import '../../assets/style/ListApartment.css'
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapMarkerAlt, faBuilding, faExpand } from '@fortawesome/free-solid-svg-icons';

function ShowShortTermApartment() {
  const [apartments, setApartments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedDistrict, setSelectedDistrict] = useState(null); // Lưu trữ quận được chọn
  const [isFiltered, setIsFiltered] = useState(false); // Trạng thái lọc

  useEffect(() => {
    fetchLongTermApartments();
  }, []);

  const handleSelectDistrict = (district) => {
    setSelectedDistrict(district);
    setIsFiltered(true); // Đã lọc căn hộ
  };

  const fetchLongTermApartments = () => {
    setLoading(true);

    axios
      .get('http://localhost:8000/api/get-apartment')
      .then((response) => {
        const longTermApartments = response.data.filter((apartment) => apartment.type_room === 'Phòng ngắn hạn');
        setApartments(longTermApartments);
      })
      .catch((error) => {
        console.error('Lỗi khi lấy danh sách căn hộ dài hạn:', error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const filteredApartments = isFiltered
    ? apartments.filter((apartment) => apartment.district === selectedDistrict)
    : apartments;

  if (loading) {
    return <p>Đang tải...</p>;
  }

  return (
    <div style={{display:"flex"}}>
      <div className='filter-apartment' style={{marginTop:"10rem",marginLeft:"2rem"}}>
        <h4>Danh sách quận:</h4>
        <ul className='district-list'>
          <li onClick={() => handleSelectDistrict(null)}>Tất cả</li>
          <li onClick={() => handleSelectDistrict('Sơn Trà')}>Sơn Trà</li>
          <li onClick={() => handleSelectDistrict('Thanh Khê')}>Thanh Khê</li>
          <li onClick={() => handleSelectDistrict('Cẩm Lệ')}>Cẩm Lệ</li>
          <li onClick={() => handleSelectDistrict('Ngũ Hành Sơn')}>Ngũ Hành Sơn</li>
          <li onClick={() => handleSelectDistrict('Hòa Vang')}>Hòa Vang</li>
          <li onClick={() => handleSelectDistrict('Hải Châu')}>Hải Châu</li>
        </ul>
      </div>

      <div className="apartment-list" style={{ marginTop: "10rem" }}>
        {filteredApartments.map((apartment) => (
          <Link to={`/detail-apartment/${apartment.apartment_id}`} key={apartment.apartment_id} className="card">
            <div className="image-gallery">
              <Slider arrows={false} dots={false} autoplay={true} speed={3000} autoplaySpeed={10000}>
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
        ))}
      </div>
    </div>
  );
}

export default ShowShortTermApartment;
