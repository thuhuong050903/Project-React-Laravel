import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Modal } from 'react-bootstrap';
import axios from 'axios';
import AuthUser from '../../component/AuthUser';
import '../../assets/style/Modal_booking.css';
import '../../assets/style/Detail.css';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

function Detail() {
  const { id } = useParams();

  const [apartment, setApartment] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [showLongTermBookingModal, setShowLongTermBookingModal] = useState(false);
  const [bookingPhone, setBookingPhone] = useState('');
  const [bookingcheck_in_date, setBookingcheck_in_date] = useState('');
  const [bookingcheck_out_date, setBookingcheck_out_date] = useState('');
  const [desiredRent, setDesiredRent] = useState('');
  const [desiredMoveInDate, setDesiredMoveInDate] = useState('');
  const [desiredViewingDate, setDesiredViewingDate] = useState('');
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [reviewRating, setReviewRating] = useState(0);
  const [reviewComment, setReviewComment] = useState('');

  const handleReviewRatingChange = (value) => {
    setReviewRating(value);
  };

  const handleReviewCommentChange = (e) => {
    setReviewComment(e.target.value);
  };

  const handleReviewSubmit = () => {
    if (userdetail) {
      const reviewData = {
        user_id: userdetail.id,
        apartment_id: apartment.apartment_id,
        rating: reviewRating,
        comment: reviewComment,
      };

      axios
        .post('http://127.0.0.1:8000/api/reviews', reviewData)
        .then((response) => {
          console.log('Gửi đánh giá thành công:', response.data);
          setReviewRating(0);
          setReviewComment('');
          setShowReviewModal(false);
        })
        .catch((error) => {
          console.error('Gửi đánh giá thất bại:', error);
        });
    } else {
      alert('Bạn cần đăng nhập để đánh giá căn hộ.');
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

  const handleBookNow = () => {
    if (apartment.type_room === 'Phòng ngắn hạn') {
      if (userdetail && userdetail.id) {
        setShowModal(true);
      } else {
        alert('Bạn cần đăng nhập để đặt phòng.');
      }
    } else if (apartment.type_room === 'Phòng dài hạn') {
      if (userdetail && userdetail.id) {
        setShowLongTermBookingModal(true);
      } else {
        alert('Bạn cần đăng nhập để đặt phòng.');
      }
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setBookingPhone('');
    setBookingcheck_in_date('');
    setBookingcheck_out_date('');
  };

  const handleCloseLongTermBookingModal = () => {
    setShowLongTermBookingModal(false);
    setDesiredRent('');
    setDesiredMoveInDate('');
    setDesiredViewingDate('');
  };

  const handleSubmitBooking = () => {
    if (!bookingPhone || !bookingcheck_in_date || !bookingcheck_out_date) {
      alert('Vui lòng điền đầy đủ thông tin.');
      return;
    }

    const bookingData = {
      user_id: userdetail.id,
      apartment_id: apartment.apartment_id,
      phone: bookingPhone,
      check_in_date: bookingcheck_in_date,
      check_out_date: bookingcheck_out_date,
    };

    axios
      .post('http://127.0.0.1:8000/api/bookings', bookingData)
      .then((response) => {
        console.log('Đặt phòng thành công:', response.data);
        setShowModal(false);
        setBookingPhone('');
        setBookingcheck_in_date('');
        setBookingcheck_out_date('');
      })
      .catch((error) => {
        console.error('Đặt phòng thất bại:', error);
      });
  };

  const handleSubmitLongTermBooking = () => {
    if (!desiredRent || !desiredMoveInDate || !desiredViewingDate) {
      alert('Vui lòng điền đầy đủ thông tin.');
      return;
    }

    const bookingData = {
      user_id: userdetail.id,
      apartment_id: apartment.apartment_id,
      rent: desiredRent,
      move_in_date: desiredMoveInDate,
      viewing_date: desiredViewingDate,
    };

    axios
      .post('http://127.0.0.1:8000/api/bookings', bookingData)
      .then((response) => {
        console.log('Đặt phòng thành công:', response.data);
        setShowLongTermBookingModal(false);
        setDesiredRent('');
        setDesiredMoveInDate('');
        setDesiredViewingDate('');
      })
      .catch((error) => {
        console.error('Đặt phòng thất bại:', error);
      });
  };

  useEffect(() => {
    axios
      .get(`http://127.0.0.1:8000/api/get-apartment/${id}`)
      .then((response) => {
        console.log('Dữ liệu căn hộ:', response.data);
        setApartment(response.data);
      })
      .catch((error) => {
        console.error('Lỗi khi lấy dữ liệu căn hộ:', error);
      });
  }, [id]);

  return (
    <div className="detail">
      {apartment ? (
        <div>
         <Slider className="carousel" dots={true} infinite={true} speed={500} slidesToShow={1} slidesToScroll={1}>
  {apartment.apartment_image.map((image, index) => (
    <div key={index}>
      <img src={image.name} alt={image.name} />
    </div>
  ))}
</Slider>


          <h2>{apartment.name}</h2>
          <div className="detail-content">
            <div className="detail-info">
              <h3>Thông tin căn hộ</h3>
              <p>
                <strong>Địa chỉ:</strong> {apartment.address}
              </p>
              <p>
                <strong>Diện tích:</strong> {apartment.area}m<sup>2</sup>
              </p>
              <p>
                <strong>Giá thuê:</strong> {apartment.price} đồng/tháng
              </p>
              <p>
                <strong>Loại phòng:</strong> {apartment.type_room}
              </p>
              <p>
                <strong>Mô tả:</strong> {apartment.description}
              </p>
            </div>

            <div className="detail-booking">
              <h3>Đặt phòng</h3>
              {apartment.type_room === 'Phòng ngắn hạn' && (
                <div>
                  <p>
                    <strong>Số điện thoại:</strong>
                  </p>
                  <input
                    type="text"
                    placeholder="Nhập số điện thoại"
                    value={bookingPhone}
                    onChange={handleBookingPhoneChange}
                  />

                  <p>
                    <strong>Ngày nhận phòng:</strong>
                  </p>
                  <input
                    type="date"
                    value={bookingcheck_in_date}
                    onChange={handleBookingcheck_in_dateChange}
                  />

                  <p>
                    <strong>Ngày trả phòng:</strong>
                  </p>
                  <input
                    type="date"
                    value={bookingcheck_out_date}
                    onChange={handleBookingcheck_out_dateChange}
                  />

                  <button className="btn btn-primary" onClick={handleBookNow}>
                    Đặt ngay
                  </button>
                </div>
              )}

              {apartment.type_room === 'Phòng dài hạn' && (
                <div>
                  <p>
                    <strong>Giá mong muốn:</strong>
                  </p>
                  <input
                    type="text"
                    placeholder="Nhập giá mong muốn"
                    value={desiredRent}
                    onChange={handleDesiredRentChange}
                  />

                  <p>
                    <strong>Ngày dọn vào:</strong>
                  </p>
                  <input
                    type="date"
                    value={desiredMoveInDate}
                    onChange={handleDesiredMoveInDateChange}
                  />

                  <p>
                    <strong>Ngày xem nhà:</strong>
                  </p>
                  <input
                    type="date"
                    value={desiredViewingDate}
                    onChange={handleDesiredViewingDateChange}
                  />

                  <button className="btn btn-primary" onClick={handleBookNow}>
                    Đặt ngay
                  </button>
                </div>
              )}
            </div>
          </div>

          <div className="detail-reviews">
            <h3>Đánh giá</h3>
            {apartment.reviews.length > 0 ? (
              <div>
                {apartment.reviews.map((review, index) => (
                  <div key={index} className="review">
                    <div className="rating">
                      <FontAwesomeIcon icon={['fas', 'star']} className="star" />
                      <p>{review.rating}</p>
                    </div>
                    <p>{review.comment}</p>
                  </div>
                ))}
              </div>
            ) : (
              <p>Chưa có đánh giá cho căn hộ này.</p>
            )}

            {userdetail && (
              <div className="review-form">
                <button className="btn btn-primary" onClick={() => setShowReviewModal(true)}>
                  Viết đánh giá
                </button>
              </div>
            )}
          </div>
        </div>
      ) : (
        <p>Đang tải dữ liệu căn hộ...</p>
      )}

      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Đặt phòng</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Số điện thoại:</p>
          <input
            type="text"
            placeholder="Nhập số điện thoại"
            value={bookingPhone}
            onChange={handleBookingPhoneChange}
          />

          <p>Ngày nhận phòng:</p>
          <input
            type="date"
            value={bookingcheck_in_date}
            onChange={handleBookingcheck_in_dateChange}
          />

          <p>Ngày trả phòng:</p>
          <input
            type="date"
            value={bookingcheck_out_date}
            onChange={handleBookingcheck_out_dateChange}
          />
        </Modal.Body>
        <Modal.Footer>
          <button className="btn btn-secondary" onClick={handleCloseModal}>
            Đóng
          </button>
          <button className="btn btn-primary" onClick={handleSubmitBooking}>
            Đặt phòng
          </button>
        </Modal.Footer>
      </Modal>

      <Modal show={showLongTermBookingModal} onHide={handleCloseLongTermBookingModal}>
        <Modal.Header closeButton>
          <Modal.Title>Đặt phòng</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Giá mong muốn:</p>
          <input
            type="text"
            placeholder="Nhập giá mong muốn"
            value={desiredRent}
            onChange={handleDesiredRentChange}
          />

          <p>Ngày dọn vào:</p>
          <input
            type="date"
            value={desiredMoveInDate}
            onChange={handleDesiredMoveInDateChange}
          />

          <p>Ngày xem nhà:</p>
          <input
            type="date"
            value={desiredViewingDate}
            onChange={handleDesiredViewingDateChange}
          />
        </Modal.Body>
        <Modal.Footer>
          <button className="btn btn-secondary" onClick={handleCloseLongTermBookingModal}>
            Đóng
          </button>
          <button className="btn btn-primary" onClick={handleSubmitLongTermBooking}>
            Đặt phòng
          </button>
        </Modal.Footer>
      </Modal>

      <Modal show={showReviewModal} onHide={() => setShowReviewModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Viết đánh giá</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="rating">
            <FontAwesomeIcon
              icon={['fas', 'star']}
              className={reviewRating >= 1 ? 'star active' : 'star'}
              onClick={() => handleReviewRatingChange(1)}
            />
            <FontAwesomeIcon
              icon={['fas', 'star']}
              className={reviewRating >= 2 ? 'star active' : 'star'}
              onClick={() => handleReviewRatingChange(2)}
            />
            <FontAwesomeIcon
              icon={['fas', 'star']}
              className={reviewRating >= 3 ? 'star active' : 'star'}
              onClick={() => handleReviewRatingChange(3)}
            />
            <FontAwesomeIcon
              icon={['fas', 'star']}
              className={reviewRating >= 4 ? 'star active' : 'star'}
              onClick={() => handleReviewRatingChange(4)}
            />
            <FontAwesomeIcon
              icon={['fas', 'star']}
              className={reviewRating >= 5 ? 'star active' : 'star'}
              onClick={() => handleReviewRatingChange(5)}
            />
          </div>
          <textarea
            placeholder="Nhập đánh giá"
            value={reviewComment}
            onChange={handleReviewCommentChange}
          ></textarea>
        </Modal.Body>
        <Modal.Footer>
          <button className="btn btn-secondary" onClick={() => setShowReviewModal(false)}>
            Đóng
          </button>
          <button className="btn btn-primary" onClick={handleReviewSubmit}>
            Gửi
          </button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default Detail;
