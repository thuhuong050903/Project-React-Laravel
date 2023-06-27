import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar as solidStar } from '@fortawesome/free-solid-svg-icons';
import { faStar as regularStar } from '@fortawesome/free-regular-svg-icons';
import axios from 'axios';

function Star_rating({ apartmentId, userId }) {
  const [selectedRating, setSelectedRating] = useState(0);
  const [comment, setComment] = useState('');
  const [starCount, setStarCount] = useState(0); 

  useEffect(() => {
    // Gọi API để lấy số sao từ cơ sở dữ liệu khi component được render
    fetchStarCount();
  }, []);

  const handleRatingChange = (rating) => {
    setSelectedRating(rating);
  };

  const handleCommentChange = (e) => {
    setComment(e.target.value);
  };

  const handleSubmitRating = () => {
    if (selectedRating === 0) {
      alert('Please select a rating.');
      return;
    }

    const ratingData = {
      apartment_id: apartmentId,
      user_id: userId,
      number_rating: selectedRating,
      comment: comment,
    };

    axios
      .post('http://localhost:8000/api/ratings', ratingData)
      .then((response) => {
        console.log('Rating submitted successfully:', response.data);
        setSelectedRating(0);
        setComment('');

        // Gọi API để cập nhật số sao từ cơ sở dữ liệu sau khi đánh giá thành công
        fetchStarCount();
      })
      .catch((error) => {
        console.error('Rating submission failed:', error);
      });
  };

  const fetchStarCount = () => {
    axios
      .get(`http://localhost:8000/api/ratings?apartment_id=${apartmentId}&user_id=${userId}`)
      .then((response) => {
        setStarCount(response.data.number_of_stars);
      })
      .catch((error) => {
        console.error('Failed to fetch star count:', error);
      });
  };

  // ...

  const renderStars = () => {
    const isRated = starCount !== 0;
  
    return (
      <div className='star-container'>
        {[1, 2, 3, 4, 5].map((index) => (
          <FontAwesomeIcon
            key={index}
            className='icon-star'
            icon={isRated ? solidStar : regularStar}
            onClick={() => handleRatingChange(index)}
            style={{
              cursor: 'pointer',
              padding:'10px', 
              fontSize:'30px',
              color: isRated ? (index <= starCount ?  'yellow' : 'black') : (index <= selectedRating ? 'yellow' : 'black'),
            }}
          />
        ))}
      </div>
    );
  };
  
  
  return (
    <div className="star-rating-container" style={{ width: '100%', boxShadow: '0 0 5px rgba(0, 0, 0, 0.2)', padding: '50px', borderRadius: '4px', display: 'flex', justifyContent: 'space-around'}}>
      <div>
        <h4 style={{ marginBottom: '10px' }}>Đánh giá:</h4>
        {renderStars()}
      </div>
      <div>
        <h4 style={{ marginBottom: '10px', }}>Comment:</h4>
        <textarea value={comment} onChange={handleCommentChange} style={{ width: '700px', minHeight: '100px', borderRadius: '4px', padding: '5px' }} />
      </div>
      <div style={{ textAlign: 'right' }}>
        <button onClick={handleSubmitRating} style={{ backgroundColor: '#ee0000', color: 'white', borderRadius: '4px',marginTop:'120px', padding: '8px 12px', border: 'none' }}>
          Submit
        </button>
      </div>
     
    </div>
  );
  }  
export  default Star_rating  