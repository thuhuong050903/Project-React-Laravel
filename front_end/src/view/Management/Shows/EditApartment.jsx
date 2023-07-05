import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Modal, Button } from 'react-bootstrap';

function EditApartment({ apartmentId, onClose }) {
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [number_room, setNumberRoom] = useState('');
  const [area, setArea] = useState('');
  const [type_room, setTypeRoom] = useState('');
  const [number_address, setNumberAddress] = useState('');
  const [street, setStreet] = useState('');
  const [ward, setWard] = useState('');
  const [district, setDistrict] = useState('');
  const [apartmentImages, setApartmentImages] = useState([]);
  const [showAddPhotoModal, setShowAddPhotoModal] = useState(false);

  useEffect(() => {
    fetchApartmentData();
  }, []);

  const fetchApartmentData = async () => {
    try {
      const response = await axios.get(`http://localhost:8000/api/get-apartment/${apartmentId}`);
      const apartmentData = response.data;
      setDescription(apartmentData.description);
      setPrice(apartmentData.price);
      setNumberRoom(apartmentData.number_room);
      setArea(apartmentData.area);
      setTypeRoom(apartmentData.type_room);
      setNumberAddress(apartmentData.number_address);
      setStreet(apartmentData.street);
      setWard(apartmentData.ward);
      setDistrict(apartmentData.district);
      setApartmentImages(apartmentData.apartment_image);

      console.log(apartmentData);
    } catch (error) {
      console.error(error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(`http://localhost:8000/api/update-apartment/${apartmentId}`, {
        description: description,
        price: price,
        number_room: number_room,
        area: area,
        type_room: type_room,
        number_address: number_address,
        street: street,
        ward: ward,
        district: district,
      });
      console.log(response.data);
      onClose();
      // Handle success, perform other operations (e.g., display a notification, redirect the user to the apartment list page, etc.)
    } catch (error) {
      console.error(error);
      // Handle error, display error message or perform other error handling
    }
  };

  const handleClose = () => {
    onClose();
  };

  const handleAddPhoto = () => {
    setShowAddPhotoModal(true);
  };

  const handleAddPhotoClose = () => {
    setShowAddPhotoModal(false);
  };

  const handleAddPhotoSave = () => {
    // Logic to handle photo save
    setShowAddPhotoModal(false);
  };

  const handleDeletePhoto = (photoId) => {
    // Logic to delete photo by photoId
  };

  return (
    <Modal show={true} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Chỉnh sửa căn hộ</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form onSubmit={handleSubmit}>
          <div>
            <label>Mô tả:</label>
            <input type="text" value={description} onChange={(e) => setDescription(e.target.value)} />
          </div>
          <div>
            <label>Giá:</label>
            <input type="text" value={price} onChange={(e) => setPrice(e.target.value)} />
          </div>
          <div>
            <label>Số phòng:</label>
            <input type="text" value={number_room} onChange={(e) => setNumberRoom(e.target.value)} />
          </div>
          <div>
            <label>Diện tích:</label>
            <input type="text" value={area} onChange={(e) => setArea(e.target.value)} />
          </div>
          <div>
            <label>Loại phòng:</label>
            <input type="text" value={type_room} onChange={(e) => setTypeRoom(e.target.value)} />
          </div>
          <div>
            <label>Số nhà:</label>
            <input type="text" value={number_address} onChange={(e) => setNumberAddress(e.target.value)} />
          </div>
          <div>
            <label>Đường:</label>
            <input type="text" value={street} onChange={(e) => setStreet(e.target.value)} />
          </div>
          <div>
            <label>Phường/Xã:</label>
            <input type="text" value={ward} onChange={(e) => setWard(e.target.value)} />
          </div>
          <div>
            <label>Quận/Huyện:</label>
            <input type="text" value={district} onChange={(e) => setDistrict(e.target.value)} />
          </div>
          <div>
            <label>Hình ảnh:</label>
            {apartmentImages.map((image) => (
              <div key={image.name} style={{display:"flex",flexDirection:"row", flexWrap:"wrap",gap:"1px"}}>
                      <img src={`http://localhost:8000/uploads/${image.name}`} alt="Apartment" style={{width:"5rem"}} />
                <button onClick={() => handleDeletePhoto(image.id)} style={{height:"2rem"}}>x</button>
              </div>
            ))}
            <Button variant="success" onClick={handleAddPhoto}>
              Thêm ảnh
            </Button>
          </div>
          <Button variant="primary" type="submit">
            Lưu
          </Button>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </form>
      </Modal.Body>
      <Modal.Footer>
      </Modal.Footer>

      {showAddPhotoModal && (
        <Modal show={true} onHide={handleAddPhotoClose}>
          <Modal.Header closeButton>
            <Modal.Title>Thêm ảnh</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {/* AddPhotoForm or your custom photo upload component */}
            <p>AddPhotoForm</p>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleAddPhotoClose}>
              Close
            </Button>
            <Button variant="primary" onClick={handleAddPhotoSave}>
              Lưu
            </Button>
          </Modal.Footer>
        </Modal>
      )}
    </Modal>
  );
}

export default EditApartment;
