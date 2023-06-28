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

  const handleCommentChange = (e) => {
    setComment(e.target.value);
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
    }  else {
      alert('Bạn cần đăng nhập để đặt phòng');
    }
  }};

  const handleBookingNameChange = (e) => {
    setBookingName(e.target.value);
  };

    const { http } = AuthUser();
    const [userdetail, setUserdetail] = useState(null);

    useEffect(() => {
        fetchUserDetail();
    }, []);

    const fetchUserDetail = () => {
        http.post('http://127.0.0.1:8000/api/me').then((res) => {
            setUserdetail(res.data);
              setUserLoaded(true);
        });
    }

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
          alert('Bạn đã đặt phòng thành công! Vui lòng theo dõi trạng thái!')
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
      
        const postRequest1 = axios.post('http://127.0.0.1:8000/api/bookAppointment', longTermBookingData);
        const postRequest2 = axios.post('https://63a57216318b23efa793a737.mockapi.io/api/appointment', longTermBookingData);
      
        Promise.all([postRequest1, postRequest2])
          .then((responses) => {
            const response1 = responses[0];
            const response2 = responses[1];
            alert('Bạn đã đặt lịch thành công! Vui lòng theo dõi trạng thái!')
            console.log('Đặt lịch dài hạn thành công:', response1.data);
            console.log('Response from anotherEndpoint:', response2.data);
            // Xử lý thành công, ví dụ: đặt lại giá trị ô input và đóng modal
            setBookingPhone('');
            setDesiredRent('');
            setDesiredMoveInDate('');
            setDesiredViewingDate('');
            setShowLongTermBookingModal(false);
          })
          .catch((errors) => {
            console.error('Đặt lịch dài hạn thất bại:', errors);
            // Xử lý lỗi, ví dụ: hiển thị thông báo lỗi
          });
      }
      
    }
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
  if (!userLoaded) {
    return <p>Đang tải...</p>;
  }
  
  return (
    <div className='detail'>
      <div key={apartment.apartment_id} className="detail-card">
        <div className="detail-image-gallery">
          <Slider arrows={false} dots={false} autoplay={true} speed={5000}>
            {apartment.apartment_image.map((image, index) => (
              <div key={index}>
                <img src={image.name} alt="Apartment" />
              </div>
            ))}
          </Slider>
        </div>
        <div className='detail-right'>
          <div className='apartment-title'>{apartment.addresses.number} - {apartment.addresses.street} - {apartment.price} đ</div>
          <div className='apartment-des'>{apartment.description} </div>
          <div className='service-des'>
            {apartment.services.map((service, index) => (
              <div key={index}>{service.description}</div>
            ))}
          </div>
          <div className='apartment-room'>Số phòng: {apartment.number_room}</div>
          <div className='apartment-area'>Diện tích: {apartment.area}</div>
          <div className='apartment-address'>
            Địa chỉ: {apartment.addresses.number}, {apartment.addresses.street}, {apartment.addresses.ward}, {apartment.addresses.district}
          </div>
         
          {apartment.type_room === 'Phòng ngắn hạn' && (
            <Link onClick={handleBookNow} className="link-button">Đặt phòng</Link>
          )}
          {apartment.type_room === 'Phòng dài hạn' && (
            <Link onClick={handleBookNow} className="link-button">Đặt lịch ngay</Link>
          )}
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
      {showLongTermBookingModal && (
        <Modal show={showLongTermBookingModal} onClose={() => setShowLongTermBookingModal(false)} className='custom-modal'>
          <button className="close-button" onClick={() => setShowLongTermBookingModal(false)}>X</button>

          <h2>Đặt lịch hẹn xem phòng</h2>
          Họ tên:
          <input type="text" value={apartment.users.username} onChange={handleBookingNameChange} placeholder="Nhập họ tên của bạn" />
          Điện thoại:
          <input type="text" value={bookingPhone} onChange={handleBookingPhoneChange} placeholder="Nhập số điện thoại" />
          Mức giá thuê mong muốn/tháng:
          <input type="number" value={desiredRent} onChange={handleDesiredRentChange} placeholder="Nhập mức giá mong muốn" />
          Thời gian bạn muốn dọn vào:
          <input type="date" value={desiredMoveInDate} onChange={handleDesiredMoveInDateChange} placeholder="Nhập họ tên của bạn" />
          Thời gian xem phòng:
          <input type="date" value={desiredViewingDate} onChange={handleDesiredViewingDateChange} placeholder="Nhập họ tên của bạn" />
          <button onClick={handleBookingSubmit}>Đặt lịch ngay</button>
        </Modal>
      )}

<div className="rating">
  <Star_rating apartmentId={apartment.apartment_id} userId={userdetail.id} rating={apartment.rating} />
</div>
    </div>
  );
}

export default Detail;
