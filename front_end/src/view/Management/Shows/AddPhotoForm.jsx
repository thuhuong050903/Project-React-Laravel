import React, { useState, useRef } from "react";
import axios from "axios";

function AddPhotoForm({ onClose }) {
  const [images, setImages] = useState([]);
  const [responseMsg, setResponseMsg] = useState({
    status: "",
    message: "",
    error: "",
  });
  const [isUploadSuccess, setIsUploadSuccess] = useState(false);

  const imageRef = useRef(null);

  // image onchange handler
  const handleChange = (e) => {
    const filesArray = Array.from(e.target.files);
    const validFiles = [];

    filesArray.forEach((file) => {
      if (fileValidate(file)) {
        validFiles.push(file);
      }
    });

    setImages((prevImages) => [...prevImages, ...validFiles]);
  };

  // submit handler
  const submitHandler = (e) => {
    e.preventDefault();
    const data = new FormData();
    images.forEach((image, index) => {
      data.append(`images[${index}]`, image);
    });

    axios
      .post(`http://localhost:8000/api/add-photo`, data)
      .then((response) => {
        if (response.status === 200) {
          setResponseMsg({
            status: response.data.status,
            message: response.data.message,
          });
          setIsUploadSuccess(true);
          setTimeout(() => {
            setImages([]);
            setResponseMsg("");
            onClose(); // Đóng Modal
          }, 1000);
          alert("Thêm thành công");
          document.querySelector("#imageForm").reset();
          // getting uploaded images
          imageRef.current.getImages();
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  // file validation
  const fileValidate = (file) => {
    if (
      file.type === "image/png" ||
      file.type === "image/jpg" ||
      file.type === "image/jpeg" ||
      file.type === "image/webp"
    ) {
      setResponseMsg({
        error: "",
      });
      return true;
    } else {
      setResponseMsg({
        error: "File type allowed only jpg, png, jpeg",
      });
      return false;
    }
  };

  const reloadPage = () => {
    window.location.reload();
  };

  return (
    <div className="container py-5">
      <div className="row">
        <div className="col-lg-12">
          <form
            onSubmit={submitHandler}
            encType="multipart/form-data"
            id="imageForm"
          >
            <div className="card shadow">
              {responseMsg.status === "successs" ? (
                <div className="alert alert-success">
                  {responseMsg.message}
                </div>
              ) : responseMsg.status === "failed" ? (
                <div className="alert alert-danger">
                  {responseMsg.message}
                </div>
              ) : (
                ""
              )}
              {isUploadSuccess && (
                <div className="alert alert-success">
                  Bạn đã thêm thành công!
                </div>
              )}
              <div className="card-header">
                <h4 className="card-title fw-bold">
                  Thêm ảnh căn hộ
                </h4>
              </div>

              <div className="card-body">
                <div className="form-group py-2">
                  <label htmlFor="images">Images</label>
                  <input
                    type="file"
                    name="image"
                    multiple
                    onChange={handleChange}
                    className="form-control"
                  />
                  <span className="text-danger">{responseMsg.error}</span>
                </div>
                <div className="preview">
                  {images.map((image, index) => (
                    <img
                      key={index}
                      src={URL.createObjectURL(image)}
                      alt={`Preview ${index}`}
                      className="preview-image"
                    />
                  ))}
                </div>
              </div>

              <div className="card-footer">
                <button
                  type="submit"
                  className="btn btn-success"
                  onClick={reloadPage}
                >
                  Upload
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AddPhotoForm;
