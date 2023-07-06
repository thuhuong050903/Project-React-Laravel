import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import "../../assets/style/SeederApartmentPage.css";
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const SeederApartmentsPage = () => {
  const { id } = useParams();
  const [apartments, setApartments] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchSeederApartments(id);
  }, []);

  const fetchSeederApartments = async (id) => {
    try {
      const response = await axios.get(`http://localhost:8000/api/get-apartments-byLessorId/${id}`);
      const apartmentsData = response.data;
      console.log (apartmentsData);
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
    <div className="list_apartment" style={{ zIndex: 9999,backgroundColor:"#ffffff",marginTop:"2.6rem",marginLeft:"14rem",height:"50rem", border:"1px solid grey", width:"82.5%"}}>
      {apartments && (
        <div>
           <h3>Thông tin chủ sở hữu</h3>
            <table  style={{border: 1 }}>
              <thead>
                <tr>
                  <th>Tên</th>
                  <th>Tên đầy đủ</th>
                  <th>Số điện thoại</th>
                  <th>Email</th>
                  <th>Địa chỉ</th>
                  <th>Ngày sinh</th>
                </tr>
              </thead>
              <tbody>
              {apartments.slice(0, 1).map((apartment, index) => (
      <tr key={index}>
        <td>{apartment.users.username}</td>
        <td>{apartment.users.fullname}</td>
        <td>{apartment.users.phone}</td>
        <td>{apartment.users.email}</td>
        <td>{apartment.users.address}</td>
        <td>{apartment.users.birthday}</td>
      </tr>
    ))}
              </tbody>
          </table>
        </div>
      )}
      <br></br>
      <div style={{display:"flex",gap:"1rem",flexWrap:"wrap",marginLeft:"3rem"}}>
        {apartments.map((apartment) => (
           <div className="card">
           <div className="card-img-body">
                <Slider arrows={false} dots={false} autoplay={true} speed={3000} autoplaySpeed={10000}>
                  {apartment.apartment_image.map((image, index) => (
                    <div key={index}>
                      <img src={`http://localhost:8000/uploads/${image.name}`} alt="Apartment" />
                    </div>
                  ))}
                </Slider>

           </div>
           <div className="card-body">
             <h4 className="card-title">{apartment.number_address} - {apartment.street} - {apartment.ward} - {apartment.district}</h4>
             <p className="card-text">{apartment.description}</p>
             <p className="card-text">Giá: {apartment.price} VND</p>
             <p className="card-text">Loại phòng: {apartment.type_room}</p>
             <p className="card-text">Số phòng: {apartment.number_room}</p>
             <p className="card-text">Diện tích: {apartment.area} m2</p>


           </div>
         </div>
        ))}
      </div>
    </div>
  );
};

export default SeederApartmentsPage;
