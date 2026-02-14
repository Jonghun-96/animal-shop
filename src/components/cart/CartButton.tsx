import { Button, Badge } from 'react-bootstrap';
import './CartButton.css'
import { useState } from 'react';
import { useSelector } from 'react-redux';


function CartButton({ onClick }) {

  const cart = useSelector(state => state.cart);
  const totalCount =  cart.reduce(
    (sum, item) => sum + item.count,
    0
  );

  return(
  <>
  
    <Button className='cart-btn glass-button' onClick={onClick}>
      🛒
      {totalCount > 0 && (
        <Badge bg="danger" className="cart-badge">
          {totalCount}
        </Badge>
      )}
    </Button>
    
  </>
  )
}

export default CartButton;