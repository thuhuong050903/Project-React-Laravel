import React, { Component } from "react";
import axios from "axios";
import "../../assets/style/RelatedPhoto.css";

class RelatedPhoto extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedFile: null,
      error: null,
      relatedPhotos: [], 
      apartment: null,
      user: null, 
    };
  }
  componentDidMount() {
    const { apartmentId } = this.props;
    this.fetchRelatedPhotos(apartmentId);
  }

  fetchRelatedPhotos = async (apartmentId) => {
    try {
      const response = await axios.get(
        `http://localhost:8000/api/related-photos/${apartmentId}`
      );
      alert("Làm ơn xem kĩ thông tin căn hộ và kéo lên trên để xem ảnh liên quan!")
      this.setState({ relatedPhotos: response.data });
     
    } catch (error) {
      console.error("Error fetching related photos:", error);
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
    const { relatedPhotos } = this.state;

    return (
      <div className="container_image">
       
        {relatedPhotos.length > 0 && (
          <div className="related-photos">
            <h3 style={{color:"red"}}>Related Photos:
            </h3>
            <p style={{color:"yellow"}}>Nếu bạn muốn xóa ảnh! Click vào ảnh đó.</p>
            <div className='row'>
              {relatedPhotos.map((photo) => (
                 <div className='col-sm-3' key={photo.image_id}>
                  <img style={{width: 300, height: 250}}
                    className="img-thumbnail"
                    src={`http://localhost:8000/uploads/${photo.name}`}
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

export default RelatedPhoto;
