import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import "../../assets/style/SeederApartmentPage.css";

const SeederApartmentsPage = () => {
  const { id } = useParams();
  const [apartments, setApartments] = useState([]);
  const [seederInfo, setSeederInfo] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchSeederApartments(id);
    fetchSeederInfo(id);
  }, [id]);

  const fetchSeederApartments = async (id) => {
    try {
      const response = await axios.get(`http://localhost:8000/api/SeederApartmentPage/${id}`);
      const apartmentsData = response.data;
      console.log (apartmentsData);
      const apartmentsWithImages = await Promise.all(
        apartmentsData.map(async (apartment) => {
          const imageResponse = await axios.get(`http://localhost:8000/api/related-photos/${apartment.apartment_id}`);
          const images = imageResponse.data;
          console.log(images)
          return {
            ...apartment,
            images,
          };
        })
      );

      setApartments(apartmentsWithImages);
    } catch (error) {
      console.error("Error fetching seeder apartments:", error);
      setError("Error fetching seeder apartments");
    }
  };

  const fetchSeederInfo = async (id) => {
    try {
      const response = await axios.get(`http://localhost:8000/api/SeederInfo/${id}`);
      const seederInfoData = response.data;
      setSeederInfo(seederInfoData);
    } catch (error) {
      console.error("Error fetching seeder info:", error);
      setError("Error fetching seeder info");
    }
  };

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="list_apartment bg-secondary" style={{ zIndex: 9999 }}>
      {seederInfo && (
        <div>
           <h3>List apartment of seeder</h3>
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
                  <td>{seederInfo.username}</td>
                  <td>{seederInfo.fullname}</td>
                  <td>{seederInfo.phone}</td>
                  <td>{seederInfo.email}</td>
                  <td>{seederInfo.address}</td>
                  <td>{seederInfo.birthday}</td>
                </tr>
              </tbody>
          </table>
        </div>
      )}
      <br></br>
      <ul>
        {apartments.map((apartment) => (
          <article className="postcard  blue" key={apartment.apartment_id}>
            <a className="postcard__img_link" href="#"><img className="postcard__img" src={`http://localhost:8000/photos/${apartment.images[0].name}`} alt="Apartment Image" />
            </a>
            <div className="postcard__text">
              <h1 className="postcard__title blue">
                <a href="#">{apartment.description}</a>
              </h1>
              
              <div className="row postcard__bar" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr' }}>
  <div className="postcard__subtitle small">
    <table className="postcard__table">
      <tbody>
        <tr>
          <td><i className="fas fa-calendar-alt mr-2"></i>Số phòng:</td>
          <td>{apartment.number_room}</td>
        </tr>
        <tr>
          <td><i className="fas fa-calendar-alt mr-2"></i>Diện tích:</td>
          <td>{apartment.area} m2</td>
        </tr>
        <tr>
          <td><i className="fas fa-tag mr-2"></i>Hình thức đặt phòng:</td>
          <td>{apartment.type_room}</td>
        </tr>
        <tr>
          <td><i className="fas fa-clock mr-2"></i>Giá căn hộ:</td>
          <td>{apartment.price.toLocaleString("vi-VN", { style: "currency", currency: "VND" })}</td>
        </tr>
      </tbody>
    </table>
  </div>
  <div className="postcard__subtitles small">
    <table className="postcard__table">
      <tbody>
        <tr>
          <td><i className="fas fa-calendar-alt mr-2"></i>Số đường</td>
          <td>{apartment.number_address}</td>
        </tr>
        <tr>
          <td><i className="fas fa-calendar-alt mr-2"></i>Đường:</td>
          <td>{apartment.street}</td>
        </tr>
        <tr>
          <td><i className="fas fa-tag mr-2"></i>Phường:</td>
          <td>{apartment.ward}</td>
        </tr>
        <tr>
          <td><i className="fas fa-clock mr-2"></i>Quận:</td>
          <td>{apartment.district}</td>
        </tr>
      </tbody>
    </table>
  </div>
</div>

              
            </div>
          </article>
        ))}
      </ul>
    </div>
  );
};

export default SeederApartmentsPage;
