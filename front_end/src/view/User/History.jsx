import React, { useEffect, useState } from "react";
import axios from "axios";
import "../../assets/style/History.css";
import AuthUser from "../../component/AuthUser";

const History = () => {
  const [apartments, setapartments] = useState([]);
  const [appointment, setAppointments] = useState([]);
  const { http } = AuthUser();
  const [userdetail, setUserdetail] = useState(null);

  const fetchUserDetail = () => {
    http.post("/me").then((res) => {
      setUserdetail(res.data);
    });
  };

  useEffect(() => {
    fetchUserDetail();
  }, []);

  useEffect(() => {
    if (userdetail && userdetail.id) {
      axios
        .get(`http://127.0.0.1:8000/api/history-apartments/${userdetail.id}`)
        .then((response) => {
          setapartments(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
    };
  }, [userdetail]);

  useEffect(() => {
    if (userdetail && userdetail.id) {
      axios
        .get(`http://127.0.0.1:8000/api/history-appointments/${userdetail.id}`)
        .then((response) => {
          setAppointments(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [userdetail]);

  return (
    <div className="history-container">
      <section>
        <div className="container py-2">
          <div className="h1 text-center text-dark" id="pageHeaderTitle">
            Booking History
          </div>
            <article key={apartments.book_id} className="postcard light blue">
              <a className="postcard__img_link" href="#">
                <img
                  className="postcard__img"
                  src="https://picsum.photos/1000/1000"
                  alt="Image Title"
                />
              </a>
              <div className="postcard__text t-dark">
                <h1 className="postcard__title blue">
                  <a href="#">Booking ID: {apartments.book_id}</a>
                </h1>
                <div className="postcard__subtitle small">
                  <time dateTime={apartments.check_in_date}>
                    <i className="fas fa-calendar-alt mr-2"></i>
                    Check-in: {apartments.check_in_date}, Check-out:{" "}
                    {apartments.check_out_date}
                  </time>
                </div>
                <div className="postcard__bar"></div>
                <div className="postcard__preview-txt">
                  Apartment ID: {apartments.apartment_id}
                  <br />
                  User ID: {apartments.user_id}
                  <br />
                  Phone: {apartments.phone}
                  <br />
                  Total Price: {apartments.total_price}
                  <br />
                  Status: {apartments.status}
                  <br />
                  {/* Apartment Description: {apartments.apartments.description} */}
                  <br />
                  {/* Price: {apartments.apartments.price} */}
                  <br />
                  {/* Number of Rooms: {apartments.apartments.number_room} */}
                  <br />
                  {/* Area: {apartments.apartments.area} */}
                  <br />
                  {/* Type of Room: {apartments.apartments.type_room} */}
                  <br />
                </div>
              </div>
            </article>
          
        </div>
      </section>

      <section>
        <div className="container py-2">
          <div className="h1 text-center text-dark" id="pageHeaderTitle">
            Appointment History
          </div>
            <article key={appointment.appointment_id} className="postcard light green">
              <a className="postcard__img_link" href="#">
                <img
                  className="postcard__img"
                  src="https://picsum.photos/500/501"
                  alt="Image Title"
                />
              </a>
              <div className="postcard__text t-dark">
                <h1 className="postcard__title green">
                  <a href="#">Appointment ID: {appointment.appointment_id}</a>
                </h1>
                <div className="postcard__subtitle small">
                  <time dateTime={appointment.appointment_date_time}>
                    <i className="fas fa-calendar-alt mr-2"></i>
                    {appointment.appointment_date_time}
                  </time>
                </div>
                <div className="postcard__bar"></div>
                <div className="postcard__preview-txt">
                  Apartment ID: {appointment.apartment_id}
                  <br />
                  User ID: {appointment.user_id}
                  <br />
                  Desired Rent: {appointment.desired_rent}
                  <br />
                  Desired Move-in Date: {appointment.desired_move_in_date}
                  <br />
                  Status: {appointment.status}
                  <br />
                  {/* Apartment Description: {appointment.apartments.description} */}
                  <br />
                  {/* Price: {appointment.apartments.price} */}
                  <br />
                  {/* Number of Rooms: {appointment.apartments.number_room} */}
                  <br />
                  {/* Area: {appointment.apartments.area} */}
                  <br />
                  {/* Type of Room: {appointment.apartments.type_room} */}
                  <br />
                </div>
              </div>
            </article>
         
        </div>
      </section>
    </div>
  );
};

export default History;
