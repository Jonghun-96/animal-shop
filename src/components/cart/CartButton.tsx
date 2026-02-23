import { Button, Badge, Modal } from 'react-bootstrap';
import './CartButton.css'
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { FaCartShopping } from "react-icons/fa6";


function CartButton({ onClick }) {

  const navigate = useNavigate();

  const cart = useSelector(state => state.cart);
  const totalCount =  cart.reduce(
    (sum, item) => sum + item.count,
    0
  );

  const handleCartClick = () => {
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
    
  </>
  )
}

export default CartButton;