import React, { useState } from 'react';
import '../../../assets/style/ModalAddApartment.css'
import { Modal, Button } from 'react-bootstrap';
import axios from 'axios';

function AddApartment({ onClose }) {
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [number_room, setNumberRoom] = useState('');
  const [area, setArea] = useState('');
  const [type_room, setTypeRoom] = useState('');
  const [number_address, setNumberAddress] = useState('');
  const [street, setStreet] = useState('');
  const [ward, setWard] = useState('');
  const [district, setDistrict] = useState('');
  const [images, setImages] = useState([]);
  const [previewImages, setPreviewImages] = useState([]);
  const user = JSON.parse(sessionStorage.getItem('user'));
  const districts = [
    "Quận Hải Châu",
    "Quận Thanh Khê",
    "Quận Sơn Trà",
    "Quận Ngũ Hành Sơn",
    "Quận Liên Chiểu",
    "Quận Cẩm Lệ",
    "Huyện Hòa Vang",
  ];
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append('user_id', user.id);
      formData.append('description', description);
      formData.append('price', price);
      formData.append('number_room', number_room);
      formData.append('area', area);
      formData.append('type_room', type_room);
      formData.append('number_address', number_address);
      formData.append('street', street);
      formData.append('ward', ward);
      formData.append('district', district);

      for (let i = 0; i < images.length; i++) {
        formData.append('images[]', images[i]);
      }

      const addApartmentResponse = await axios.post('http://localhost:8000/api/add-apartment', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      alert("Thêm căn hộ thành công!");
      window.location.reload();

      console.log(addApartmentResponse.data);
      onClose();
    } catch (error) {
      console.error(error);
      // Xử lý lỗi một cách thích hợp
    }
  };


  const handleClose = () => {
    onClose();
  };

  const handleImageChange = (e) => {
    const files = e.target.files;
    const fileList = Array.from(files);
    setImages(fileList);

    const previews = [];
    for (let i = 0; i < fileList.length; i++) {
      const reader = new FileReader();
      reader.onload = (event) => {
        previews.push({ url: event.target.result, file: fileList[i] });
        if (previews.length === fileList.length) {
          setPreviewImages(previews);
        }
      };
      reader.readAsDataURL(fileList[i]);
    }
  };

  const handleRemoveImage = (index) => {
    const updatedPreviewImages = [...previewImages];
    updatedPreviewImages.splice(index, 1);
    setPreviewImages(updatedPreviewImages);
    const updatedImages = [...images];
    updatedImages.splice(index, 1);
    setImages(updatedImages);
  };

  return (
    <Modal show={true} onHide={handleClose} className="custom-modal">
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
            <select value={type_room} onChange={(e) => setTypeRoom(e.target.value)}>
              <option value="">Chọn loại phòng</option>
              <option value="Phòng ngắn hạn">Phòng ngắn hạn</option>
              <option value="Phòng dài hạn">Phòng dài hạn</option>
            </select>
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
            <select value={district} onChange={(e) => setDistrict(e.target.value)}>
              <option value="">Chọn quận/huyện</option>
              {districts.map((district, index) => (
                <option key={index} value={district}>
                  {district}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label>Ảnh:</label>
            <input type="file" multiple onChange={handleImageChange} />
          </div>
          <div className="image-preview" style={{ display: "flex", flexWrap: "wrap", gap: "2px" }}>
            {previewImages.map((image, index) => (
              <div key={index}>
                <img src={image.url} alt={`Preview ${index}`} style={{ width: "5rem" }} />
                <button type="button" onClick={() => handleRemoveImage(index)}>
                  x
                </button>
              </div>
            ))}
          </div>
        </form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button variant="primary" onClick={handleSubmit}>
          Lưu
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default AddApartment;