import { animals } from '../../data/data';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../../store/cartSlice';
import { toggleWish } from '../../store/wishlistSlice';
import { RootState } from '../../store/store';
import { FaCartShopping, FaHeart, FaRegHeart } from "react-icons/fa6";
import "./Detail.css";
import ReviewList from '@/components/review/ReviewList';
import ReviewForm from '@/components/review/ReviewForm';
import { useState, useEffect } from 'react';
import { Review } from '@/types/review';
import { json } from 'stream/consumers';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { toast } from 'react-toastify';



function Detail() {

  const dispatch = useDispatch();
  const { id } = useParams();
  

  const animal = animals.find(a => a.id === Number(id))

  const wishlist = useSelector((state: RootState) => state.wishlist);
  const isWishlisted = wishlist.some(item => item.id === animal?.id);

  if (!animal) return <div>상품을 찾을 수 없습니다.</div>;

  const loginUserData = localStorage.getItem('loginUser');
  const userObj = loginUserData ? JSON.parse(loginUserData) : null;
  const currentUserId = userObj?.userId;


  const [reviews, setReviews] = useState<Review[]>(() => {

    const saved = localStorage.getItem(`reviews_${animal?.id}`); 
    return saved ? JSON.parse(saved) : [];
  });
  


  useEffect(() => {
    if (animal) {
      localStorage.setItem(`reviews_${animal.id}`, JSON.stringify(reviews));
    }
  }, [reviews, animal?.id]);




  const [loading, setLoading] = useState(false);

  const handleAddToCart = () => {
    if (loading) return;

    setLoading(true);

    dispatch(addToCart(animal));

    setTimeout(() => {
      setLoading(false);
    }, 300); // 간단하게 중복 클릭 방지용
  };



  const handleAddReview = (rating: number, review: string) => {

    if (!userObj) {
      toast.warning("로그인이 필요합니다.");
      return;
    }

    if (rating === 0) {
      toast.warning('별점을 선택해주세요! ⭐'); // alert 대신 toast
      return;
    }
    if (review.trim().length < 5) {
      toast.error('리뷰를 5자 이상 작성해주세요. ✍️');
      return;
    }

    const newReview = {
      id: Date.now(),
      userId: currentUserId,
      rating: rating,
      review: review,
      date: new Date().toLocaleDateString()
    };
    
    setReviews([newReview, ...reviews]); 

    setReviews([newReview, ...reviews]); 
    toast.success("리뷰가 등록되었습니다!");
  };


  const handleDeleteReview = (id: number) => {
    if (window.confirm("리뷰를 삭제하시겠습니까?")) {
      setReviews(reviews.filter(review => review.id !== id));
      toast.success("리뷰가 삭제되었습니다. 🗑️");
    }
  };





  return(

  <>
    <div className="detail">
      <div className="detailRow">
        <div className='detailImg'>
          <img src={animal.img}/>
        </div>
        <div>
          <h4 className="pt-5">{animal.name}</h4>
          <p>'{animal.description}'</p>
          <p>{animal.price.toLocaleString()}원</p>
          
          {/* <button className="btn btn-outline-danger">찜하기</button>  */}


          <button 
            className={`btn wishBtn ${isWishlisted ? 'btn-danger' : 'btn-outline-danger'} me-2`}
            onClick={() => {
              // 찜 데이터에는 수량(count) 없이 필요한 정보만 넘깁니다.
              dispatch(toggleWish({
                id: animal.id,
                name: animal.name,
                price: animal.price,
                image: animal.img
              }));
            }}
          >
            {isWishlisted ? "관심상품 해제" : "관심상품 등록"}
          </button>


          <button style={{ width: '140px' }} className="btn btn-danger" onClick={handleAddToCart} disabled={loading}>
            {loading ? (
              "추가 중..." 
            ) : (
              <>
                장바구니 담기 <FaCartShopping/>
              </>
            )}
          </button>
        </div>
      </div>
    </div> 

    <ReviewForm onSubmit={handleAddReview}/>
    <ReviewList reviews={reviews} onDelete={handleDeleteReview}/>

    <ToastContainer position="top-right" autoClose={3000} />
  </>
  )
}

export default Detail;