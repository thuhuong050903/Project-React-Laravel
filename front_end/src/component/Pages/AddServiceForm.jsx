import React, { Component } from "react";
import axios from "axios";
import "../../assets/style/AddApartmentForm.css";
import swal from "sweetalert";
import { Link } from "react-router-dom";

const successAlert = (user_id) => {
  swal({
    title: "Thank you!",
    text: `You added a ${user_id} successfully!`,
    icon: "success",
  });
};

class AddServiceForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
     
      description: "",
      price: "",
      contact_info: "",
      addedSuccess: false,
      error: "",
    };
  }

  handleInputChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  handleSubmit = async (event) => {
    event.preventDefault();

    const {
      
      description,
      price,
      contact_info,
      
    } = this.state;

    // Kiểm tra nếu giá trị type_room là chuỗi rỗng hoặc null
   

    try {
      // Gửi request để thêm mới căn hộ
      const response = await axios.post(
        "http://localhost:8000/api/add-service",
        {
         
          description,
          price,
          contact_info,
          
        }
      );

      const addedServiceId = response.data.service_id;

      // Gọi hàm callback để thông báo thành công cho component cha
     

      // Reset form
      this.setState({
        
        description: "",
        price: "",
        contact_info: "",
        error: "",
        addedSuccess: true,
      });
      this.props.onAddSuccess(
        alert ("Thêm dịch vụ thành công!")
      ); 
    } catch (error) {
      console.error("Error adding service:", error);
      // Xử lý lỗi
      this.setState({
        error: "Đã xảy ra lỗi khi thêm mới dịch vụ",
      });
    }
  };

  render() {
    const {
      description,
      price,
      contact_info,
      addedSuccess,
      error,
    } = this.state;
    if (addedSuccess) {
      return <div className="success">
        </div>; // Hiển thị thông báo thành công và ẩn form
    }
    return (
      <div className="form-container">
        <h2>Thêm mới dịch vụ</h2>
        {error && <div className="error">{error}</div>}
        <form onSubmit={this.handleSubmit}>
         
          <div>
            <label>Description:</label>
            <input
              type="text"
              name="description"
              placeholder="Mô tả về dịch vụ"
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
              placeholder="Nhập giá"
              onChange={this.handleInputChange}
            />
          </div>
          <div>
            <label>Contact Information:</label>
            <input
              type="text"name="contact_info"
              placeholder="Nhập thông tin liên hệ"
              value={contact_info}
              onChange={this.handleInputChange}
            />
          </div>
         
          <div>
            <button
              className="btn btn-success"
              type="submit"
              onClick={() => successAlert(service_id)}
            >
              Thêm mới
            </button>
          </div>
        </form>
      </div>
    );
  }
}

export default AddServiceForm;