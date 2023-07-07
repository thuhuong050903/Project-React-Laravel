import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../../../assets/style/ModalAddApartment.css'
import Swal from "sweetalert";
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
  const [showModal, setShowModal] = useState(true);

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
      Swal({
        text: "Update successfully",
        icon: "success",
        button: "OK",
      })
      console.log(response.data);
      
      onClose();
      // Xử lý thành công, thực hiện các thao tác khác (ví dụ: hiển thị thông báo, chuyển hướng người dùng đến trang danh sách căn hộ, v.v.)
    } catch (error) {
      console.error(error);
      // Xử lý lỗi, hiển thị thông báo lỗi hoặc thực hiện xử lý lỗi khác
    }
  };

  const handleClose = () => {
    setShowModal(false);
    onClose();
  };

  const handleAddPhoto = () => {
    setShowAddPhotoModal(true);
  };

  const handleDeletePhoto = async (e, photoId) => {
    try {
      e.preventDefault();
      // Gọi API để xóa ảnh từ Laravel backend
      await axios.delete(`http://localhost:8000/api/delete-photo/${photoId}`);
      // setShowModal(true);
      setApartmentImages(apartmentImages.filter((image) => image.image_id !== photoId));
      
    } catch (error) {
      console.error(error);
      // Xử lý lỗi khi xóa ảnh
    }
  };

  return (
    <Modal show={showModal} onHide={handleClose} className="custom-modal">
      <Modal.Header closeButton>
        <Modal.Title>Chỉnh sửa căn hộ</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form onSubmit={handleSubmit} >
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
                <button onClick={(e) => handleDeletePhoto(e, image.image_id)} style={{height:"2rem"}}>x</button>
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
    </Modal>
  );
}

export default EditApartment;
