import { useSelector, useDispatch } from 'react-redux';
import { toggleLike } from '../../store/likesSlice';
import './LikeButton.css'
import { Animal } from "../../types/animal";


type Props = {
  animal: Animal;
};


function LikeButton({ animal } :Props) {

  const dispatch = useDispatch();
  const likes = useSelector(state => state.likes)
  const isLiked = !!likes[animal.id];
  const displayCount = animal.seedLikes + (isLiked ? 1 : 0);
  

  return(
    <button 
      className="likeBtn"
      onClick={(e)=>{
        e.stopPropagation();
        dispatch(toggleLike(animal.id))
      }}
      aria-label="like button">
      {isLiked ? '❤️' : '🤍'} 
      <span className='likeCount'>Like {displayCount}</span>
    </button>
  )
}

export default LikeButton;