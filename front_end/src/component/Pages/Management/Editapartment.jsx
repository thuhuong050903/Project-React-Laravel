import React, { Component } from "react";
import axios from "axios";
// import '../EditApartmentForm.css';
import Swal from "sweetalert";
import Select from "react-select";

const options = [ 
  { value: "Phòng ngắn hạn", label: "Phòng ngắn hạn" },
  { value: "Phòng dài hạn", label: "Phòng dài hạn" },
];


class Editapartment extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user_id: "",
      description: "",
      price: "",
      number_room: "",
      area: "",
      address_id: "",
      type_room: "",
      error: "",
      addressList: [],
    };
  }

  async componentDidMount() {
    const { apartment_id } = this.props;
    await this.fetchApartmentData(apartment_id);
    await this.fetchAddressList();
  }

  async fetchApartmentData(apartment_id) {
    try {
      const response = await axios.get(`http://localhost:8000/api/get-apartment/${apartment_id}`);
      const apartmentData = response.data;
      this.setState({
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
    }
  }

  handleInputChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  fetchAddressList = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8000/api/get-appointment"
      );
      const addressList = response.data.map((apartment) => ({
        id: apartment.address_id,
        label: apartment.address_id,
      }));
      this.setState({ addressList });
    } catch (error) {
      console.error("Error fetching address list:", error);
    }
  };

  handleSubmit = async (event) => {
    event.preventDefault();
    const { apartment_id, onEditSuccess } = this.props;
    const {
      user_id,
      description,
      price,
      number_room,
      area,
      address_id,
      type_room
    } = this.state;

    try {
      await axios.put(`http://localhost:8000/api/edit-apartment/${apartment_id}`, {
        user_id,
        description,
        price,
        number_room,
        area,
        address_id,
        type_room
      });
      onEditSuccess();
      Swal({
        text: "Update successful",
        icon: "success",
        button: "OK",
      }).then(() => {
        window.location.reload();
      });

    } catch (error) {
      console.error("Error updating apartment:", error);
      alert("Đã xảy ra lỗi khi cập nhật căn hộ");
    }
  };

  render() {
    const {
      user_id,
      description,
      price,
      number_room,
      area,
      address_id,
      type_room,
      addressList,
      error
    } = this.state;

    if (error) {
      return <div>{error}</div>;
    }

    return (
      <div className="form-container Addapartment">
        <form onSubmit={this.handleSubmit}>
          <div>
            <label>Description:</label>
            <br/>
            <textarea
              name="description"
              value={description}
              onChange={this.handleInputChange}
            />
          </div>
          <div>
            <label>Price:</label>
            <br/>
            <input
              type="text"
              name="price"
              value={price}
              onChange={this.handleInputChange}
            />
          </div>
          <div>
          <label>Number of Rooms:</label>
            <br/>
            <input
              type="text"
              name="number_room"
              value={number_room}
              onChange={this.handleInputChange}
            />
          </div>
          <div>
            <label>Area:</label>
            <br/>
            <input
              type="text"
              name="area"
              value={area}
              onChange={this.handleInputChange}
            />
          </div>

          <div>
            <label>Address ID:</label>
            <select
              type="number"
              name="address_id"
              value={address_id}
              onChange={this.handleInputChange}
            >
              <option value="">Select an address</option>
              {addressList.map((address) => (
                <option key={address.id} value={address.id}>
                  {address.label}
                </option>
              ))}
            </select>
          </div>


          <div>
            <label>Type of Room:</label>
            <Select
              options={options}
              name="type_room"
              id="type_room"
              placeholder="Choose an option"
              required
              value={options.find((option) => option.value === type_room)}
              onChange={(selectedOption) =>
                this.setState({ type_room: selectedOption.value })
              }
            />
          </div>
          
          <button type="submit">Save</button>
        </form>
      </div>
    );
  }
}

export default Editapartment;