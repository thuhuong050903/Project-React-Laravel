import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import '../../assets/style/Detail.css'

function Detail() {
  const { id } = useParams();

  const [apartment, setApartment] = useState(null);

  useEffect(() => {
    // Lấy chi tiết căn hộ dựa trên id
    fetch(`http://localhost:8000/api/get-apartment/${id}`)
      .then(response => response.json())
      .then(data => {
        setApartment(data);
      })
      .catch(error => console.log(error));
  }, [id]);

  if (!apartment) {
    return <p>Đang tải...</p>;
  }
  return (
    <div className='Detail'>

      <h1>Apartment Detail</h1>
      <p>Name: {apartment.description}</p>
      {/* Display other apartment details */}
    </div>
  );
}

export default Detail;
