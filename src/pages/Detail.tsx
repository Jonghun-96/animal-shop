import { animals } from '../data/data';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../store/cartSlice';
import { toggleWish } from '../store/wishlistSlice';
import { RootState } from '../store/store';
import { FaCartShopping, FaHeart, FaRegHeart } from "react-icons/fa6";
import "./Detail.css"


function Detail() {

  const dispatch = useDispatch();
  const { id } = useParams();

  const animal = animals.find(a => a.id === Number(id))


  const wishlist = useSelector((state: RootState) => state.wishlist);


  const isWishlisted = wishlist.some(item => item.id === animal?.id);

  if (!animal) return <div>상품을 찾을 수 없습니다.</div>;


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


          <button className="btn btn-danger" onClick={()=>{
            dispatch(addToCart(animal));
          }}>장바구니 담기 <FaCartShopping/></button> 
        </div>
      </div>
    </div> 
  </>
  )
}

export default Detail;