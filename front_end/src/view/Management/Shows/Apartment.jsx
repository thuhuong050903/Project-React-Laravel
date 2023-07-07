import React, { useState, useEffect } from "react";
import axios from "axios";
import { Button, Modal } from "react-bootstrap";
import "../../../assets/style/Management/Apartment.css";
import Swal from "sweetalert";
import PropTypes from "prop-types";
import Addapartment from "../../../component/Pages/Management/Addapartment";
import Editapartment from "../../../component/Pages/Management/Editapartment";
import Addphotoapartment from "../../../component/Pages/Management/Addphotoapartment";

const Apartment = ({ user_id }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [apartments, setApartments] = useState([]);
  const [deletingApartmentId, setDeletingApartmentId] = useState(null);
  const [error, setError] = useState(null);
  const [isAddFormVisible, setIsAddFormVisible] = useState(false);
  const [apartment_id, setApartmentId] = useState(null);
  const [isEditFormVisible, setIsEditFormVisible] = useState(false);
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [editingApartment, setEditingApartment] = useState(false);
  const [selectedApartmentId, setSelectedApartmentId] = useState(null);

  useEffect(() => {
    fetchApartments(user_id);
  }, [user_id]);

  const fetchApartments = async (userId) => {
    try {
      const response = await axios.get(
        `http://127.0.0.1:8000/api/get-appointment?user_id=${userId}`
      );
      const filteredApartments = response.data.filter(
        (apartment) => apartment.user_id === userId
      );
      setApartments(filteredApartments);
    } catch (error) {
      console.error("Error fetching apartments:", error);
      setError(error);
    }
  };

  const deleteApartments = async (apartment_id) => {
    if (window.confirm(`Bạn muốn xóa căn hộ có ID là ${apartment_id}`)) {
      if (deletingApartmentId) {
        return;
      }
      try {
        setDeletingApartmentId(apartment_id);
        await axios.delete(
          `http://localhost:8000/api/delete-appointment/${apartment_id}`
        );
        Swal({
          text: "Delete successfully",
          icon: "success",
          button: "OK",
        }).then(() => {
          window.location.reload();
        });
        await fetchApartments(user_id);
      } catch (error) {
        console.log(error);
        alert("Đã xảy ra lỗi khi xóa căn hộ");
      } finally {
        setDeletingApartmentId(null);
      }
    }
  };

  const handleAddSuccess = async () => {
    await fetchApartments(user_id);
    setIsAddFormVisible(false);
  };

  const handleEdit = async (apartment_id) => {
    setIsEditModalVisible(true);
    setEditingApartment(apartment_id);
    setIsModalVisible(false);
    try {
      const response = await axios.get(
        `http://localhost:8000/api/get-appointment/${apartment_id}`
      );
      const apartmentData = response.data;
      setApartmentId(apartmentData.apartment_id);
      setIsEditFormVisible(true);
      setEditingApartment(apartment_id);
      setIsModalVisible(false);
    } catch (error) {
      console.error("Error fetching apartment data:", error);
      alert("Đã xảy ra lỗi khi lấy dữ dữ liệu căn hộ");
    }
  };

  const handleEditSuccess = async () => {
    await fetchApartments(user_id);
    setIsEditFormVisible(false);
    setIsEditModalVisible(false);
  };

  const handleAddPhoto = (apartment_id) => {
    setSelectedApartmentId(apartment_id);
    setIsModalVisible(true);
  };

  return (
    <div className="container">
      <div className="apartment-header">
        <h2>Danh sách căn hộ</h2>
        <Button variant="primary" onClick={() => setIsAddFormVisible(true)}>
          Thêm căn hộ
        </Button>
      </div>
      {error && <p>Đã xảy ra lỗi: {error.message}</p>}
      <div className="apartment-list">
        {apartments.map((apartment) => (
          <div className="apartment-item" key={apartment.apartment_id}>
            <div className="apartment-info">
              <h3>{apartment.apartment_name}</h3>
              <p>{apartment.address}</p>
              <p>{apartment.description}</p>
            </div>
            <div className="apartment-actions">
              <Button variant="primary" onClick={() => handleEdit(apartment.apartment_id)}>
                Chỉnh sửa
              </Button>
              <Button variant="danger" onClick={() => deleteApartments(apartment.apartment_id)}>
                Xóa
              </Button>
              <Button variant="success" onClick={() => handleAddPhoto(apartment.apartment_id)}>
                Thêm ảnh
              </Button>
            </div>
          </div>
        ))}
      </div>
      <Modal show={isAddFormVisible} onHide={() => setIsAddFormVisible(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Thêm căn hộ</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Addapartment
            user_id={user_id}
            onAddSuccess={handleAddSuccess}
            onCancel={() => setIsAddFormVisible(false)}
          />
        </Modal.Body>
      </Modal>
      <Modal show={isEditModalVisible} onHide={() => setIsEditModalVisible(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Chỉnh sửa căn hộ</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {isEditFormVisible && (
            <Editapartment
              apartment_id={apartment_id}
              onEditSuccess={handleEditSuccess}
              onCancel={() => setIsEditFormVisible(false)}
            />
          )}
        </Modal.Body>
      </Modal>
      <Modal show={isModalVisible} onHide={() => setIsModalVisible(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Thêm ảnh căn hộ</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Addphotoapartment
            apartment_id={selectedApartmentId}
            onCancel={() => setIsModalVisible(false)}
          />
        </Modal.Body>
      </Modal>
    </div>
  );
};

Apartment.propTypes = {
  user_id: PropTypes.number.isRequired,
};

export default Apartment;

