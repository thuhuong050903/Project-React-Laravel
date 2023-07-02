import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { Modal } from 'react-bootstrap';
import axios from 'axios';
import AuthUser from '../../component/AuthUser';
import '../../assets/style/Modal_booking.css';
import '../../assets/style/Detail.css'
import Slider from 'react-slick';
import Star_rating from './Star_rating';
import Show_rating from './Show_rating';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

function Detail() {
  const { id } = useParams();
  const [userLoaded, setUserLoaded] = useState(false);
  const [apartment, setApartment] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [showLongTermBookingModal, setShowLongTermBookingModal] = useState(false);
  const [bookingPhone, setBookingPhone] = useState('');
  const [bookingcheck_in_date, setBookingcheck_in_date] = useState('');
  const [bookingcheck_out_date, setBookingcheck_out_date] = useState('');
  const [desiredRent, setDesiredRent] = useState('');
  const [desiredMoveInDate, setDesiredMoveInDate] = useState('');
  const [desiredViewingDate, setDesiredViewingDate] = useState('');

  const { http } = AuthUser();
  const [userdetail, setUserdetail] = useState(null);

  useEffect(() => {
    fetchUserDetail();
    fetchApartmentDetail();
  }, []);

  const fetchUserDetail = () => {
    http
      .post('http://127.0.0.1:8000/api/me')
      .then((res) => {
        setUserdetail(res.data);
        setUserLoaded(true);
      })
      .catch((error) => {
        console.error('Lỗi khi lấy thông tin người dùng:', error);
        setUserLoaded(true);
      });
  };

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
      const bookingData = {
        user_id: apartment.users.id,
        apartment_id: apartment.apartment_id,
        phone: bookingPhone,
        check_in_date: bookingcheck_in_date,
        check_out_date: bookingcheck_out_date,
      };

      axios
        .post('http://127.0.0.1:8000/api/bookings', bookingData)
        .then((response) => {
          console.log('Đặt phòng ngắn hạn thành công:', response.data);
          setBookingPhone('');
          setBookingcheck_in_date('');
          setBookingcheck_out_date('');
          setShowModal(false);
        })
        .catch((error) => {
          console.error('Đặt phòng ngắn hạn thất bại:', error);
        });
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
            setBookingPhone('');
            setDesiredRent('');
            setDesiredMoveInDate('');
            setDesiredViewingDate('');
            setShowLongTermBookingModal(false);
          })
          .catch((error) => {
            console.error('Đặt lịch dài hạn thất bại:', error);
          });
      }
    }
  };

  if (!apartment) {
    return <p>Đang tải...</p>;
  }

  return (
    <div className='detail'>
      <div key={apartment.apartment_id} className='detail-card'>
        <div className='detail-image-gallery'>
          <Slider arrows={false} dots={false} autoplay={true} speed={5000}>
            {apartment.apartment_image.map((image, index) => (
              <div key={index}>
                <img src={image.name} alt='Apartment' />
              </div>
            ))}
          </Slider>
        </div>
        <div className='detail-right'>
          <div className='apartment-title'>
            {apartment.addresses.number} - {apartment.addresses.street} - {apartment.price} đ
          </div>
          <div className='apartment-des'>{apartment.description} </div>
          <div className='service-des'>
            {apartment.services.map((service, index) => (
              <div key={index}>{service.description}</div>
            ))}
          </div>
          <div className='apartment-room'>Số phòng: {apartment.number_room}</div>
          <div className='apartment-area'>Diện tích: {apartment.area}</div>
          <div className='apartment-address'>
            Địa chỉ: {apartment.addresses.number} - {apartment.addresses.street} - {apartment.addresses.ward} - {apartment.addresses.district}
          </div>
         

          {apartment.type_room === 'Phòng ngắn hạn' && (
              <Link onClick={handleBookNow} className="link-button">Đặt phòng</Link>
            )}
            {apartment.type_room === 'Phòng dài hạn' && (
              <Link onClick={handleBookNow} className="link-button">Đặt lịch ngay</Link>
            )}
        </div>
      </div>

      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Đặt phòng ngắn hạn</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div>
            <label>Số điện thoại:</label>
            <input type='text' value={bookingPhone} onChange={handleBookingPhoneChange} />
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
          <button className='booking-submit' onClick={handleBookingSubmit}>
            Đặt phòng
          </button>
        </Modal.Footer>
      </Modal>

      <Modal show={showLongTermBookingModal} onHide={() => setShowLongTermBookingModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Đặt phòng dài hạn</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div>
            <label>Số điện thoại:</label>
            <input type='text' value={bookingPhone} onChange={handleBookingPhoneChange} />
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

      {userdetail !== null && userdetail !== undefined ? (
  <div className='apartment-rating'>
    <Star_rating userId={userdetail.id} apartmentId={apartment.apartment_id} rating={apartment.rating}/>
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
