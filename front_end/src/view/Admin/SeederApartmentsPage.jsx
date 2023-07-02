import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import "../../assets/style/SeederApartmentPage.css";
import "../../assets/style/ListApartment.css";

const SeederApartmentsPage = () => {
  const { id } = useParams();
  const [apartments, setApartments] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchSeederApartments(id);
  }, [id]);

  const fetchSeederApartments = async (id) => {
    try {
      const response = await axios.get(`http://localhost:8000/api/SeederApartmentPage/${id}`);
      const apartmentsData = response.data;
      console.log(apartmentsData); // Add this line to check the structure of apartmentsData
      setApartments(apartmentsData);
    } catch (error) {
      console.error("Error fetching seeder apartments:", error);
      setError("Error fetching seeder apartments");
    }
  };


  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="list_apartment bg-secondary" style={{ zIndex: 9999 }}>
      {/* <h2>Seeder Apartments (ID: {id})</h2> */}

        <div>
           <h3>Seeder Information</h3>
            <table  style={{border: 1 }}>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Fullname</th>
                  <th>Phone</th>
                  <th>Email</th>
                  <th>Address</th>
                  <th>Birthday</th>
                </tr>
              </thead>
              <tbody>
        <tr>
          <td>{apartments[0]?.users?.username}</td>
          <td>{apartments[0]?.users?.fullname}</td>
          <td>{apartments[0]?.users?.phone}</td>
          <td>{apartments[0]?.users?.email}</td>
          <td>{apartments[0]?.users?.address}</td>
          <td>{apartments[0]?.users?.birthday}</td>
        </tr>
</tbody>

          </table>
        </div>
     
    
      <br></br>
      <ul>
        {apartments.map((apartment) => (
          <article className="postcard dark blue" key={apartment.apartment_id}>
            <a className="postcard__img_link" href="#">
              <img className="postcard__img" src={`http://localhost:8000/photos/${apartment.apartment_image[0].name}`} alt="Apartment Image" />
            </a>
            <div className="postcard__text">
              <h1 className="postcard__title blue">
                <a href="#">{apartment.description}</a>
              </h1>
              <div className="postcard__subtitle small">
                <time dateTime="">
                  <i className="fas fa-calendar-alt mr-2"></i>Số phòng: {apartment.number_room}
                </time>
              </div>
              <div className="postcard__bar"></div>
              <div className="postcard__preview-txt">Diện tích: {apartment.area} m2</div>
              <ul className="postcard__tagbox">
                <p className="tag__item">
                  <i className="fas fa-tag mr-2"></i>Hình thức đặt phòng: {apartment.type_room}
                </p>
                <p className="tag__item">
                  <i className="fas fa-clock mr-2"></i>Giá căn hộ: {apartment.price.toLocaleString("vi-VN", { style: "currency", currency: "VND" })}
                </p>
              </ul>
            </div>
          </article>
        ))}
      </ul>
    </div>
  );
};

export default SeederApartmentsPage;
