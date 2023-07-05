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
      // isAddFormVisible: false,
      apartment_id: null,
      isEditFormVisible: false,
      selectedApartmentId: null,
    };
    // this.deleteApartment = this.deleteApartment.bind(this);
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
        name: "Type of Room",
        selector: "type_room",
        sortable: true,
      },
      {
        name: "Address number",
        selector: "number_address",
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
              className="btn btn-sm watch-image"
              style={{ width: "80px" }}
              onClick={() => this.handleRelatedPhoto(row.apartment_id)}
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
    
    return (
      <div className="list_apartment">
       
        {selectedApartmentId && <RelatedPhoto apartmentId={selectedApartmentId} />}
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