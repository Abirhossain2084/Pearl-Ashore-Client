import React, { useState } from 'react';
import { useContext } from 'react';
import { AuthContext } from '../../Providers/AuthProvider';

const DoReview = () => {
  const [rating, setRating] = useState(0);
  const [reviewText, setReviewText] = useState('');
  const { user } = useContext(AuthContext);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const review = {
      rating,
      reviewText,
      userEmail: user.email,
    };

    const response = await fetch('http://localhost:5000/reviews', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(review),
    });

    if (response.ok) {
      alert('Review submitted successfully');
      setRating(0);
      setReviewText('');
    } else {
      alert('Failed to submit review');
    }
  };

  return (
    <div>
      <h2>Post Review: {user.email}</h2>
      <form onSubmit={handleSubmit}>
        <label>Rating:</label>
        <select value={rating} onChange={(e) => setRating(parseInt(e.target.value))}>
          <option value="0">0</option>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
        </select>

        <label>Review:</label>
        <textarea value={reviewText} onChange={(e) => setReviewText(e.target.value)} />

        <button type="submit">Submit Review</button>
      </form>
    </div>
  );
};

export default DoReview;
