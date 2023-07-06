import React, { useEffect, useState,useRef } from 'react';
import { Link } from 'react-router-dom';
import Slider from 'react-slick';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapMarkerAlt, faBuilding, faExpand } from '@fortawesome/free-solid-svg-icons';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
const ShowApartments = ({ type_room }) => {
    const [apartments, setApartments] = useState([]);
    const sliderRef = useRef(null);

    const sliderSettings = {
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
            }
        ],
    };
    useEffect(() => {
        const fetchApartments = async () => {
            try {
                const response = await fetch(`http://localhost:8000/api/get-apartment`);
                const data = await response.json();
                setApartments(data);
            } catch (error) {
                console.log(error);
            }
        };

        fetchApartments();
    }, [type_room]);

   
    return (
        <div>
            <Slider {...sliderSettings} ref={sliderRef} >
                {apartments.map((apartment) => (
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
            </Link>                ))}
            </Slider>
        </div>
    );
};

export default ShowApartments;
