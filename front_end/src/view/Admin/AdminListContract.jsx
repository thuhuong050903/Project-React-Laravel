import React, { Component } from "react";
import axios from "axios";
import DataTable from "react-data-table-component";
import "bootstrap/dist/css/bootstrap.css";
import "../../assets/style/List_apartment.css";

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
      this.setState({ contracts });
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
        name: "User name",
        selector: "user.username",
        sortable: true,
      },
      {
        name: "Full name",
        selector: "user.fullname",
        sortable: true,
      },
      {
        name: "User Email",
        selector: "user.email",
        sortable: true,
      },
      {
        name: "User Address",
        selector: "user.address",
        sortable: true,
      },
      {
        name: "User Birthday",
        selector: "user.birthday",
        sortable: true,
      },
      {
        name: "Apartment Description",
        selector: "apartment.description",
        sortable: true,
      },
      {
        name: "Apartment Price",
        selector: "apartment.price",
        sortable: true,
      },
      {
        name: "Number Room",
        selector: "apartment.number_room",
        sortable: true,
      },
      {
        name: "Area",
        selector: "apartment.area",
        sortable: true,
      },
      {
        name: "Type Room",
        selector: "apartment.type_room",
        sortable: true,
      },
      {
        name: "Number Address",
        selector: "apartment.number_address",
        sortable: true,
      },
      {
        name: "Street",
        selector: "apartment.street",
        sortable: true,
      },
      {
        name: "Ward",
        selector: "apartment.ward",
        sortable: true,
      },
      {
        name: "District",
        selector: "apartment.district",
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
      <div className="list_apartment" style={{ zIndex: 9999,backgroundColor:"#ffffff",marginTop:"2.2rem",marginLeft:"14rem",height:"50rem", border:"1px solid grey", width:"82%"}}>
        <DataTable
          title="List Contracts"
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