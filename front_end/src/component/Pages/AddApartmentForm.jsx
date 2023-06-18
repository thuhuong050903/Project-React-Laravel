import React, { Component } from "react";
import axios from "axios";
import './AddApartmentForm.css';
import swal from "sweetalert";
const successAlert = (user_id) => {
    swal({
      title: "Thank you!",
      text: `You added a ${user_id} successfully! `,
      icon: "success",
    });
  };
class AddApartmentForm extends Component{
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

  handleInputChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  handleSubmit = async (event) => {
    event.preventDefault();
  
    const {
      user_id,
      description,
      price,
      number_room,
      area,
      address_id,
      type_room
    } = this.state;
  
    // Kiểm tra nếu giá trị type_room là chuỗi rỗng hoặc null
    if (type_room === "" || type_room === null) {
      alert("Vui lòng nhập giá trị cho Type of Room");
      return;
    }
  
    try {
      // Gửi request để thêm mới căn hộ
      const response = await axios.post("http://localhost:8000/api/add-apartment", {
        user_id,
        description,
        price,
        number_room,
        area,
        address_id,
        type_room
      });
  
      
  
      // Gọi hàm callback để thông báo thành công cho component cha
      if (this.props.onAddSuccess) {
        this.props.onAddSuccess();
      }
  
      // Reset form
      this.setState({
        user_id: "",
        description: "",
        price: "",
        number_room: "",
        area: "",
        address_id: "",
        type_room: "",
        error: ""
      });
    } catch (error) {
      console.error("Error adding apartment:", error);
      // Xử lý lỗi
      this.setState({
        error: "Đã xảy ra lỗi khi thêm mới căn hộ"
      });
    }
  }
  

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
              type="text"
              name="price"
              value={price}
              onChange={this.handleInputChange}
            />
          </div>
          <div>
            <label>Number of Rooms:</label>
            <input
              type="text"
              name="number_room"
              value={number_room}
              onChange={this.handleInputChange} 
            />
          </div>
          <div>
            <label>Area:</label>
            <input
              type="text"
              name="area"
              value={area}
              onChange={this.handleInputChange}
            />
          </div>
          <div>
            <label>Address ID:</label>
            <input
              type="text"
              name="address_id"
              value={address_id}
              onChange={this.handleInputChange}
            />
          </div>
          <div>
            <label>Type of Room:</label>
            <input
              type="text"
              name="type_room"
              value={type_room}
              onChange={this.handleInputChange}
            />
          </div>
          <div>
            <button className="btn btn-success" type="submit" onClick={() => successAlert(user_id)}>Thêm mới</button>
          </div>
        </form>
      </div>
    );
  }
}

export default AddApartmentForm;
