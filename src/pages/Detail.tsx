import { animals } from '../data/data';
import { useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addToCart } from '../store/cartSlice';

import "./Detail.css"


function Detail() {

  const dispatch = useDispatch();
  const { id } = useParams();

  const animal = animals.find(a => a.id === Number(id))

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
          
          <button className="btn btn-outline-danger">찜하기</button> 
          <button className="btn btn-danger" onClick={()=>{
            dispatch(addToCart(animal));
          }}>장바구니 담기</button> 
        </div>
      </div>
    </div> 
  </>
  )
}

export default Detail;