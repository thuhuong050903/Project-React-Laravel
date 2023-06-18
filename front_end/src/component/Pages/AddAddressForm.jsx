import React, { Component } from "react";
import axios from "axios";
import './AddApartmentForm.css';
import swal from "sweetalert";
const successAlert = (address_id) => {
    swal({
      title: "Thank you!",
      text: `You added a ${address_id} successfully! `,
      icon: "success",
    });
  };

class AddAddressForm extends Component{
  constructor(props) {
    super(props);
    this.state = {
      number: "",
      street: "",
      ward: "",
      district: "",
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
        number,
        street,
        ward,
        district,
    } = this.state;
  
    // Kiểm tra nếu giá trị type_room là chuỗi rỗng hoặc null
    if (number === "" || number === null) {
      alert("Vui lòng nhập giá trị cho số đường");
      return;
    }
  
    try {
      // Gửi request để thêm mới căn hộ
      const response = await axios.post("http://localhost:8000/api/add-address", {
        number,
        street,
        ward,
        district,
      });
  
      
  
      // Gọi hàm callback để thông báo thành công cho component cha
      if (this.props.onAddSuccess) {
        this.props.onAddSuccess();
      }
  
      // Reset form
      this.setState({
        number: "",
      street: "",
      ward: "",
      district: "",
        error: ""
      });
      alert("Thêm mới địa chỉ thành công");
    } catch (error) {
      console.error("Error adding address:", error);
      // Xử lý lỗi
      this.setState({
        error: "Đã xảy ra lỗi khi thêm mới địa chỉ"
      });
    }
  }
  

  render() {
    const {
        number,
        street,
        ward,
        district,
      error
    } = this.state;

    return (
      <div className="form-container">
        <h2>Thêm mới địa chỉ</h2>
        {error && <div className="error">{error}</div>}
        <form onSubmit={this.handleSubmit}>
          <div>
            <label>Number:</label>
            <br/>
            <input
              type="number"
              name="number"
              value={number}
              onChange={this.handleInputChange}
            />
          </div>
          <div>
            <label>Street:</label>
            <input
              type="text"
              name="street"
              value={street}
              onChange={this.handleInputChange}
            />
          </div>
          <div>
            <label>Ward:</label>
            <input
              type="text"
              name="ward"
              value={ward}
              onChange={this.handleInputChange}
            />
          </div>
          <div>
            <label>District:</label>
            <input
              type="text"
              name="district"
              value={district}
              onChange={this.handleInputChange} 
            />
          </div>
          
          <div>
            <button className="btn btn-success" type="submit" onClick={() => successAlert(address_id)}>Thêm mới</button>
          </div>
        </form>
      </div>
    );
  }
}

export default AddAddressForm;
