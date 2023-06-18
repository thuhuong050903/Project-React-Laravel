import React, { Component } from "react";
import axios from "axios";
import DataTable from "react-data-table-component";
import "bootstrap/dist/css/bootstrap.css";
import AddAddressForm from "../../component/Pages/AddAddressForm";
import EditAddressForm from "../../component/Pages/EditAddessForm";

class List_address extends Component {
  constructor(props) {
    super(props);
    this.state = {
      addresses: [],
      deletingAddressId: null,
      error: null,
      isAddFormVisible: false,
      editingAddressId: null,
      isEditFormVisible: false,
      number: "",
      street: "",
      ward: "",
      district: "",
    };
    this.deleteAddresses = this.deleteAddresses.bind(this);
  }

  async componentDidMount() {
    await this.fetchAddresses();
  }

  async fetchAddresses() {
    try {
      const response = await axios.get("http://127.0.0.1:8000/api/get-address");
      this.setState({ addresses: response.data });
    } catch (error) {
      console.error("Error fetching addresses:", error);
    }
  }

  async deleteAddresses(address_id) {
    if (window.confirm(`Bạn muốn xóa căn hộ có ID là ${address_id}`)) {
      if (this.state.deletingAddressId) {
        return;
      }
      try {
        this.setState({ deletingAddressId: address_id });
        await axios.delete(`http://localhost:8000/api/delete-address/${address_id}`);
        alert("Xóa căn hộ thành công");
        await this.fetchAddresses();
      } catch (error) {
        console.log(error);
        alert("Đã xảy ra lỗi khi xóa căn hộ");
      } finally {
        this.setState({ deletingAddressId: null });
      }
    }
  }

  handleAddNew = () => {
    this.setState({ isAddFormVisible: true });
  };

  handleAddSuccess = async () => {
    await this.fetchAddresses();
    this.setState({ isAddFormVisible: false });
  };

  handleEdit = async (address_id) => {
    try {
      const response = await axios.get(`http://localhost:8000/api/get-address/${address_id}`);
      const addressData = response.data;
      this.setState({
        editingAddressId: address_id,
        isEditFormVisible: true,
        number: addressData.number,
        street: addressData.street,
        ward: addressData.ward,
        district: addressData.district,
      });
    } catch (error) {
      console.error("Error fetching address data:", error);
      alert("Đã xảy ra lỗi khi lấy dữ liệu căn hộ");
    }
  };

  handleEditSuccess = async () => {
    await this.fetchAddresses();
    this.setState({
      editingAddressId: null,
      isEditFormVisible: false,
    });
  };

  render() {
    const { addresses, deletingAddressId, error, isAddFormVisible, isEditFormVisible, editingAddressId } = this.state;
    const columns = [
      {
        name: "Number",
        selector: "number",
        sortable: true,
      },
      {
        name: "Street",
        selector: "street",
        sortable: true,
      },
      {
        name: "Ward",
        selector: "ward",
        sortable: true,
        wrap: true,
      },
      {
        name: "District",
        selector: "district",
        sortable: true,
      },
      {
        name: "Action",
        cell: (row) => (
          <div>
            <button
              className="btn btn-sm btn-warning"
              style={{ width: "80px" }}
              onClick={() => this.handleEdit(row.address_id)}
              type="button"
            >
              Edit
            </button>
            <button
              className="btn btn-sm btn-danger"
              style={{ width: "80px" }}
              onClick={() => this.deleteAddresses(row.address_id)}
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
            Thêm mới địa chỉ
          </button>
        </div>
        {isAddFormVisible && <AddAddressForm onAddSuccess={this.handleAddSuccess} />}
        {isEditFormVisible && (
          <EditAddressForm
            address_id={editingAddressId}
            onEditSuccess={this.handleEditSuccess}
            number={this.state.number}
            street={this.state.street}
            ward={this.state.ward}
            district={this.state.district}
          />
        )}
        <DataTable
          title="Address List"
          columns={columns}
          data={addresses}
          paginationPerPage={5}
          defaultSortField="address_id"
          pagination
        />
      </div>
    );
  }
}

export default List_address;
