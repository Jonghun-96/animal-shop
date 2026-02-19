import { Button, Badge, Modal } from 'react-bootstrap';
import './CartButton.css'
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { getLoginUser } from "../../utils/authStorage";
import { useNavigate } from 'react-router-dom';
import { FaCartShopping } from "react-icons/fa6";


function CartButton({ onClick }) {

  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  const cart = useSelector(state => state.cart);
  const totalCount =  cart.reduce(
    (sum, item) => sum + item.count,
    0
  );


  const handleCartClick = () => {
    const user = getLoginUser();
    if (!user) {
      setShowModal(true);
      return;
    }
    onClick();
  };


  return(
  <>
    <div className="cart-btn">
      <Button className="cart-icon glass-button" onClick={handleCartClick}>
        <FaCartShopping />
        {totalCount > 0 && (
          <Badge bg="danger" className="cart-badge">
            {totalCount}
          </Badge>
        )}
      </Button>
    </div>

    <Modal show={showModal} onHide={() => setShowModal(false)} centered>
      <Modal.Header closeButton>
        <Modal.Title>로그인이 필요합니다</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        장바구니를 이용하려면 로그인 후 이용해주세요.
      </Modal.Body>

      <Modal.Footer>

        <Button variant="dark" onClick={() => {
          setShowModal(false);
          navigate('/login')}}>
          로그인 하러가기
        </Button>
      </Modal.Footer>
    </Modal>
    
  </>
  )
}

export default CartButton;