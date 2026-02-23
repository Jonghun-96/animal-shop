import { Container, Row, Col, Card, Form, Button, ListGroup } from 'react-bootstrap';
import './Checkout.css';
import { useSelector, useDispatch } from 'react-redux';
import { useState } from 'react';
import { clearCart } from '../store/cartSlice';
import { useNavigate } from 'react-router-dom';
import { toast, Toaster } from 'react-hot-toast';

function Checkout() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cart = useSelector((state) => state.cart);

  const totalPrice = cart.reduce((sum, item) => sum + item.price * item.count, 0);
  const shippingFee = totalPrice >= 30000 || totalPrice === 0 ? 0 : 3000;
  const finalPrice = totalPrice + shippingFee;

  const [buyerInfo, setBuyerInfo] = useState({
    name: '',
    phone: '',
    address: '',
    detailAddress: ''
  });

  const isFormValid = 
    buyerInfo.name.trim() !== '' && 
    buyerInfo.phone.trim() !== '' && 
    buyerInfo.address.trim() !== '' &&
    cart.length > 0;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBuyerInfo({
      ...buyerInfo,
      [name]: value
    });
  };

  const handlePayment = () => {
    if (window.confirm(`${finalPrice.toLocaleString()}원을 결제하시겠습니까?`)) {
      const orderedItems = [...cart];

      dispatch(clearCart());
      
      toast.success('주문이 완료되었습니다! 🎉', {
        duration: 2000,
        position: 'top-center',
      });
      
      setTimeout(() => {
        toast.dismiss();
        navigate('/orderComplete', { 
          state: { 
            orderId: Date.now(),
            buyerName: buyerInfo.name,
            amount: finalPrice,
            address: `${buyerInfo.address} ${buyerInfo.detailAddress}`,
            items: orderedItems
          } 
        });
      }, 1500);
      
    }
  };

  return (
    <Container className="py-5 checkout-box">
      <Toaster />
      <h4 className="mb-4 text-center">주문 결제</h4>
      <Row>

        <Col md={7}>
          <Card className="p-4 shadow-sm mb-4">
            <h5>배송 정보</h5>
            <Form>

              <Form.Group className="mb-3">
                <Form.Label>받는 분</Form.Label>
                <Form.Control name="name" type="text" placeholder="성함을 입력하세요" onChange={handleChange} />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>연락처</Form.Label>
                <Form.Control name="phone" type="text" placeholder="010-0000-0000" onChange={handleChange} />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>주소</Form.Label>
                <Form.Control name="address" type="text" placeholder="배송지를 입력하세요" className="mb-2" onChange={handleChange} />
                <Form.Control name="detailAddress" type="text" placeholder="상세 주소를 입력하세요" onChange={handleChange} />
              </Form.Group>

            </Form>
          </Card>
        </Col>


        <Col md={5}>
          <Card className="p-3 shadow-sm checkout-rightbox">
            <h5>결제 금액</h5>
            <ListGroup variant="flush" className="my-3">

              <ListGroup.Item className="d-flex justify-content-between">
                <span>총 상품 금액</span>
                <span>{totalPrice.toLocaleString()}원</span>
              </ListGroup.Item>

              <ListGroup.Item className="d-flex justify-content-between">
                <span>배송비</span>
                <span>{shippingFee.toLocaleString()}원</span>
              </ListGroup.Item>

              <ListGroup.Item className="d-flex justify-content-between fw-bold">
                <span>최종 결제 금액</span>
                <span className="text-danger .final-price-amount">{(totalPrice + shippingFee).toLocaleString()}원</span>
              </ListGroup.Item>

            </ListGroup>
            
            <Button 
              variant={isFormValid ? "dark" : "secondary"} 
              size="lg" 
              className="w-100"
              onClick={handlePayment}
              disabled={!isFormValid}
            >
              {isFormValid ? "결제하기" : "배송 정보를 입력해주세요"}
            </Button>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default Checkout;