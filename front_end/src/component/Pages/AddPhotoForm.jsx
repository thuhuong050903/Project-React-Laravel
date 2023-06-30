import React, { Component } from "react";
import axios from "axios";
import "../../assets/style/AddPhotoForm.css";

class AddPhotoForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedFile: null,
      error: null,
      formVisible: true,
      relatedPhotos: [], 
      apartment: null,
      address: null, 
      user: null, 
    };
  }
  componentDidMount() {
    const { apartmentId } = this.props;
    this.fetchRelatedPhotos(apartmentId);
    this.fetchApartmentDetails(apartmentId);
  }
  fetchApartmentDetails = async (apartmentId) => {
    try {
      const response = await axios.get(
        `http://localhost:8000/api/get-apartment/${apartmentId}`
      );
      const apartment = response.data;
      this.setState({ apartment });
  
      if (apartment.address_id) {
        const addressResponse = await axios.get(
          `http://localhost:8000/api/get-address/${apartment.address_id}`
        );
        const address = addressResponse.data;
        this.setState({ address });
      }
  
      if (apartment.user_id) {
        const userResponse = await axios.get(
          `http://localhost:8000/api/get-user/${apartment.user_id}`
        );
        const user = userResponse.data;
        this.setState({ user });
      }
    } catch (error) {
      console.error("Error fetching apartment details:", error);
    }
  };
  fetchRelatedPhotos = async (apartmentId) => {
    try {
      const response = await axios.get(
        `http://localhost:8000/api/related-photos/${apartmentId}`
      );
      this.setState({ relatedPhotos: response.data });
    } catch (error) {
      console.error("Error fetching related photos:", error);
    }
  };

  handleFileChange = (event) => {
    this.setState({
      selectedFile: event.target.files[0],
    });
  };

  handleUpload = async () => {
    const { selectedFile } = this.state;
    const { apartmentId } = this.props;

    if (!selectedFile) {
      alert("Please select a file");
      return;
    }

    const formData = new FormData();
    formData.append("file", selectedFile);

    try {
      await axios.post(
        `http://localhost:8000/api/add-photo/${apartmentId}`,
        formData
      );
      alert("Photo uploaded successfully");
      window.location.reload();

      this.setState({
        selectedFile: null,
        formVisible: false,
        relatedPhotos: [], // Clear the related photos array
        apartment: null,
      });
    } catch (error) {
      console.error("Error uploading photo:", error);
      alert("Failed to upload photo");
    }
  };


  handleDelete = async (photoId) => {
    try {
      await axios.delete(`http://localhost:8000/api/delete-photo/${photoId}`);
      alert("Photo deleted successfully");
      this.fetchRelatedPhotos(this.props.apartmentId);
    } catch (error) {
      console.error("Error deleting photo:", error);
      alert("Failed to delete photo");
    }
  };

  render() {
    const { selectedFile, formVisible, relatedPhotos,apartment, address, user } = this.state;

    return (
      <div className="container_image">
        {formVisible && (
          <div className="formaddphoto">
          <h2 style={{ color: "blue", marginBottom: "10px" }}>Add Photo</h2>
          <input
            type="file"
            onChange={this.handleFileChange}
            style={{ marginBottom: "10px" }}
          />
          <button
            onClick={this.handleUpload}
            style={{ backgroundColor: "blue", color: "white", padding: "5px 10px" }}
          >
            Upload
          </button>
          {selectedFile && (
            <div style={{ marginTop: "10px" }}>
              Selected file: {selectedFile.name}
            </div>
          )}
        </div>
        )}

        {apartment && address && user && (
          <div className="apartment-details  bg-secondary">
            <h3>Apartment Details:</h3>
            <table style={{ borderCollapse: 'collapse' }}>
              <thead>
                <tr>
                  <th style={{ border: '1px solid black' }}>Apartment ID</th>
                  <th style={{ border: '1px solid black' }}>Apartment description</th>
                  <th style={{ border: '1px solid black' }}>Street number</th>
                  <th style={{ border: '1px solid black' }}>Street</th>
                  <th style={{ border: '1px solid black' }}>Ward</th>
                  <th style={{ border: '1px solid black' }}>User Name</th>
                  <th style={{ border: '1px solid black' }}>User Email</th>
                  <th style={{ border: '1px solid black' }}>User Phone</th>
                  <th style={{ border: '1px solid black' }}>User Address</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td style={{ border: '1px solid black' }}>{apartment.apartment_id}</td>
                  <td style={{ border: '1px solid black' }}>{apartment.description}</td>
                  <td style={{ border: '1px solid black' }}>{address.number}</td>
                  <td style={{ border: '1px solid black' }}>{address.street}</td>
                  <td style={{ border: '1px solid black' }}>{address.ward}</td>
                  <td style={{ border: '1px solid black' }}>{user.username}</td>
                  <td style={{ border: '1px solid black' }}>{user.email}</td>
                  <td style={{ border: '1px solid black' }}>{user.phone}</td>
                  <td style={{ border: '1px solid black' }}>{user.address}</td>
                </tr>
              </tbody>
            </table>

   
          </div>
        )}
        {relatedPhotos.length > 0 && (
          <div className="related-photos">
            <h3 style={{color:"blue"}}>Related Photos:
            </h3>
            <p style={{color:"red"}}>Nếu bạn muốn xóa ảnh! Click vào ảnh đó.</p>
            <div className='row'>
              {relatedPhotos.map((photo) => (
                 <div className='col-sm-3' key={photo.image_id}>
                  <img style={{width: 300, height: 250}}
                    className="img-thumbnail"
                    src={`http://localhost:8000/photos/${photo.name}`}
                    alt={photo.name} 
                    onClick={() => this.handleDelete(photo.image_id)}
                  />
                </div>
              ))}
           </div>
          </div>
        )}
      </div>
    );
  }
}

export default AddPhotoForm;
