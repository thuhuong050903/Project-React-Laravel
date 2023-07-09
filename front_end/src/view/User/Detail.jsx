import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { Modal, Button } from 'react-bootstrap';
import axios from 'axios';
import Swal from "sweetalert";

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
  const [bookingError, setBookingError] = useState("");
  const [formErrors, setFormErrors] = useState({});

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


    const totalPrice = () => {
// viết hàm reset field
if (!showModal || !bookingcheck_out_date || !bookingcheck_in_date) return 0;

const differenceInTime = new Date( bookingcheck_out_date).getTime() - new Date (bookingcheck_in_date).getTime();
// To calculate the no. of days between two dates
const differenceInDays = differenceInTime / (1000 * 3600 * 24);
return differenceInDays * apartment.price
    }
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
            Swal({
              text: "Đặt phòng thành công!",
              icon: "success",
              button: "OK",
            });
          })
          .catch((error) => {
            console.error('Đặt phòng ngắn hạn thất bại:', error);
            if (error.response && error.response.data && error.response.data.message) {
              const errors = Object.values(error.response.data.errors);
              setBookingError(errors);
            } else {
              setBookingError("Không thể đặt phòng!");
            }
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
        const postRequest1 = axios.post('http://127.0.0.1:8000/api/bookAppointment', longTermBookingData);
        const postRequest2 = axios.post('https://63a57216318b23efa793a737.mockapi.io/api/appointment', longTermBookingData);
      
        Promise.all([postRequest1, postRequest2])
          .then((responses) => {
            const response1 = responses[0];
            const response2 = responses[1];
            alert('Bạn đã đặt lịch thành công! Vui lòng theo dõi trạng thái!')
            console.log('Đặt lịch dài hạn thành công:', response1.data);
            console.log('Response from anotherEndpoint:', response2.data);
            setDesiredRent('');
            setDesiredMoveInDate('');
            setDesiredViewingDate('');
            Swal({
              text: "Bạn đã đặt thành công !",
              icon: "success",
              button: "OK",
            });
            setShowLongTermBookingModal(false);
      })
      .catch((error) => {
        // Xử lý lỗi
        console.error('Đặt phòng dài hạn thất bại:', error);
        if (error.response && error.response.data && error.response.data.errors) {
          setFormErrors(error.response.data.errors);
        } else {
          setBookingError("Không thể đặt phòng!"); // Lỗi mặc định
        }
      });
      }
    }
  };

  if (!apartment) {
    return <p>Đang tải...</p>;
  }

  return (
    <div className='detail' style={{marginLeft:"2rem", marginRight:"2rem"}}>
      <div key={apartment.apartment_id} className='detail-card' >
        <div className='detail-image-gallery'>
          <Slider arrows={false} dots={false} autoplay={true} speed={5000}>
            {apartment.apartment_image.map((image, index) => (
              <div key={index} >
                <img style={{width:"100%", height:"30rem", marginLeft:"2rem"}} src={`http://localhost:8000/uploads/${image.name}`} alt="Apartment" />
              </div>
            ))}
          </Slider>
        </div>
        <div className='detail-right'>
          <div className='apartment-title'>
            {apartment.number_address} - {apartment.street} 
          </div>
          <div className='apartment-des'>{apartment.description} </div>
          <div className='service-des'>
            {apartment.service_apartment && apartment.service_apartment.map((service, index) => (
              <div key={index}>{service.services.description}</div>
            ))}
          </div>

          <div className='apartment-room'>Số phòng: {apartment.number_room}</div>
          <div className='apartment-area'>Diện tích: {apartment.area} m2</div>
          <div className='' style={{color:"red", fontWeight:"bold"}}>Giá tiền: {apartment.price} đ</div>
          <div className='apartment-area'>Trạng thái: {apartment.status} </div>

          <div className='apartment-address'>
            Địa chỉ: {apartment.number_address} - {apartment.street} - {apartment.ward} - {apartment.district}
          </div>


          {apartment.status === 'Còn phòng' && (
  <>
    {apartment.type_room === 'Phòng ngắn hạn' && (
      <Link onClick={handleBookNow} className="link-button">Đặt phòng</Link>
    )}
    {apartment.type_room === 'Phòng dài hạn' && (
      <Link onClick={handleBookNow} className="link-button">Đặt lịch ngay</Link>
    )}
  </>
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
            <div>
              Tổng tiền: {totalPrice()}
            </div>
            {bookingError && <div className="error-message">{bookingError}</div>}

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
              {formErrors.desired_rent && <div className="error-message">{formErrors.desired_rent}</div>}

            </div>
            <div>
              <label>Ngày dự kiến dọn vào:</label>
              <input type='date' value={desiredMoveInDate} onChange={handleDesiredMoveInDateChange} />
              {formErrors.desired_move_in_date && <div className="error-message">{formErrors.desired_move_in_date}</div>}

            </div>
            <div>
              <label>Ngày hẹn xem căn hộ:</label>
              <input type='datetime-local' value={desiredViewingDate} onChange={handleDesiredViewingDateChange} />
              {formErrors.appointment_date_time && <div className="error-message">{formErrors.appointment_date_time}</div>}

            </div>
          </Modal.Body>
          <Modal.Footer>
          <Button variant='primary' onClick={handleBookingSubmit}>
              Đặt lịch
            </Button>

          </Modal.Footer>
        </Modal>
      )};

      {userdetail !== null && userdetail !== undefined ? (
        <div className='apartment-rating'>
          <Star_rating userId={userdetail.id} apartmentId={apartment.apartment_id} rating={apartment.rating} />
          <Show_rating apartmentId={apartment.apartment_id} />

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
