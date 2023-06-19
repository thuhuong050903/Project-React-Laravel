import React, { useState, useEffect } from 'react';
import Slider from 'react-slick';
import '../../assets/style/List_Apartment.css'
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

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
      <div className="apartment-list">
        <h1>Short Term Apartments</h1>
        {shortTermApartments.map(apartment => (
          <div key={apartment.apartment_id} className="card">
            <div className="image-gallery">
              <Slider>
                {apartment.apartment_image.map(image => (
                  <div key={image.image_id}>
                    <img src={image.image_path} alt="Apartment" />
                  </div>
                ))}
              </Slider>
            </div>
            <h2>{apartment.name}</h2>
            <p>{apartment.description}</p>
            <p>Price: {apartment.price}</p>
            <p>Number of Rooms: {apartment.number_of_rooms}</p>
            <p>Area: {apartment.area}</p>
            <p>Address: {apartment.address}</p>
            
          </div>
        ))}
      </div>
      <div className="apartment-list">
        <h1>Long Term Apartments</h1>
        {longTermApartments.map(apartment => (
          <div key={apartment.apartment_id} className="card">
            <div className="image-gallery">
              <Slider>
                {apartment.apartment_image.map(image => (
                  <div key={image.image_id}>
                    <img src={image.image_path} alt="Apartment" />
                  </div>
                ))}
              </Slider>
            </div>
            <h2>{apartment.name}</h2>
            <p>{apartment.description}</p>
            <p>Price: {apartment.price}</p>
            <p>Number of Rooms: {apartment.number_of_rooms}</p>
            <p>Area: {apartment.area}</p>
            <p>Address: {apartment.address}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default List_Apartment;
