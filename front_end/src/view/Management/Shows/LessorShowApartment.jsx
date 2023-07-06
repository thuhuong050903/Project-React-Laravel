import React, { useEffect, useState } from 'react';
import axios from 'axios';
import EditApartment from './EditApartment';
import { Link } from 'react-router-dom';
import Slider from 'react-slick';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBuilding, faExpand, faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';
import AddApartment from './AddApartment';

function LessorShowApartment() {
  const [apartments, setApartments] = useState([]);
  const [editModalOpen, setEditModalOpen] = useState(false); // Trạng thái hiển thị/ẩn modal chỉnh sửa
  const [selectedApartment, setSelectedApartment] = useState(null); // Căn hộ được chọn để chỉnh sửa
  const [addModalOpen, setAddModalOpen] = useState(false); // State for showing/hiding the add apartment modal

  const openAddModal = () => {
    setAddModalOpen(true);
  };

  const closeAddModal = () => {
    setAddModalOpen(false);
  };
  const user = JSON.parse(sessionStorage.getItem('user'));

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/api/get-apartments-byLessorId/${user.id}`);
        setApartments(response.data);
      } catch (error) {
        console.error(error);
      }
    };
  
    fetchData();
  }, []);
  

  const openEditModal = (apartment) => {
    setSelectedApartment(apartment);
    setEditModalOpen(true);
  };

  const closeEditModal = () => {
    setEditModalOpen(false);
  };

  return (
    <div style={{ marginTop: '8rem'}}>
      <h3 style={{marginLeft:"2rem"}}>Căn hộ của bạn</h3>
      <button onClick={openAddModal} style={{marginLeft:"2rem"}}>Thêm căn hộ</button>
      <div className="apartment-list" style={{ marginTop: '0rem', display: 'flex', flexWrap: 'wrap', gap: '1rem', marginLeft: '0.8rem' }}>
        {apartments ? (
          apartments.map((apartment) => (
            <div key={apartment.apartment_id} className="card">
              <div className="image-gallery">
                <Slider arrows={false} dots={false} autoplay={true} speed={3000} autoplaySpeed={10000}>
                  {apartment.apartment_image.map((image, index) => (
                    <div key={index}>
                      <img src={`http://localhost:8000/uploads/${image.name}`} alt="Apartment" />
                    </div>
                  ))}
                </Slider>
              </div>
              <div className="apartment-item">Cho thuê phòng - Dream Home - {apartment.ward} - {apartment.district}</div>
              <div className="apartment-price">{apartment.price} đ</div>
              <div className="apartment-item">
                <FontAwesomeIcon icon={faBuilding} className="icon" style={{ color: '#555555' }} />&nbsp;
                Số phòng: {apartment.number_room}
              </div>
              <div className="apartment-item">
                <FontAwesomeIcon icon={faExpand} className="icon" style={{ color: '#555555' }} />&nbsp;
                Diện tích: {apartment.area}
              </div>
              <div className="address">
                <FontAwesomeIcon icon={faMapMarkerAlt} className="address-icon" style={{ color: '#555555' }} />&nbsp;
                {apartment.number_address}, {apartment.street}, {apartment.ward}, {apartment.district}
              </div>
              <button onClick={() => openEditModal(apartment)}>Chỉnh sửa</button>
            </div>
          ))
        ) : (
          <p>Bạn chưa có căn hộ nào.</p>
        )}
      </div>

      {editModalOpen && (
        <EditApartment
          apartmentId={selectedApartment.apartment_id}
          onClose={closeEditModal}
        />
      )}

{addModalOpen && (
        <AddApartment
          onClose={closeAddModal}
        />
      )}
    </div>
  );
}

export default LessorShowApartment;
