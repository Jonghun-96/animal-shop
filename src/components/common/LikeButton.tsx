import { useSelector, useDispatch } from 'react-redux';
import { toggleLike } from '../../store/likesSlice';
import './LikeButton.css'
import { Animal } from "../../types/animal";
import { getLoginUser } from '../../utils/authStorage';
import { Toast, ToastContainer } from 'react-bootstrap';
import { useState } from 'react';
import { FaHeart, FaRegHeart } from "react-icons/fa";


type Props = {
  animal: Animal;
};


function LikeButton({ animal } :Props) {

  const dispatch = useDispatch();
  const likes = useSelector(state => state.likes)
  const isLiked = !!likes[animal.id];
  const displayCount = animal.seedLikes + (isLiked ? 1 : 0);
  const userId = getLoginUser();
  const isLoggedIn = !!userId;
  const [showToast, setShowToast] = useState(false);

  return(
  <>
    <button 
      className="likeBtn"
      onClick={(e)=>{
        e.stopPropagation();
        if (!isLoggedIn) {
          setShowToast(true);
          return;
        }
        dispatch(toggleLike(animal.id))
      }}
      aria-label="like button">
      {isLiked ? <FaHeart className="text-danger fs-4"/> : <FaRegHeart className="text-secondary fs-4"/>} 
      <span className='likeCount'>Like {displayCount}</span>
    </button>
    <ToastContainer position="top-center" className="p-3">
        <Toast
          onClose={() => setShowToast(false)}
          show={showToast}
          delay={2000}
          autohide
          bg="warning"
        >
          <Toast.Body>좋아요 기능은 로그인 후 사용 가능합니다</Toast.Body>
        </Toast>
      </ToastContainer>
  </>  
  )
}

export default LikeButton;