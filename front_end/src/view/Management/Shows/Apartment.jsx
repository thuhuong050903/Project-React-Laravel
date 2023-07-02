import React, { Component } from "react";
// import AuthUser from "../../../component/AuthUser";
import axios from "axios";
import { Button, Modal } from "react-bootstrap";
import "../../../assets/style/Management/Apartment.css";
import Swal from "sweetalert";
import PropTypes from "prop-types";
import Addapartment from "../../../component/Pages/Management/Addapartment";
import Editapartment from "../../../component/Pages/Management/Editapartment";
import Addphotoapartment from "../../../component/Pages/Management/Addphotoapartment";


class Apartment extends Component {

  static propTypes = {
    user_id: PropTypes.number.isRequired, // Add prop validation for user_id
  };

  constructor(props) {
    super(props);
    this.state = {
      isModalVisible: false,
      apartments: [],
      deletingApartmentId: null,
      error: null,
      isAddFormVisible: false,
      apartment_id: null,
      isEditFormVisible: false,
      isEditModalVisible: false, // tắt modal edit
      editingApartment: false,

      selectedApartmentId: null,
    };
    this.deleteApartments = this.deleteApartments.bind(this);
  }



  //Mở modal
  handleAddNew = () => {
    this.setState({ isModalVisible: true, isEditModalVisible: false }); // Đặt isEditModalVisible thành false
  };

  // đóng modal
  handleModalClose = () => {
    this.setState({ isModalVisible: false, isEditModalVisible: false }); // Đặt cả isModalVisible và isEditModalVisible thành false
  };


  async componentDidMount() {
    const userId = this.props.user_id; // Lấy ID từ prop user_id
    this.fetchApartments(userId);
  }


  async fetchApartments(userId) {
    try {
      const response = await axios.get(
        `http://127.0.0.1:8000/api/get-appointment?user_id=${userId}`
      );
      const filteredApartments = response.data.filter(
        (apartment) => apartment.user_id === userId
      );
      this.setState({ apartments: filteredApartments });
    } catch (error) {
      console.error("Error fetching apartments:", error);
    }
  }

  async deleteApartments(apartment_id) {
    if (window.confirm(`Bạn muốn xóa căn hộ có ID là ${apartment_id}`)) {
      if (this.state.deletingApartmentId) {
        return;
      }
      try {
        this.setState({ deletingApartmentId: apartment_id });
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
        await this.fetchApartments();
      } catch (error) {
        console.log(error);
        alert("Đã xảy ra lỗi khi xóa căn hộ");
      } finally {
        this.setState({ deletingApartmentId: null });
      }
    }
  }

  handleAddSuccess = async () => {
    await this.fetchApartments();
    this.setState({ isAddFormVisible: false });
  };

  handleEdit = async (apartment_id) => {
    this.setState({ isEditModalVisible: true, editingApartment: apartment_id, isModalVisible: false }); // Đặt isModalVisible thành false
    try {
      const response = await axios.get(
        `http://localhost:8000/api/get-appointment/${apartment_id}`
      );
      const apartmentData = response.data;
      this.setState({
        apartment_id: apartmentData.apartment_id,
        isEditFormVisible: true,
        user_id: apartmentData.user_id,
        description: apartmentData.description,
        price: apartmentData.price,
        number_room: apartmentData.number_room,
        area: apartmentData.area,
        address_id: apartmentData.address_id,
        type_room: apartmentData.type_room,
      });
    } catch (error) {
      console.error("Error fetching apartment data:", error);
      alert("Đã xảy ra lỗi khi lấy dữ liệu căn hộ");
    }
  };

  handleEditSuccess = async () => {
    await this.fetchApartments();
    this.setState({ isEditFormVisible: false, editingApartment: null });
    this.setState({
      apartment_id: null,
      isEditFormVisible: false,
      isModalVisible: false, // Thêm dòng này
    });
  };

  handleAddPhoto = (apartmentId) => {
    this.setState({ selectedApartmentId: apartmentId });
  };

