import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import axios from 'axios';

import AddPhotoForm from './AddPhotoForm';

function AddApartmentForm({ onSave }) {
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [number_room, setNumberRoom] = useState('');
  const [area, setArea] = useState('');
  const [type_room, setTypeRoom] = useState('');
  const [number_address, setNumberAddress] = useState('');
  const [street, setStreet] = useState('');
  const [ward, setWard] = useState('');
  const [district, setDistrict] = useState('');
  const [showAddApartmentModal, setShowAddApartmentModal] = useState(true);
  const [showAddPhotoModal, setShowAddPhotoModal] = useState(false);
  const user = JSON.parse(sessionStorage.getItem('user'));

  const handleAddApartmentSave = (e) => {
    e.preventDefault();
    const apartmentData = {
      user_id: user.id,
      description,
      price,
      number_room,
      area,
      type_room,
      number_address,
      street,
      ward,
      district,
    };

    axios
      .post('http://localhost:8000/api/add-apartment', apartmentData)
      .then((response) => {
        setShowAddApartmentModal(false);
        setShowAddPhotoModal(true);
      })
      .catch((error) => {
        console.error(error);
        // Xử lý lỗi từ API endpoint (nếu cần)
      });
  };

  const handleAddPhotoClose = () => {
    setShowAddPhotoModal(false);
  };

  const handleAddPhotoSave = () => {
    setShowAddPhotoModal(false);
    onSave(); // Gọi callback để thông báo thành công thêm căn hộ
  };

  return (
    <div>
      {showAddApartmentModal && (
        <form onSubmit={handleAddApartmentSave}>
          <div>
            <label>Mô tả:</label>
            <input
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          <div>
            <label>Giá:</label>
            <input
              type="text"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
          </div>
          <div>
            <label>Số phòng:</label>
            <input
              type="text"
              value={number_room}
              onChange={(e) => setNumberRoom(e.target.value)}
            />
          </div>
          <div>
            <label>Diện tích:</label>
            <input
              type="text"
              value={area}
              onChange={(e) => setArea(e.target.value)}
            />
          </div>
          <div>
            <label>Loại phòng:</label>
            <input
              type="text"
              value={type_room}
              onChange={(e) => setTypeRoom(e.target.value)}
            />
          </div>
          <div>
            <label>Số nhà:</label>
            <input
              type="text"
              value={number_address}
              onChange={(e) => setNumberAddress(e.target.value)}
            />
          </div>
          <div>
            <label>Đường:</label>
            <input
              type="text"
              value={street}
              onChange={(e) => setStreet(e.target.value)}
            />
          </div>
          <div>
            <label>Phường/Xã:</label>
            <input
              type="text"
              value={ward}
              onChange={(e) => setWard(e.target.value)}
            />
          </div>
          <div>
            <label>Quận/Huyện:</label>
            <input
              type="text"
              value={district}
              onChange={(e) => setDistrict(e.target.value)}
            />
          </div>
          <Button variant="primary" type="submit">
            Save
          </Button>
        </form>
      )}

      {showAddPhotoModal && (
        <AddPhotoForm onClose={handleAddPhotoClose} onSave={handleAddPhotoSave} />
      )}
    </div>
  );
}

export default AddApartmentForm;
