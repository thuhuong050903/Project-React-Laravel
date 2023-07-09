import React, { useState, useEffect } from 'react';
import '../../assets/style/ShowRating.css'; 

const ShowRating = ({ apartmentId }) => {
  const [ratings, setRatings] = useState([]);

  useEffect(() => {
    fetch(`http://127.0.0.1:8000/api/rating-count/${apartmentId}`)
      .then(response => response.json())
      .then(data => setRatings(data))
      .catch(error => console.log(error));
  }, [apartmentId]);

  const renderStars = (rating) => {
    const starIcons = '★'.repeat(rating) + '☆'.repeat(5 - rating);
    return <span className="star-rating">{starIcons}</span>;
  };

  return (
    <div className="rating-container">
      <h1 className="title">Đánh giá từ khách hàng</h1>
      <ul className="rating-list">
        {ratings.map(rating => (
          <li key={rating.rating_id} className="rating-item">
            <div className="rating-header">
              <p className="user">Khách hàng: {rating.users.username}</p>
            </div>
            <div className="rating-body">
              <p className="rating">Số lượng đánh giá: {renderStars(rating.number_rating)}</p>
              <p className="comment">Bình luận: {rating.comment}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ShowRating;
