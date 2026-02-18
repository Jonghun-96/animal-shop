import { Button, Badge, Modal } from 'react-bootstrap';
import './CartButton.css'
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { getLoginUser } from "../../utils/authStorage";


function CartButton({ onClick }) {

  const [showModal, setShowModal] = useState(false);

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
    <Button className="cart-btn glass-button" onClick={handleCartClick}>
      🛒
      {totalCount > 0 && (
        <Badge bg="danger" className="cart-badge">
          {totalCount}
        </Badge>
      )}
    </Button>

    <Modal show={showModal} onHide={() => setShowModal(false)} centered>
      <Modal.Header closeButton>
        <Modal.Title>로그인이 필요합니다</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        장바구니를 이용하려면 로그인 후 이용해주세요.
      </Modal.Body>

      <Modal.Footer>

        <Button variant="dark" onClick={() => window.location.href = "/login"}>
          로그인 하러가기
        </Button>
      </Modal.Footer>
    </Modal>
  </>
  )
}

export default CartButton;