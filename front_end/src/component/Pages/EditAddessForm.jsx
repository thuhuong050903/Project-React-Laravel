import React, { Component } from "react";
import axios from "axios";
class EditAddressForm extends Component {
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

  async componentDidMount() {
    const { address_id } = this.props;
    await this.fetchaddressData(address_id);
  }

  async fetchaddressData(address_id) {
    try {
      const response = await axios.get(`http://localhost:8000/api/get-address/${address_id}`);
      const addressData = response.data;
      this.setState({
        number: addressData.number,
        street: addressData.street,
        ward: addressData.ward,
        district: addressData.district,
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
    const { address_id, onEditSuccess } = this.props;
    const {
      number,
      street,
      ward,
      district,
    } = this.state;

    try {
      await axios.put(`http://localhost:8000/api/edit-address/${address_id}`, {
        number,
        street,
        ward,
        district,
        
      });
      alert("Cập nhật địa chỉ thành công");
      onEditSuccess();
    } catch (error) {
      console.error("Error updating apartment:", error);
      alert("Đã xảy ra lỗi khi cập nhật địa chỉ");
    }
  };

  render() {
    const {
      number,
      street,
      ward,
      district,
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
            <label>number:</label>
            <br/>
            <input
              type="text"
              name="number"
              value={number}
              onChange={this.handleInputChange}
            />
          </div>
          <div>
            <label>street:</label>
            <br/>
            <textarea
              name="street"
              value={street}
              onChange={this.handleInputChange}
            />
          </div>
          <div>
            <label>ward:</label>
            <br/>
            <input
              type="text"
              name="ward"
              value={ward}
              onChange={this.handleInputChange}
            />
          </div>
          <div>
          <label>district</label>
            <br/>
            <input
              type="text"
              name="district"
              value={district}
              onChange={this.handleInputChange}
            />
          </div>
          
          
          <button type="submit">Save</button>
        </form>
      </div>
    );
  }
}

export default EditAddressForm;
