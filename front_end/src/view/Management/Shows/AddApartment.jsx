import React, { useState } from 'react';
import { Modal } from 'react-bootstrap';
import axios from 'axios';
import ApartmentForm from './ApartmentForm';
import AddPhotoForm from './AddPhotoForm';

function AddApartment({ onClose }) {
  const [apartmentData, setApartmentData] = useState(null);
  const [photoAdded, setPhotoAdded] = useState(false);
  const [showAddPhotoForm, setShowAddPhotoForm] = useState(false);

  const handleApartmentSubmit = (data) => {
    setApartmentData(data);
    setShowAddPhotoForm(true);
  };

  const handleAddPhotoFormClose = () => {
    setPhotoAdded(true);
    setShowAddPhotoForm(false);
  };

  return (
    <Modal show={true} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>Thêm căn hộ</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {showAddPhotoForm ? (
          <AddPhotoForm onClose={handleAddPhotoFormClose} />
        ) : (
          <ApartmentForm onSave={handleApartmentSubmit} onNext={() => setShowAddPhotoForm(true)} />
        )}
      </Modal.Body>
    </Modal>
  );
}

export default AddApartment;
