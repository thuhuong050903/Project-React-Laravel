import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { Modal, Button } from 'react-bootstrap';
import axios from 'axios';
import '../../assets/style/Modal_booking.css';
import '../../assets/style/Detail.css'
import Slider from 'react-slick';
import Star_rating from './StarRating';
import Show_rating from './ShowRating';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

function Detail() {
  const userdetail = JSON.parse(sessionStorage.getItem('user'));
  const { id } = useParams();
  const [apartment, setApartment] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [showLongTermBookingModal, setShowLongTermBookingModal] = useState(false);
  const [bookingcheck_in_date, setBookingcheck_in_date] = useState('');
  const [bookingcheck_out_date, setBookingcheck_out_date] = useState('');
  const [desiredRent, setDesiredRent] = useState('');
  const [desiredMoveInDate, setDesiredMoveInDate] = useState('');
  const [desiredViewingDate, setDesiredViewingDate] = useState('');

  useEffect(() => {
    fetchApartmentDetail();
  }, []);

  const fetchApartmentDetail = () => {
    axios
      .get(`http://localhost:8000/api/get-apartment/${id}`)
      .then((response) => {
        setApartment(response.data);
      })
      .catch((error) => {
        console.error('Lỗi khi lấy thông tin căn hộ:', error);
      });
  };

  const handleBookNow = () => {
    if (apartment.type_room === 'Phòng ngắn hạn') {
      if (userdetail && userdetail.id) {
        setShowModal(true);
      } else {
        alert('Bạn cần đăng nhập để đặt phòng');
      }
    } else if (apartment.type_room === 'Phòng dài hạn') {
      if (userdetail && userdetail.id) {
        setShowModal(false); // Đảm bảo rằng modal ngắn hạn không hiển thị
        setShowLongTermBookingModal(true);
      } else {
        alert('Bạn cần đăng nhập để đặt phòng');
      }
    }
  };

  const handleBookingPhoneChange = (e) => {
    setBookingPhone(e.target.value);
  };

  const handleBookingcheck_in_dateChange = (e) => {
    setBookingcheck_in_date(e.target.value);
  };

  const handleBookingcheck_out_dateChange = (e) => {
    setBookingcheck_out_date(e.target.value);
  };

  const handleDesiredRentChange = (e) => {
    setDesiredRent(e.target.value);
  };

  const handleDesiredMoveInDateChange = (e) => {
    setDesiredMoveInDate(e.target.value);
  };

  const handleDesiredViewingDateChange = (e) => {
    setDesiredViewingDate(e.target.value);
  };

  const handleBookingSubmit = () => {
    if (apartment.type_room === 'Phòng ngắn hạn') {
      if (userdetail && userdetail.id) {

        const bookingData = {
          user_id: userdetail.id,
          apartment_id: apartment.apartment_id,
          phone: userdetail.phone,
          check_in_date: bookingcheck_in_date,
          check_out_date: bookingcheck_out_date,
        };

        axios
          .post('http://127.0.0.1:8000/api/bookings', bookingData)
          .then((response) => {
            console.log('Đặt phòng ngắn hạn thành công:', response.data);
            setBookingcheck_in_date('');
            setBookingcheck_out_date('');
            setShowModal(false);
            alert("Bạn đã đặt thành công!");
          })
          .catch((error) => {
            console.error('Đặt phòng ngắn hạn thất bại:', error);
            alert("Không thể đặt phòng!")

          });
      }

    } else if (apartment.type_room === 'Phòng dài hạn') {
      if (userdetail && userdetail.id) {
        const longTermBookingData = {
          user_id: userdetail.id,
          apartment_id: apartment.apartment_id,
          desired_rent: desiredRent,
          desired_move_in_date: desiredMoveInDate,
          appointment_date_time: desiredViewingDate,
        };

        axios
          .post('http://127.0.0.1:8000/api/bookAppointment', longTermBookingData)
          .then((response) => {
            console.log('Đặt lịch dài hạn thành công:', response.data);
            setDesiredRent('');
            setDesiredMoveInDate('');
            setDesiredViewingDate('');
            setShowLongTermBookingModal(false);
            alert("Bạn đã đặt thành công!");

          })
          .catch((error) => {
            console.error('Đặt lịch dài hạn thất bại:', error);
            alert("Không thể đặt lịch hẹn!");

          });
      }
    }
  };

  if (!apartment) {
    return <p>Đang tải...</p>;
  }

  return (
    <div className='detail' style={{marginLeft:"2rem", marginRight:"2rem"}}>
      <div key={apartment.apartment_id} className='detail-card'>
        <div className='detail-image-gallery'>
          <Slider arrows={false} dots={false} autoplay={true} speed={5000}>
            {apartment.apartment_image.map((image, index) => (
              <div key={index}>
                <img style={{width:"100%", height:"30rem", marginLeft:"2rem"}} src={`http://localhost:8000/uploads/${image.name}`} alt="Apartment" />
              </div>
            ))}
          </Slider>
        </div>
        <div className='detail-right'>
          <div className='apartment-title'>
            {apartment.number_address} - {apartment.street} - {apartment.price} đ
          </div>
          <div className='apartment-des'>{apartment.description} </div>
          <div className='service-des'>
            {apartment.service_apartment && apartment.service_apartment.map((service, index) => (
              <div key={index}>{service.services.description}</div>
            ))}
          </div>

          <div className='apartment-room'>Số phòng: {apartment.number_room}</div>
          <div className='apartment-area'>Diện tích: {apartment.area}</div>
          <div className='apartment-address'>
            Địa chỉ: {apartment.number_address} - {apartment.street} - {apartment.ward} - {apartment.district}
          </div>


          {apartment.type_room === 'Phòng ngắn hạn' && (
            <Link onClick={handleBookNow} className="link-button">Đặt phòng</Link>
          )}
          {apartment.type_room === 'Phòng dài hạn' && (
            <Link onClick={handleBookNow} className="link-button">Đặt lịch ngay</Link>
          )}
        </div>
      </div>
      {userdetail && (
        <Modal show={showModal} onHide={() => setShowModal(false)} centered>
          <Modal.Header closeButton>
            <Modal.Title>Đặt phòng ngắn hạn</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div>
              <label>Số điện thoại:</label>
              <input type='text' value={userdetail.phone} onChange={handleBookingPhoneChange} />
            </div>
            <div>
              <label>Ngày nhận phòng:</label>
              <input type='date' value={bookingcheck_in_date} onChange={handleBookingcheck_in_dateChange} />
            </div>
            <div>
              <label>Ngày trả phòng:</label>
              <input type='date' value={bookingcheck_out_date} onChange={handleBookingcheck_out_dateChange} />
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button variant='primary' onClick={handleBookingSubmit}>
              Đặt phòng
            </Button>
          </Modal.Footer>
        </Modal>
      )}

      {userdetail && (
        <Modal show={showLongTermBookingModal} onHide={() => setShowLongTermBookingModal(false)} centered>
          <Modal.Header closeButton>
            <Modal.Title>Đặt phòng dài hạn</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div>
              <label>Số điện thoại:</label>
              <input type='text' value={userdetail.phone} onChange={handleBookingPhoneChange} />
            </div>
            <div>
              <label>Giá mong muốn:</label>
              <input type='text' value={desiredRent} onChange={handleDesiredRentChange} />
            </div>
            <div>
              <label>Ngày dự kiến dọn vào:</label>
              <input type='date' value={desiredMoveInDate} onChange={handleDesiredMoveInDateChange} />
            </div>
            <div>
              <label>Ngày hẹn xem căn hộ:</label>
              <input type='datetime-local' value={desiredViewingDate} onChange={handleDesiredViewingDateChange} />
            </div>
          </Modal.Body>
          <Modal.Footer>
            <button className='booking-submit' onClick={handleBookingSubmit}>
              Đặt phòng
            </button>
          </Modal.Footer>
        </Modal>
      )};

      {userdetail !== null && userdetail !== undefined ? (
        <div className='apartment-rating'>
          <Star_rating userId={userdetail.id} apartmentId={apartment.apartment_id} rating={apartment.rating} />
        </div>
      ) : (
        <div className='apartment-rating'>
          <Show_rating apartmentId={apartment.apartment_id} />
        </div>
      )}

    </div>
  );
}

export default Detail;
