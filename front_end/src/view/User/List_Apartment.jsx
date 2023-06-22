import React, { useState, useEffect } from 'react';
import Slider from 'react-slick';
import { Link } from 'react-router-dom';
import '../../assets/style/List_Apartment.css'
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapMarkerAlt, faBuilding, faExpand } from '@fortawesome/free-solid-svg-icons';

function List_Apartment() {
  const [shortTermApartments, setShortTermApartments] = useState([]);
  const [longTermApartments, setLongTermApartments] = useState([]);



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

  return (
    <div className='show-apartment'>
      <h3>PHÒNG NGẮN HẠN</h3>
      <div className="apartment-list">
        {shortTermApartments.map(apartment => (
          <div key={apartment.apartment_id} className="card">
           <div className="image-gallery">
              <Slider arrows={false} dots={false} autoplay={true} speed={3000} autoplaySpeed={10000}>
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
            <Link to={`/apartment/${apartment.apartment_id}`}>Detail</Link>
          </div>
        ))}
      </div>
      <h3>PHÒNG DÀI HẠN</h3>
      <div className="apartment-list">
        {longTermApartments.map(apartment => (
          <div key={apartment.apartment_id} className="card">
            <div className="image-gallery">
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
            <Link to={`/apartment/${apartment.apartment_id}`}>Detail</Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export default List_Apartment;
