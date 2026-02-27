import React, { useState } from 'react';
import StarRating from './StarRating';
import './ReviewForm.css';


interface ReviewData {
  rating: number;
  comment: string;
}

const ReviewForm: React.FC = ({ onSubmit }) => {

  const [rating, setRating] = useState<number>(0); 
  const [review, setReview] = useState<string>('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    onSubmit(rating, review);
  };

  return (
    <div className="card shadow-sm border-0 bg-body mb-5 review-box">
      <div className="card-body p-4">
        <h5 className="fw-bold mb-3">리뷰 작성하기</h5>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label d-block text-muted small uppercase">만족도를 선택해주세요</label>
            <StarRating onRatingChange={setRating} />
          </div>

          <div className="mb-3">
            <textarea
              className="form-control border-0 shadow-sm"
              rows={4}
              placeholder="다른 이용자들에게 도움이 될 수 있도록 솔직한 후기를 남겨주세요."
              value={review}
              onChange={(e) => setReview(e.target.value)}
              style={{ resize: 'none' }}
            ></textarea>
            <div className="text-end mt-1 text-muted small">
              {review.length} / 500자
            </div>
          </div>

          <div className="text-end">
            <button type="submit" className="btn btn-primary px-4 py-2 fw-bold">
              등록하기
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ReviewForm;