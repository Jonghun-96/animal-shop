



export interface Review {
  id: number;      // 리뷰 고유 번호
  userId: string; // 작성자 이름
  rating: number;   // 별점 (1~5)
  content: string;  // 리뷰 내용
  date: string;     // 작성일 (예: "2024-05-20")
}