import React, { Component } from "react";
import axios from "axios";
import DataTable from "react-data-table-component";
import "bootstrap/dist/css/bootstrap.css";
import "../../assets/style/ListApartment.css";
class AdminListContract extends Component {
  constructor(props) {
    super(props);
    this.state = {
      contracts: [],
      error: null,
     
    };
  }

  componentDidMount() {
    this.fetchContracts();
  }

  async fetchContracts() {
    try {
      const response = await axios.get("http://localhost:8000/api/get-contract");
      const contracts = response.data;

      const updatedContracts = await Promise.all(
        contracts.map(async (contract) => {
          const apartmentId = contract.apartment_id;
          const userId = contract.user_id;

          // Truy vấn thông tin căn hộ
          const [apartmentResponse, userResponse, addressResponse] = await Promise.all([
            axios.get(`http://localhost:8000/api/get-apartment/${apartmentId}`),
            axios.get(`http://localhost:8000/api/get-user/${userId}`),
            axios.get(`http://localhost:8000/api/get-address/${apartmentId}`)
          ]);

          const apartment = apartmentResponse.data;
          const user = userResponse.data;
          const address = addressResponse.data;

          // Tạo đối tượng hợp đồng mới chứa thông tin từ cả căn hộ và người dùng
          return {
            ...contract,
            apartment,
            user,
            address,
          };
        })
      );

      this.setState({ contracts: updatedContracts });
    } catch (error) {
      console.error("Error fetching contracts:", error);
      this.setState({ error: "Error fetching contracts" });
    }
  }

  render() {
    const { contracts, error } = this.state;

    const columns = [
      {
        name: "Contract ID",
        selector: "contract_id",
        sortable: true,
      },
      {
        name: "User Name",
        selector: "user.username",
        sortable: true,
      },
      {
        name: "User Email",
        selector: "user.email",
        sortable: true,
      },
      {
        name: "Apartment description",
        selector: "apartment.description",
        sortable: true,
      },
      {
        name: "Apartment price",
        selector: "apartment.price",
        sortable: true,
      },
      {
        name: "Room Number",
        selector: "apartment.number_room",
        sortable: true,
      },
      {
        name: "Room Type",
        selector: "apartment.type_room",
        sortable: true,
      },
      {
        name: "Area",
        selector: "apartment.area",
        sortable: true,
      },
      {
        name: "Address",
        selector: "address",
        cell: (row) => {
          const {number, street, ward, district } = row.address;
          return `${number},${street}, ${ward}, ${district}`;
        },
        sortable: true,
      },
      {
        name: "Start Date",
        selector: "start_date",
        sortable: true,
        wrap: true,
      },
      {
        name: "End Date",
        selector: "end_date",
        sortable: true,
      },
    ];

    if (error) {
      return <div>{error}</div>;
    }

    return (
      <div className="list_apartment">
        <div className="button-container"></div>
        <DataTable
          title="Contracts List"
          columns={columns}
          data={contracts}
          paginationPerPage={5}
          defaultSortField="contract_id"
          pagination
        />
      </div>
    );
  }
}

export default AdminListContract;
