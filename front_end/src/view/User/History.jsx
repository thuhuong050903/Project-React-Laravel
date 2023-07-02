import React, { useEffect, useState } from "react";
import axios from "axios";
import "../../assets/style/History.css";
import AuthUser from "../../component/AuthUser";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import { Modal } from 'react-bootstrap';

const History = () => {
  const [apartments, setApartments] = useState([]);
  const [appointments, setAppointments] = useState([]);
  const { http } = AuthUser();
  const [userdetail, setUserdetail] = useState(null);
  const [isBookingHistoryLoading, setIsBookingHistoryLoading] = useState(true);
  const [isAppointmentHistoryLoading, setIsAppointmentHistoryLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [selectedApartment, setSelectedApartment] = useState(null);
  const [reason, setReason] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // fetch info user
  const fetchUserDetail = () => {
    http.post("/me").then((res) => {
      setUserdetail(res.data);
    });
  };

  useEffect(() => {
    fetchUserDetail();
  }, []);

  useEffect(() => {
    if (userdetail) {
      const userId = userdetail.id;
      const fetchBookingHistory = async () => {
        try {
          const response = await axios.get(`http://127.0.0.1:8000/api/history-apartments/${userId}`);
          setApartments(response.data);
          setIsBookingHistoryLoading(true);
        } catch (error) {
          setIsBookingHistoryLoading(false);
          console.log(error);
        }
      };

      const fetchAppointmentHistory = async () => {
        try {
          const response = await axios.get(`http://127.0.0.1:8000/api/history-appointments/${userId}`);
          setAppointments(response.data);
          setIsAppointmentHistoryLoading(true);
        } catch (error) {
          console.log(error);
          setIsAppointmentHistoryLoading(false);
        }
      };

      fetchBookingHistory();
      fetchAppointmentHistory();
    }
  }, [userdetail]);

  const handleEditRequest = (apartments) => {
    setSelectedApartment(apartments);
    setShowModal(true);
  };

  const handleModalClose = () => {
    setShowModal(false);
    setReason("");
  };

  const handleReasonChange = (event) => {
    setReason(event.target.value);
  };

  const handleSubmitRequest = () => {
    setIsSubmitting(true);

    const payload = {
      apartment_id: selectedApartment.apartment_id,
      user_id: userdetail.id,
      description: reason,
    };

    axios
      .post(`http://127.0.0.1:8000/api/apartment-issues`, payload)
      .then((response) => {
        console.log(response.data);
        setReason("");
        handleModalClose();
        setIsSubmitting(false);
      })
      .catch((error) => {
        console.error(error);
        setIsSubmitting(false);
      });
  };


  return (
    <div className="history-container">
      {/* Hiển thị lịch sử đặt căn hộ */}
      <section>
          <h2 className="history-title">Lịch sử đặt căn hộ</h2>
          {!isBookingHistoryLoading ? (
            <div className="card">
              <FontAwesomeIcon icon={faInfoCircle} className="card__icon" />
              <p className="card__text">Bạn chưa đặt căn hộ nào!</p>
            </div>
          ) : (
            <div className="row" style={{marginBottom:"3rem"}}>
              {Array.isArray(apartments) ? (
                apartments.map((apartment) => (
                  <div key={apartment.book_id} className="col-md-12">
                    <div className="row card-history ">
                      <div className="col-md-3  ">
                      <img src={apartment.apartments.apartment_image[0].name} alt='Apartment' className="card-img-top" />
                      </div>
                      <div className="col-md-7 card-body ">
                        <div className="card-subtitle ">
                        <p className="card-status">Trạng thái: {apartment.status}</p>            
                        </div>
                        <div className="card-bar"></div>
                        <div className="card-preview-txt">
                          <p className="card-highlighted">Tổng tiền: {apartment.total_price} đ</p>
                          <p className="card-description">Mô tả căn phòng: {apartment.apartments.description}</p>
                          <time dateTime={apartment.check_in_date}>
                            Ngày nhận phòng: {apartment.check_in_date}   |    Ngày trả phòng:{" "}
                            {apartment.check_out_date}
                          </time>
                        </div>
                        
                      </div>
                      <div className="col-md-2">
                        {apartment.status === "Đã xác nhận" && (
                            <button className="edit-button btn btn-primary" onClick={() => handleEditRequest(apartment)}>
                              Yêu cầu chỉnh sửa căn hộ
                            </button>
                          )}
                        </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="card card-history">
                  <img src={apartments.apartments.apartment_image[0].name} alt='Apartment' className="card-img-top" />
                  <div className="card-body">
                    <div className="card-subtitle small">
                      <time dateTime={apartments.check_in_date}>
                        <i className="fas fa-calendar-alt mr-2"></i>
                        Ngày nhận phòng: {apartments.check_in_date}, Ngày trả phòng:{" "}
                        {apartments.check_out_date}
                      </time>
                    </div>
                    <div className="card-bar"></div>
                    <div className="card-preview-txt">
                      <p className="card-highlighted">Tổng tiền: {apartments.total_price}</p>
                      <p className="card-status">Trạng thái: {apartments.status}</p>
                      <p className="card-description">Mô tả căn phòng: {apartments.description}</p>
                      {apartments.status === "Đã xác nhận" && (
                        <button className="edit-button btn btn-primary" onClick={() => handleEditRequest(apartments)}>
                          Yêu cầu chỉnh sửa
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
      </section>
      {/* Modal yeu cau chinh sua can ho */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Yêu cầu chỉnh sửa căn hộ</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <textarea
            placeholder="Nhập lí do chỉnh sửa..."
            value={reason}
            onChange={handleReasonChange}
            className="form-control"
          />
        </Modal.Body>
        <Modal.Footer>
          <button className="btn btn-secondary" onClick={handleModalClose}>Đóng</button>
          <button className="btn btn-primary" disabled={isSubmitting} onClick={handleSubmitRequest}>
            Gửi yêu cầu
          </button>
        </Modal.Footer>
      </Modal>


      <section>
          <h2 className="history-title">Lịch sử đặt cuộc hẹn xem phòng</h2>
          {!isAppointmentHistoryLoading ? (
            <div className="card">
              <FontAwesomeIcon icon={faInfoCircle} className="card__icon" />
              <p className="card__text">Bạn chưa đặt cuộc hẹn nào!</p>
            </div>
          ) : (
            <div className="row" style={{marginBottom:"3rem"}}>
              {Array.isArray(appointments) ? (
                appointments.map((appointment) => (
                  <div key={appointment.book_id} className="col-md-12">
                    <div className="row card-history ">
                      <div className="col-md-3  ">
                      <img src={appointment.apartments.apartment_image[0].name} alt='Apartment' className="card-img-top" />
                      </div>
                      <div className="col-md-7 card-body ">
                        <div className="card-subtitle ">
                        <p className="card-status">Trạng thái: {appointment.status}</p>            
                        </div>
                        <div className="card-bar"></div>
                        <div className="card-preview-txt">
                          <p className="card-highlighted">Giá tiền/tháng: {appointment.apartments.price} đ</p>
                          <p className="card-description">Mô tả căn phòng: {appointment.apartments.description}</p>
                          <time dateTime={appointment.check_in_date}>
                            Ngày xem phòng: {appointment.appointment_date_time}   |    Ngày dọn vào:{" "}
                            {appointment.desired_move_in_date}
                          </time>
                        </div>
                        
                      </div>
                      <div className="col-md-2">
                        {appointment.status === "Chờ xác nhận" && (
                            <button className="edit-button btn btn-primary" onClick={() => handleEditRequest(apartment)}>
                              Chỉnh sửa
                            </button>
                          )}
                        </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="card card-history">
                  <img src={apartments.apartments.apartment_image[0].name} alt='Apartment' className="card-img-top" />
                  <div className="card-body">
                    <div className="card-subtitle small">
                      <time dateTime={apartments.check_in_date}>
                        <i className="fas fa-calendar-alt mr-2"></i>
                        Ngày nhận phòng: {apartments.check_in_date}, Ngày trả phòng:{" "}
                        {apartments.check_out_date}
                      </time>
                    </div>
                    <div className="card-bar"></div>
                    <div className="card-preview-txt">
                      <p className="card-highlighted">Tổng tiền: {apartments.total_price}</p>
                      <p className="card-status">Trạng thái: {apartments.status}</p>
                      <p className="card-description">Mô tả căn phòng: {apartments.description}</p>
                      {apartments.status === "Đã xác nhận" && (
                        <button className="edit-button btn btn-primary" onClick={() => handleEditRequest(apartments)}>
                          Yêu cầu chỉnh sửa
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
      </section>
    </div>
  );
};


export default History;