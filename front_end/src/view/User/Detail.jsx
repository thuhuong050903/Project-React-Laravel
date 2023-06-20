import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { Modal } from 'react-bootstrap';
import axios from 'axios';
import '../../assets/style/Modal_booking.css';
import '../../assets/style/Detail.css'
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapMarkerAlt, faBuilding, faExpand } from '@fortawesome/free-solid-svg-icons';

function Detail() {

  
  const { id } = useParams();

  const [apartment, setApartment] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [bookingPhone, setBookingPhone] = useState('');
  const [bookingcheck_in_date, setBookingcheck_in_date] = useState('');
  const [bookingcheck_out_date, setBookingcheck_out_date] = useState('');
  const handleBookingPhoneChange = (e) => {
    setBookingPhone(e.target.value);
  };

  const handleBookingcheck_in_dateChange = (e) => {
    setBookingcheck_in_date(e.target.value);
  };

  const handleBookingcheck_out_dateChange = (e) => {
    setBookingcheck_out_date(e.target.value);
  };
  const handleBookId = () => {
    setBookingId(e.target.value);
  };
  const handleBookNow = () => {
    setShowModal(true);
  };
  const handleBookingNameChange = (e) => {
    setBookingName(e.target.value);
  };
  const handleBookingSubmit = () => {
    const bookingData = {
      user_id: apartment.users.id,
      apartment_id: apartment.apartment_id,
      phone: bookingPhone,
      check_in_date: bookingcheck_in_date,
      check_out_date: bookingcheck_out_date,
    };

    axios.post('http://127.0.0.1:8000/api/bookings', bookingData)
      .then((response) => {
        console.log('Đặt phòng thành công:', response.data);
        // Xử lý thành công, ví dụ: đặt lại giá trị ô input và đóng modal
        setBookingName('');
        setBookingPhone('');
        setBookingcheck_in_date('');
        setBookingcheck_out_date('');
        setShowModal(false);
      })
      .catch((error) => {
        console.error('Đặt phòng thất bại:', error);
        // Xử lý lỗi, ví dụ: hiển thị thông báo lỗi
      });
  };

  useEffect(() => {
    // Lấy chi tiết căn hộ dựa trên id
    fetch(`http://localhost:8000/api/get-apartment/${id}`)
      .then(response => response.json())
      .then(data => {
        setApartment(data);
      })
      .catch(error => console.log(error));
  }, [id]);

  if (!apartment) {
    return <p>Đang tải...</p>;
  }
  return (
    <div className='detail'>
      <div key={apartment.apartment_id} className="detail-card">
        <div className="detail-image-gallery">
          <Slider arrows={false} dots={false} autoplay={true} speed={5000}>
            {apartment.apartment_image.map((image, index) => (
              <div key={index}>
                <img src={image.image_path} alt="Apartment" />
              </div>
            ))}
          </Slider>
        </div>
        <div className='detail-right'>
          <div className='apartment-title'>{apartment.addresses.number} - {apartment.addresses.street} - {apartment.price} đ</div>
          <div className='apartment-des'>{apartment.description} </div>

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
          <Link onClick={handleBookNow}>Đặt phòng</Link>

        </div>
      </div>
      {showModal && (
  <Modal show={showModal} onClose={() => setShowModal(false)} className='custom-modal'>
        <button className="close-button" onClick={() => setShowModal(false)}>X</button>

    <h2>Đặt phòng</h2>
    Họ tên:
    <input type="text" value={apartment.users.username} onChange={handleBookingNameChange} placeholder="Nhập họ tên của bạn" />
    Điện thoại:
    <input type="text" value={bookingPhone} onChange={handleBookingPhoneChange} placeholder="Nhập số điện thoại" />
    Ngày nhận phòng:
    <input type="date" value={bookingcheck_in_date} onChange={handleBookingcheck_in_dateChange} placeholder="Nhập họ tên của bạn" />
    Ngày trả phòng:
    <input type="date" value={bookingcheck_out_date} onChange={handleBookingcheck_out_dateChange} placeholder="Nhập họ tên của bạn" />
    <button onClick={handleBookingSubmit}>Đặt phòng</button>
  </Modal>
)}

    </div>
  );
}

export default Detail;
