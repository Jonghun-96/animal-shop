import React, { useState } from 'react';

interface StarRatingProps {
  maxStars?: number;
  onRatingChange: (rating: number) => void;
}

const StarRating: React.FC<StarRatingProps> = ({ maxStars = 5, onRatingChange }) => {
  const [rating, setRating] = useState<number>(0);
  const [hover, setHover] = useState<number>(0);

  const handleClick = (val: number) => {
    setRating(val);
    onRatingChange(val);
  };

  return (
    <div className="mb-3">
      {[...Array(maxStars)].map((_, index) => {
        const starValue = index + 1;
        return (
          <button
            key={starValue}
            type="button"
            className={`btn btn-link p-0 border-0 ${starValue <= (hover || rating) ? 'text-warning' : 'text-muted'}`}
            onClick={() => handleClick(starValue)}
            onMouseEnter={() => setHover(starValue)}
            onMouseLeave={() => setHover(0)}
            style={{ fontSize: '1.5rem', textDecoration: 'none' }}
          >
            ★
          </button>
        );
      })}
      <span className="ms-2 badge bg-secondary">{rating}점</span>
    </div>
  );
};

export default StarRating;