  render() {
    const {
      apartments,
      deletingApartmentId,
      error,
      isAddFormVisible,
      isEditFormVisible,
      apartment_id,
      selectedApartmentId,
      isModalVisible,
      isEditModalVisible,
      editingApartment,
    } = this.state;

    if (error) {
      return <div>{error}</div>;
    }

    return (
      <div className="list_apartment contracts">
        <div className="button-container">
          <Button
            className="btn btn-success"
            onClick={this.handleAddNew}
            style={{ margin: "10px" }}
          >
            Thêm mới căn hộ
          </Button>
        </div>

        {isModalVisible && (
          <Modal show={isModalVisible} onHide={this.handleModalClose} style={{width: "130%",marginLeft: "-210px"}}>
            <Modal.Header closeButton>
              <Modal.Title>Thêm mới căn hộ</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Addapartment onAddSuccess={this.handleAddSuccess} />
            </Modal.Body>
          </Modal>
        )}
        {editingApartment && (
          <Modal show={isEditModalVisible} onHide={this.handleModalClose}>
            <Modal.Header closeButton>
              <Modal.Title>Chỉnh sửa căn hộ</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Editapartment
                apartment_id={editingApartment}
                onEditSuccess={this.handleEditSuccess}
              />
            </Modal.Body>
          </Modal>
        )}


        
        {selectedApartmentId && (
          <Addphotoapartment apartmentId={selectedApartmentId} />
        )}
        <div className="content">
          {apartments.map((apartment) => (
            <div
              className="card contracts_card apartment"
              key={apartment.apartment_id}
            >
              <div className="card-body">
                <h5 className="card-title contracts_card-title">
                  Apartment ID: {apartment.apartment_id}
                </h5>

                <p className="card-text">
                  <strong>Description:</strong> {apartment.description}
                </p>
                <p className="card-text">
                  <strong>Price:</strong> {apartment.price}
                </p>
                <p className="card-text">
                  <strong>Number of Rooms:</strong> {apartment.number_room}
                </p>
                <p className="card-text">
                  <strong>Area:</strong> {apartment.area}
                </p>
                <p className="card-text">
                  <strong>Address ID:</strong> {apartment.address_id}
                </p>
                <p className="card-text">
                  <strong>Type of Room:</strong> {apartment.type_room}
                </p>
                <div className="card-actions">
                  <button
                    className="btn btn-warning"
                    onClick={() => this.handleEdit(apartment.apartment_id)}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      className="bi bi-pencil-fill"
                      viewBox="0 0 16 16"
                    >
                      <path d="M12.854.146a.5.5 0 0 0-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 0 0 0-.708l-3-3zm.646 6.061L9.793 2.5 3.293 9H3.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.207l6.5-6.5zm-7.468 7.468A.5.5 0 0 1 6 13.5V13h-.5a.5.5 0 0 1-.5-.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.5-.5V10h-.5a.499.499 0 0 1-.175-.032l-.179.178a.5.5 0 0 0-.11.168l-2 5a.5.5 0 0 0 .65.65l5-2a.5.5 0 0 0 .168-.11l.178-.178z" />
                    </svg>
                  </button>
                  <button
                    className="btn btn-danger"
                    style={{ margin: "5px" }}
                    onClick={() =>
                      this.deleteApartments(apartment.apartment_id)
                    }
                    disabled={deletingApartmentId === apartment.apartment_id}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      className="bi bi-trash-fill"
                      viewBox="0 0 16 16"
                    >
                      <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z" />
                    </svg>
                  </button>
                  <button
                    className="btn btn-primary"
                    onClick={() => this.handleAddPhoto(apartment.apartment_id)}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      className="bi bi-images"
                      viewBox="0 0 16 16"
                    >
                      <path d="M.5 2.5A1.5 1.5 0 0 1 2 .998h12a1.5 1.5 0 0 1 1.5 1.5V13a1.5 1.5 0 0 1-1.5 1.5H2a1.5 1.5 0 0 1-1.5-1.5V2.5zM2 1.998A1.5 1.5 0 0 0 .5 3.498V13a1.5 1.5 0 0 0 1.5 1.5h12a1.5 1.5 0 0 0 1.5-1.5V3.498a1.5 1.5 0 0 0-1.5-1.5H2z" />
                      <path d="M10.516 5.183l-1.55 2.2-1.935-1.45a.5.5 0 0 0-.631.032l-2 1.667A.5.5 0 0 0 4 9.5V12h8V5l-1.484.183zM10.5 10a.5.5 0 1 1 0-1 .5.5 0 0 1 0 1zm-2-1a2 2 0 1 0 0-4 2 2 0 0 0 0 4z" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }
}

export default Apartment;
