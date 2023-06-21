import React, { Component } from "react";
import axios from "axios";
import DataTable from "react-data-table-component";
import "bootstrap/dist/css/bootstrap.css";
import AddApartmentForm from "../../../component/Pages/AddapartmentForm";
import EditApartmentForm from "../../../component/Pages/EditApartmentForm";

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
    };
    this.deleteApartments = this.deleteApartments.bind(this);
  }

  async componentDidMount() {
    const userId = 1;
    await this.fetchApartments(userId);
  }

  

  async fetchApartments(userId) {
    
    try {
      const response = await axios.get("http://127.0.0.1:8000/api/get-appointment");
      const filteredApartments = response.data.filter(apartment => apartment.user_id === userId);
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
        await axios.delete(`http://localhost:8000/api/delete-appointment/${apartment_id}`);
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
      const response = await axios.get(`http://localhost:8000/api/get-appointment/${apartment_id}`);
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
        type_room: apartmentData.type_room
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
  


  render() {
    const { apartments, deletingApartmentId, error, isAddFormVisible,isEditFormVisible, apartment_id  } = this.state;
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
              Edit
            </button>
            <button
              className="btn btn-sm btn-danger"
              style={{ width: "80px" }}
              onClick={() => this.deleteApartments(row.apartment_id)}
              type="button"
            >
              Delete
            </button>
          </div>
        ),
        compact: true,
      },
    ];
    if (error) {
      return <div>{error}</div>; 
    }
    return (
      <div className="list_apartment">
        <div className="button-container">
          <button className="btn btn-success" onClick={this.handleAddNew}>
            Thêm mới căn hộ
          </button>
        </div>
        {isAddFormVisible && <AddApartmentForm onAddSuccess={this.handleAddSuccess} />}
        {isEditFormVisible && (<EditApartmentForm apartment_id={apartment_id} onEditSuccess={this.handleEditSuccess}/>)}
        <DataTable
          title="My Apartment"
          columns={columns}
          data={this.state.apartments}
          paginationPerPage={5}
          defaultSortField="apartment_id"
          pagination
        />
      </div>
    );
  }
}

export default Apartment;
