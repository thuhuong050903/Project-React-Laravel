import React, { Component } from "react";
import axios from "axios";
import '../../assets/style/EditApartmentForm.css';
class EditServiceForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
     
      description: "",
      price: "",
      contact_info: "",
      error: ""
    };
  }

  async componentDidMount() {
    const { service_id } = this.props;
    await this.fetchServiceData(service_id);
  }

  async fetchServiceData(service_id) {
    try {
      const response = await axios.get(`http://localhost:8000/api/get-service/${service_id}`);
      const serviceData = response.data;
      this.setState({
        description: serviceData.description,
        price: serviceData.price,
        contact_info: serviceData.contact_info,
        
      });
    } catch (error) {
      console.error("Error fetching service data:", error);
    }
  }

  handleInputChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  handleSubmit = async (event) => {
    event.preventDefault();
    const { service_id, onEditSuccess } = this.props;
    const {
      description,
      price,
      contact_info,
    } = this.state;
    try {
      await axios.put(`http://localhost:8000/api/edit-service/${service_id}`, {
        description,
        price,
        contact_info,
      
      });
      alert("Cập nhật dịch vụ thành công");
      onEditSuccess();
    } catch (error) {
      console.error("Error updating apartment:", error);
      alert("Đã xảy ra lỗi khi cập nhật dịch vụ");
    }
  };

  render() {
    const {
      
      description,
      price,
      contact_info,
      
      error
    } = this.state;

    if (error) {
      return <div>{error}</div>;
    }

    return (
      <div className="edit-apartment-form">
        <h2>Edit Service</h2>
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
              name="contact_info"
              value={contact_info}
              onChange={this.handleInputChange}
            />
          </div>
         
          <button type="submit">Save</button>
        </form>
      </div>
    );
  }
}

export default EditServiceForm;
