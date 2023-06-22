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
      relatedPhotos: [], // List of related photos
    };
  }

  componentDidMount() {
    const { apartmentId } = this.props;
    this.fetchRelatedPhotos(apartmentId);
  }

  fetchRelatedPhotos = async (apartmentId) => {
    try {
      const response = await axios.get(
        `http://localhost:8000/api/photos/${apartmentId}`
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
      this.setState({
        selectedFile: null,
        formVisible: false,
        relatedPhotos: [], // Clear the related photos array
      });
    } catch (error) {
      console.error("Error uploading photo:", error);
      alert("Failed to upload photo");
    }
  };

  render() {
    const { selectedFile, formVisible, relatedPhotos } = this.state;

    return (
      <div className="container_image">
        {formVisible && (
          <div className="formaddphoto">
            <h2>Add Photo</h2>
            <input type="file" onChange={this.handleFileChange} />
            <button onClick={this.handleUpload}>Upload</button>
            {selectedFile && (
              <div>Selected file: {selectedFile.name}</div>
            )}
          </div>
        )}
        {relatedPhotos.length > 0 && (
          <div className="related-photos">
            <h3>Related Photos:</h3>
            <div className='row'>
              {relatedPhotos.map((photo) => (
                 <div className='col-sm-3' key={photo.id}>
                  <img
                    className="img-thumbnail"
                    src={`http://localhost:8000/photos/${photo.name}`}
                    alt={photo.name}
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
