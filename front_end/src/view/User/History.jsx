import React, { useEffect, useState } from "react";
import axios from "axios";
import "../../assets/style/History.css";
import AuthUser from "../../component/AuthUser";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInfoCircle } from "@fortawesome/free-solid-svg-icons";

const History = () => {
  const [apartments, setApartments] = useState([]);
  const [appointments, setAppointments] = useState([]);
  const { http } = AuthUser();
  const [userdetail, setUserdetail] = useState(null);
  const [isBookingHistoryLoading, setIsBookingHistoryLoading] = useState(true);
  const [isAppointmentHistoryLoading, setIsAppointmentHistoryLoading] = useState(true);

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

  return (
    <div className="history-container">
      <section>
        <div className="container">
          <h2 className="history-title">Lịch sử đặt căn hộ</h2>
          {!isBookingHistoryLoading ? (
            <div className="card">
              <FontAwesomeIcon icon={faInfoCircle} className="card__icon" />
              <p className="card__text">Bạn chưa đặt căn hộ nào!</p>
            </div>
          ) : (
            <div className="row">
              {apartments.map((apartment) => (
                <div key={apartment.book_id} className="col-md-6">
                  <div className="card card-history" style={{ width: "80%" }}>
                    <a className="card-img-link" href="#">
                      <img
                        className="card-img"
                        src="https://picsum.photos/1000/1000"
                        alt="Image Title"
                      />
                    </a>
                    <div className="card-body">
                      <div className="card-subtitle small">
                        <time dateTime={apartment.check_in_date}>
                          <i className="fas fa-calendar-alt mr-2"></i>
                          Ngày nhận phòng: {apartment.check_in_date}, Ngày trả phòng:{" "}
                          {apartment.check_out_date}
                        </time>
                      </div>
                      <div className="card-bar"></div>
                      <div className="card-preview-txt">
                        <p className="card-highlighted">Tổng tiền: {apartment.total_price}</p>
                        <p className="card-status">Trạng thái: {apartment.status}</p>
                        <p className="card-description">Mô tả căn phòng: {apartment.apartments.description}</p>
                        {/* Rest of the code */}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
  
      <section>
        <div className="container py-2">
          <h2 className="history-title">Lịch sử đặt cuộc hẹn xem phòng</h2>
          {!isAppointmentHistoryLoading ? (
            <div className="card">
              <FontAwesomeIcon icon={faInfoCircle} className="card__icon" />
              <p className="card__text">Bạn chưa đặt cuộc hẹn nào!</p>
            </div>
          ) : (
            <div className="history-small-card">
              {appointments.map((appointment) => (
                <div className="each-card">
                <div key={appointment.appointment_id} className="col-md-12">
                  <div className="card card-history" style={{ width: "80%" }}>
                    <a className="card-img-link" href="#">
                      <img
                        className="card-img" style={{width:'20rem'}}
                        src="https://picsum.photos/500/501"
                        alt="Image Title"
                      />
                    </a>
                    <div className="card-body">
                      <div className="card-subtitle small">
                        {/* Rest of the code */}
                      </div>
                      <div className="card-preview-txt">
                        <p className="card-highlighted">Giá mong muốn của bạn: {appointment.desired_rent} đ</p>
                        <p>Số lượng phòng: {appointment.apartments.number_room}</p>
                        <p>Loại phòng: {appointment.apartments.type_room}</p>
                        <p>Thời gian xem căn hộ: {appointment.appointment_date_time}</p>
                        <p>Thời gian dọn đến: {appointment.desired_move_in_date}</p>
                        <p className="card-status">Trạng thái: {appointment.status}</p>
                        <p>Giá / tháng: {appointment.apartments.price}</p>
                        <p>Diện tích: {appointment.apartments.area}</p>
                        {/* Rest of the code */}
                      </div>
                    </div>
                    </div>
                
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      </div>
  
  );
              }
export default History;
