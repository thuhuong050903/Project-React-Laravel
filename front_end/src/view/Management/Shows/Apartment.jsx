import React, { Component } from "react";
import axios from "axios";
// import DataTable from "react-data-table-component";
import "bootstrap/dist/css/bootstrap.css";
import "../../../assets/style/Management/Apartment.css";
import Swal from "sweetalert";
import Addapartment from "../../../component/Pages/Management/Addapartment";
import Editapartment from "../../../component/Pages/Management/Editapartment";
import Addphotoapartment from "../../../component/Pages/Management/Addphotoapartment";

class Apartment extends Component {
  constructor(props) {
    super(props);
    this.state = {
      apartments: [],
      deletingApartmentId: null,
      error: null,
      isAddFormVisible: false,
      apartment_id: null,
      isEditFormVisible: false,
      selectedApartmentId: null,
    };
    this.deleteApartments = this.deleteApartments.bind(this);
  }

  async componentDidMount() {
    const userId = 1;
    await this.fetchApartments(userId);
  }

  async fetchApartments(userId) {
    try {
      const response = await axios.get(
        "http://127.0.0.1:8000/api/get-appointment"
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
  handleAddNew = () => {
    this.setState({ isAddFormVisible: true });
  };

  handleAddSuccess = async () => {
    await this.fetchApartments();
    this.setState({ isAddFormVisible: false });
  };
  handleEdit = async (apartment_id) => {
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
    this.setState({
      apartment_id: null,
      isEditFormVisible: false,
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
    } = this.state;

    if (error) {
      return <div>{error}</div>;
    }

    return (
      <div className="list_apartment contracts">
        <div className="button-container"  >
          <button className="btn btn-success" onClick={this.handleAddNew} style={{margin: '10px'}}>
            Thêm mới căn hộ
          </button>
        </div>
   
        {isAddFormVisible && (
          <Addapartment onAddSuccess={this.handleAddSuccess} />
        )}
        {isEditFormVisible && (
          <Editapartment
            apartment_id={apartment_id}
            onEditSuccess={this.handleEditSuccess}
          />
        )}
        {selectedApartmentId && (
          <Addphotoapartment apartmentId={selectedApartmentId} />
        )}
        <div className="content">
          {apartments.map((apartment) => (
            <div className="card contracts_card apartment" key={apartment.apartment_id}>
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
                      class="bi bi-pencil-fill"
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
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      class="bi bi-trash-fill"
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
                      class="bi bi-image-alt"
                      viewBox="0 0 16 16"
                    >
                      <path d="M7 2.5a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0zm4.225 4.053a.5.5 0 0 0-.577.093l-3.71 4.71-2.66-2.772a.5.5 0 0 0-.63.062L.002 13v2a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1v-4.5l-4.777-3.947z" />
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