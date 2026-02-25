import { Navbar, Nav, Container, Row, Col, Form, Button, Modal, CloseButton } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart, increaseCount, decreaseCount, removeFromCart, clearCart } from '../../store/cartSlice';
import './CartModal.css'
import { animals } from '../../data/data'


function CartModal({ show, onHide, clearCartStorage }) {

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cart = useSelector(state => state.cart);


  const totalPrice = cart.reduce(
    (sum, item) => sum + item.price * item.count,
    0
  )

  return(
  <>
    <Modal
      size='lg'
      aria-labelledby="contained-modal-title-vcenter"
      centered
      show={show} onHide={onHide}
    >
      <Modal.Header closeButton>
        
        <Modal.Title id="contained-modal-title-vcenter">
          내 장바구니
        </Modal.Title>

      </Modal.Header>

      <Modal.Body>
        {cart.length === 0 ? (
          <div className='emptyCart'>아직 친구를 담지 않았어요</div>
        ) : (
          cart.map(item => {
            const animal = animals.find(a => a.id === item.id);
            if (!animal) return null;

            return (
              <div className='modalItem' key={item.id}>
                <img className='itemImg' src={animal.img} alt={animal.name} />
                <div className='itemName'>{animal.name}</div>
                <div className='itemPrice'>{animal.price.toLocaleString()}원</div>

                <div className='itemCount'>
                  <Button
                    className='btn btn-light btn-sm itemPlus'
                    onClick={() => dispatch(increaseCount(item.id))}
                  >
                    +
                  </Button>

                  <span>{item.count}개</span>

                  <Button
                    className='btn btn-light btn-sm itemMinus'
                    disabled={item.count === 1}
                    onClick={() => dispatch(decreaseCount(item.id))}
                  >
                    -
                  </Button>
                </div>

                <CloseButton onClick={() => dispatch(removeFromCart(item.id))} />
              </div>
            );
          })
        )}
      </Modal.Body>

      <Modal.Footer>
        <div className='totalPrice'>
          총 금액 : <strong>{totalPrice.toLocaleString()}</strong>원
        </div>

        <Button 
        variant="danger" 
        onClick={() => {
          dispatch(clearCart())
          clearCartStorage();
        }}>
          장바구니 비우기
        </Button>

        <Button 
        variant="danger"
        onClick={() => {
          onHide();
          navigate('/mypage');
        }}>
          구매페이지로 이동
        </Button>
        
      </Modal.Footer>

    </Modal>
    
    
  </>
  )
}

export default CartModal;