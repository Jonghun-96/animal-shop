
import React from 'react';
import { Review } from '@/types/review';
import './ReviewList.css';


interface ReviewListProps {
  // 부모(Detail)로부터 전달받는 리뷰 배열
  reviews: Review[];
  onDelete: (id: number) => void;
}

const ReviewList: React.FC<ReviewListProps> = ({ reviews, onDelete }) => {
  
  const userStr = localStorage.getItem('loginUser');
  const currentUser = userStr ? JSON.parse(userStr) : null;




  if (reviews.length === 0) {
    return (
      <div className="text-center py-5 border rounded bg-body">
        <p className="text-muted mb-0">아직 작성된 리뷰가 없습니다.</p>
        <small>첫 번째 리뷰의 주인공이 되어보세요!</small>
      </div>
    );
  }

  return (
    <div className="review-list-container">
      <h5 className="fw-bold mb-4">전체 리뷰 ({reviews.length})</h5>
      
      {reviews.map((review) => (
        <div key={review.id} className="card mb-3 border-0 border-bottom rounded-0">
          <div className="card-body px-0">
            <div className="d-flex justify-content-between align-items-start mb-2">
              <div>
                {/* 작성자 정보 */}
                <span className="fw-bold me-2">{review.userId}</span>
                <span className="text-muted small">{review.date}</span>
                
                {/* 별점 표시 로직 */}
                <div className="mt-1">
                  {[...Array(5)].map((_, i) => (
                    <span 
                      key={i} 
                      className={i < review.rating ? "text-warning" : "text-light-gray"}
                      style={{ color: i < review.rating ? '#ffc107' : '#e4e5e9' }}
                    >
                      ★
                    </span>
                  ))}
                  <span className="ms-2 small fw-bold">{review.rating}점</span>
                </div>
              </div>

              {currentUser && currentUser.userId === review.userId && (
                <button 
                  className="btn btn-sm btn-outline-danger border-0 review-delete"
                  onClick={() => onDelete(review.id)}
                >
                  삭제
                </button>
              )}

            </div>




            {/* 리뷰 본문 */}
            <p className="card-text text-body mt-2" style={{ lineHeight: '1.6' }}>
              {review.review}
            </p>
          </div>
        </div>
      ))}



    </div>
  );
};

export default ReviewList;