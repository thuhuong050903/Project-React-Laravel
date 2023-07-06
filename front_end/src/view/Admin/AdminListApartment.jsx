import React, { Component } from "react";
import axios from "axios";
import DataTable from "react-data-table-component";
import "bootstrap/dist/css/bootstrap.css";
import '../../assets/style/List_Apartment.css'
import RelatedPhoto from "../../component/Pages/RelatedPhoto";

class AdminListApartment extends Component {
  constructor(props) {
    super(props);
    this.state = {
      apartments: [],
    
      error: null,
      apartment_id: null,
      isEditFormVisible: false,
      selectedApartmentId: null,
    };
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


  handleRelatedPhoto = (apartmentId) => {
    this.setState({ selectedApartmentId: apartmentId });
    
  };

  render() {
    const {
      apartments,
      error,
     
      selectedApartmentId,
    } = this.state;

    const columns = [
      {
        name: "ID",
        selector: "apartment_id",
        sortable: true,
        width:"70px"
      },
      {
        name: "Chủ sở hữu",
        selector: "users.fullname",
        sortable: true,
      },
      {
        name: "Mô tả",
        selector: "description",
        sortable: true,
        wrap: true,
        width: "400px",

       
      },
      {
        name: "Giá",
        selector: "price",
        sortable: true,
      },
      {
        name: "Số lượng phòng",
        selector: "number_room",
        sortable: true,
        wrap: true,
        width: "100px"
      },
      {
        name: "Diện tích",
        selector: "area",
        sortable: true,
      },
     
      {
        name: "Loại phòng",
        selector: "type_room",
        sortable: true,
        width: "150px"

      },
      {
        name: "Address",
        cell: (row) => (
          <div>
            {row.number_address}, {row.street}, {row.ward}, {row.district}
          </div>
        ),
        sortable: true,
      },
     
    ];

    if (error) {
      return <div>{error}</div>;
    }
    
    return (
      <div className="list_apartment" style={{ zIndex: 9999,backgroundColor:"#ffffff",marginTop:"2.6rem",marginLeft:"14rem",height:"50rem", border:"1px solid grey", width:"82.5%"}}>
       
    <DataTable
      title="Danh sách căn hộ" 
      columns={columns}
      data={apartments}
      paginationPerPage={10}
      defaultSortField="apartment_id"
      pagination
      columnStyles={{
        description: {
          width: "auto",
        },
      }}
/>

      </div>
    );
  }
}

export default AdminListApartment;