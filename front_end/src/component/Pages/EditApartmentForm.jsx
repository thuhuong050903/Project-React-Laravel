import React, { Component } from "react";
import axios from "axios";
import './EditApartmentForm.css';
class EditApartmentForm extends Component {
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
      error: ""
    };
  }

  async componentDidMount() {
    const { apartment_id } = this.props;
    await this.fetchApartmentData(apartment_id);
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
      alert("Cập nhật căn hộ thành công");
      onEditSuccess();
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
      error
    } = this.state;

    if (error) {
      return <div>{error}</div>;
    }

    return (
      <div className="edit-apartment-form">
        <h2>Edit Apartment</h2>
        <form onSubmit={this.handleSubmit}>
          <div>
            <label>User ID:</label>
            <br/>
            <input
              type="text"
              name="user_id"
              value={user_id}
              onChange={this.handleInputChange}
            />
          </div>
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
            <br/>
            <input
              type="text"
              name="address_id"
              value={address_id}
              onChange={this.handleInputChange}
            />
          </div>
          <div>
            <label>Type of Room:</label>
            <br/>
            <input
              type="text"
              name="type_room"
              value={type_room}
              onChange={this.handleInputChange}
            />
          </div>
          
          <button type="submit">Save</button>
        </form>
      </div>
    );
  }
}

export default EditApartmentForm;
