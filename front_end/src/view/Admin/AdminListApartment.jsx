import React, { Component } from "react";
import axios from "axios";
import DataTable from "react-data-table-component";
import "bootstrap/dist/css/bootstrap.css";
import "../../assets/style/ListApartment.css";
import AddApartmentForm from "../../component/Pages/AddApartmentForm";
import EditApartmentForm from "../../component/Pages/EditApartmentForm";
import AddPhotoForm from "../../component/Pages/AddPhotoForm";

class AdminListApartment extends Component {
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
    this.deleteApartment = this.deleteApartment.bind(this);
  }

  async componentDidMount() {
    await this.fetchApartments();
  }

  async fetchApartments() {
    try {
      const response = await axios.get("http://localhost:8000/api/get-apartment");
      this.setState({ apartments: response.data });
    } catch (error) {
      console.error("Error fetching apartments:", error);
    }
  }

  async deleteApartment(apartment_id) {
    if (window.confirm(`Bạn muốn xóa căn hộ có ID là ${apartment_id}`)) {
      if (this.state.deletingApartmentId) {
        return;
      }
      try {
        this.setState({ deletingApartmentId: apartment_id });
        await axios.delete(`http://localhost:8000/api/delete-apartment/${apartment_id}`);
        alert("Xóa căn hộ thành công");
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
      const response = await axios.get(`http://localhost:8000/api/get-apartment/${apartment_id}`);
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

    const columns = [
      {
        name: "Apartment ID",
        selector: "apartment_id",
        sortable: true,
      },
      {
        name: "User ID",
        selector: "user_id",
        sortable: true,
      },
      {
        name: "Description",
        selector: "description",
        sortable: true,
        wrap: true,
      },
      {
        name: "Price",
        selector: "price",
        sortable: true,
      },
      {
        name: "Number of Rooms",
        selector: "number_room",
        sortable: true,
      },
      {
        name: "Area",
        selector: "area",
        sortable: true,
      },
      {
        name: "Address ID",
        selector: "address_id",
        sortable: true,
      },
      {
        name: "Type of Room",
        selector: "type_room",
        sortable: true,
      },
      {
        name: "Action",
        cell: (row) => (
          <div>
            <button
              className="btn btn-sm btn-warning"
              style={{ width: "80px" }}
              onClick={() => this.handleEdit(row.apartment_id)}
              type="button"
            >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil-fill" viewBox="0 0 16 16">
  <path d="M12.854.146a.5.5 0 0 0-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 0 0 0-.708l-3-3zm.646 6.061L9.793 2.5 3.293 9H3.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.207l6.5-6.5zm-7.468 7.468A.5.5 0 0 1 6 13.5V13h-.5a.5.5 0 0 1-.5-.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.5-.5V10h-.5a.499.499 0 0 1-.175-.032l-.179.178a.5.5 0 0 0-.11.168l-2 5a.5.5 0 0 0 .65.65l5-2a.5.5 0 0 0 .168-.11l.178-.178z"/>
</svg>
            </button>
            <button
              className="btn btn-sm btn-danger"
              style={{ width: "80px" }}
              onClick={() => this.deleteApartment(row.apartment_id)}
              type="button"
            >
                 <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash-fill" viewBox="0 0 16 16">
  <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z"/>
</svg>
            </button>
            <button
              className="btn btn-sm btn-primary"
              style={{ width: "80px" }}
              onClick={() => this.handleAddPhoto(row.apartment_id)}
              type="button"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-file-image" viewBox="0 0 16 16">
  <path d="M8.002 5.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z"/>
  <path d="M12 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2zM3 2a1 1 0 0 1 1-1h8a1 1 0 0 1 1 1v8l-2.083-2.083a.5.5 0 0 0-.76.063L8 11 5.835 9.7a.5.5 0 0 0-.611.076L3 12V2z"/>
</svg>
            </button>
          </div>
        ),
        compact: true,
      },
    ];

    if (error) {
      return <div>{error}</div>;
    }
    // const apartmentCount = apartments.length; 
    return (
      <div className="list_apartment">
        <div className="button-container">
          <button className="btn btn-success" onClick={this.handleAddNew}>
            Thêm mới căn hộ
          </button>
        </div>
        {isAddFormVisible && <AddApartmentForm onAddSuccess={this.handleAddSuccess} />}
        {isEditFormVisible && <EditApartmentForm apartment_id={apartment_id} onEditSuccess={this.handleEditSuccess} />}
        {selectedApartmentId && <AddPhotoForm apartmentId={selectedApartmentId} />}
        {/* <h2>Tổng số căn hộ: {apartmentCount}</h2> */}
        <DataTable
          title="Apartment List"
          columns={columns}
          data={apartments}
          paginationPerPage={5}
          defaultSortField="apartment_id"
          pagination
        />
      </div>
    );
  }
}

export default AdminListApartment;
