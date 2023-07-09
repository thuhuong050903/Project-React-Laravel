import React, { Component } from "react";
import axios from "axios";
import DataTable from "react-data-table-component";
import "bootstrap/dist/css/bootstrap.css";
import '../../assets/style/List_Apartment.css'
import AddServiceForm from "../../component/Pages/AddServiceForm";
import EditServiceForm from "../../component/Pages/EditServiceForm";


class AdminListService extends Component {
  constructor(props) {
    super(props);
    this.state = {
      services: [],
    
      error: null,
      isAddFormVisible: false,
      service_id: null,
      isEditFormVisible: false,
      selectedServiceId: null,
    };
    this.deleteService = this.deleteService.bind(this);
  }

  async componentDidMount() {
    await this.fetchServices();
  }
  async fetchServices() {
    try {
      const response = await axios.get("http://localhost:8000/api/get-service");
      this.setState({ services: response.data });
    } catch (error) {
      console.error("Error fetching services:", error);
    }
  }
  async deleteService(service_id) {
    if (window.confirm(`Bạn muốn xóa service có ID là ${service_id}`)) {
      if (this.state.deletingServiceId) {
        return;
      }
      try {
        this.setState({ deletingServiceId: service_id });
        await axios.delete(`http://localhost:8000/api/delete-service/${service_id}`);
        alert("Xóa dịch vụ thành công");
        await this.fetchServices();
      } catch (error) {
        console.log(error);
        alert("Đã xảy ra lỗi khi xóa dịch vụ");
      } finally {
        this.setState({ deletingServiceId: null });
      }
    }
  }

  handleAddNew = () => {
    this.setState({ isAddFormVisible: true });
  };

  handleAddSuccess = async () => {
    await this.fetchServices();
    this.setState({ isAddFormVisible: false });
  };

  handleEdit = async (service_id) => {
    try {
      const response = await axios.get(`http://localhost:8000/api/get-service/${service_id}`);
      const serviceData = response.data;
      this.setState({
        service_id: serviceData.service_id,
        isEditFormVisible: true,
        description: serviceData.description,
        price: serviceData.price,
        contact_info: serviceData.contact_info,

      });
    } catch (error) {
      console.error("Error fetching service data:", error);
      alert("Đã xảy ra lỗi khi lấy dữ liệu dịch vụ");
    }
  };

  handleEditSuccess = async () => {
    await this.fetchServices();
    this.setState({
      service_id: null,
      isEditFormVisible: false,
    });
  };
  render() {
    const {
      services,
      deletingServiceId,
      error,
      isAddFormVisible,
      isEditFormVisible,
      service_id,
      selectedServiceId,
    } = this.state;
    const columns = [
      {
        name: "Service ID",
        selector: "service_id",
        sortable: true,
      }, 
      {
        name: "Service Description",
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
        name: "Contact Information",
        selector: "contact_info",
        sortable: true,
      },  
      {
        name: "Action",
        cell: (row) => (
          <div>
            <button
              className="btn btn-sm btn-secondary"
              style={{ width: "80px" }}
              onClick={() => this.handleEdit(row.service_id)}
              type="button"
            >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil-fill" viewBox="0 0 16 16">
  <path d="M12.854.146a.5.5 0 0 0-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 0 0 0-.708l-3-3zm.646 6.061L9.793 2.5 3.293 9H3.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.207l6.5-6.5zm-7.468 7.468A.5.5 0 0 1 6 13.5V13h-.5a.5.5 0 0 1-.5-.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.5-.5V10h-.5a.499.499 0 0 1-.175-.032l-.179.178a.5.5 0 0 0-.11.168l-2 5a.5.5 0 0 0 .65.65l5-2a.5.5 0 0 0 .168-.11l.178-.178z"/>
</svg>
            </button>
            <button
              className="btn btn-sm btn-secondary"
              style={{ width: "80px" }}
              onClick={() => this.deleteService(row.service_id)}
              type="button"
            >
                 <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash-fill" viewBox="0 0 16 16">
  <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z"/>
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
    return (
      <div className="list_apartment" style={{marginLeft:"14.05rem", marginTop:"2.5rem",width:"85%", height:"50rem", backgroundColor:"white"}}>
        <div className="button-container">
          <button className="btn btn-success" onClick={this.handleAddNew}>
            Thêm mới dịch vụ
          </button>
        </div>
        {isAddFormVisible && <AddServiceForm onAddSuccess={this.handleAddSuccess} />}
        {isEditFormVisible && <EditServiceForm service_id={service_id} onEditSuccess={this.handleEditSuccess} />}
        <DataTable
          title="List services" 
          columns={columns}
          data={services}
          paginationPerPage={5}
          defaultSortField="service_id"
          pagination
        />
      </div>
    );
  }
}
export default AdminListService;
