import React, { useState, useEffect } from 'react';
import Slider from 'react-slick';
import { Link } from 'react-router-dom';
import '../../assets/style/ListApartment.css'
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapMarkerAlt, faBuilding, faExpand } from '@fortawesome/free-solid-svg-icons';

function ShowAllApartments() {
  const [shortTermApartments, setShortTermApartments] = useState([]);
  const [longTermApartments, setLongTermApartments] = useState([]);
  const [selectedDistrict, setSelectedDistrict] = useState(null); // Lưu trữ quận được chọn
  const [isFiltered, setIsFiltered] = useState(false); // Trạng thái lọc

  useEffect(() => {
    // Gọi API để lấy dữ liệu căn hộ
    fetch('http://localhost:8000/api/get-apartment')
      .then(response => response.json())
      .then(data => {
        // Lọc và chỉ lấy dữ liệu cho các loại phòng ngắn hạn và dài hạn
        const shortTerm = data.filter(apartment => apartment.type_room === 'Phòng ngắn hạn');
        const longTerm = data.filter(apartment => apartment.type_room === 'Phòng dài hạn');
        setShortTermApartments(shortTerm);
        setLongTermApartments(longTerm);
      })
      .catch(error => console.log(error));
  }, []);

  // Hàm xử lý khi chọn một quận
  const handleSelectDistrict = district => {
    setSelectedDistrict(district);
    setIsFiltered(true); // Đã lọc căn hộ
  };

  // Lọc căn hộ theo quận được chọn cho phòng ngắn hạn
  const filteredShortTermApartments = selectedDistrict
    ? shortTermApartments.filter(apartment => apartment.district === selectedDistrict)
    : shortTermApartments;

  // Lọc căn hộ theo quận được chọn cho phòng dài hạn
  const filteredLongTermApartments = selectedDistrict
    ? longTermApartments.filter(apartment => apartment.district === selectedDistrict)
    : longTermApartments;

  // Hiển thị tất cả căn hộ hoặc căn hộ đã được lọc
  const displayedShortTermApartments = isFiltered ? filteredShortTermApartments : shortTermApartments;
  const displayedLongTermApartments = isFiltered ? filteredLongTermApartments : longTermApartments;

  return (
    <div className='user-listApartment'>
      <div className='filter-apartment'>
        <h4>Danh sách quận:</h4>
        <ul className='district-list'>
          <li onClick={() => handleSelectDistrict(null)}>Tất cả</li>
          <li onClick={() => handleSelectDistrict('Sơn Trà')}>Sơn Trà</li>
          <li onClick={() => handleSelectDistrict('Thanh Khê')}>Thanh Khê</li>
          <li onClick={() => handleSelectDistrict('Cẩm Lệ')}>Cẩm Lệ</li>
          <li onClick={() => handleSelectDistrict('Ngũ Hành Sơn')}>Ngũ Hành Sơn</li>
          <li onClick={() => handleSelectDistrict('Hòa Vang')}>Hòa Vang</li>
          <li onClick={() => handleSelectDistrict('Hải Châu')}>Hải Châu</li>
          {/* Thêm các quận khác tương tự */}
        </ul>
      </div>
      <div className='show-apartment'>
        <h3>PHÒNG NGẮN HẠN</h3>
        <div className="apartment-list">
          {displayedShortTermApartments.map(apartment => (
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
        <h3>PHÒNG DÀI HẠN</h3>
        <div className="apartment-list">
          {displayedLongTermApartments.map(apartment => (
            <Link to={`/detail-apartment/${apartment.apartment_id}`} key={apartment.apartment_id} className="card">
              <div className="image-gallery">
                <Slider arrows={false} dots={false} autoplay={true} speed={5000}>
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
    </div>
  );
}

export default ShowAllApartments;
