import React, { Component } from "react";
import axios from "axios";
import "../AddApartmentForm.css";
import Swal from "sweetalert";
import Select from "react-select";

const options = [
  { value: "Phòng ngắn hạn", label: "Phòng ngắn hạn" },
  { value: "Phòng dài hạn", label: "Phòng dài hạn" },
];

class Addapartment extends Component {
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

  componentDidMount() {
    this.fetchAddressList();
  }

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


  handleInputChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  handleSubmit = async (event) => {
    event.preventDefault();
    const {
      user_id,
      description,
      price,
      number_room,
      area,
      address_id,
      type_room,
    } = this.state;

    if (type_room === "" || type_room === null) {
      alert("Vui lòng nhập giá trị cho Type of Room");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:8000/api/add-apartment",
        {
          user_id,
          description,
          price,
          number_room,
          area,
          address_id,
          type_room,
        }
      );

      if (this.props.onAddSuccess) {
        this.props.onAddSuccess();

        Swal({
          text: "Add successful",
          icon: "success",
          button: "OK",
        }).then(() => {
          window.location.reload();
        });
      }

      this.setState({
        user_id: "",
        description: "",
        price: "",
        number_room: "",
        area: "",
        address_id: "",
        type_room: "",
        error: "",
      });
    } catch (error) {
      console.error("Error adding apartment:", error);
      this.setState({
        error: "Đã xảy ra lỗi khi thêm mới căn hộ",
      });
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
      error,
      addressList,
    } = this.state;

    return (
      <div className="form-container">
        <h2>Thêm mới căn hộ</h2>
        {error && <div className="error">{error}</div>}
        <form onSubmit={this.handleSubmit}>
          <div>
            <label>User ID:</label>
            <input
              type="text"
              name="user_id"
              value={user_id}
              onChange={this.handleInputChange}
            />
          </div>
          <div>
            <label>Description:</label>
            <input
              type="text"
              name="description"
              value={description}
              onChange={this.handleInputChange}
            />
          </div>
          <div>
            <label>Price:</label>
            <input
              type="number"
              name="price"
              value={price}
              onChange={this.handleInputChange}
            />
          </div>

          <div>
            <label>Number of Rooms:</label>
            <input
              type="number"
              name="number_room"
              value={number_room}
              onChange={this.handleInputChange}
            />
          </div>

          <div>
            <label>Area:</label>
            <input
              type="number"
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
              <option value="">Specific address in the Address table</option>
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

          <div>
            <button className="btn btn-success" type="submit">
              Thêm mới
            </button>
          </div>
        </form>
      </div>
    );
  }
}

export default Addapartment;