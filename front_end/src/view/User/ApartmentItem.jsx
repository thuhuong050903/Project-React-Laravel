import React from 'react';
import { Link } from 'react-router-dom';
import Slider from 'react-slick';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapMarkerAlt, faBuilding, faExpand } from '@fortawesome/free-solid-svg-icons';


const ApartmentItem = ({ apartment }) => {
  return (
    <div>
      <Link to={`/detail-apartment/${apartment.apartment_id}`} key={apartment.apartment_id} className="card">
              <div className="image-gallery">
                <Slider arrows={false} dots={false} autoplay={true} speed={3000} autoplaySpeed={10000}>
                  {apartment.apartment_image.map((image, index) => (
                    <div key={index}>
                      <img src={`http://localhost:8000/photos/${image.name}`} alt="Apartment" />
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
  );
};

export default ApartmentItem;
