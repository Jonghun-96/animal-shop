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

  const allOrders = JSON.parse(localStorage.getItem('petbit_orders') || '[]');
  const currentOrder = allOrders[allOrders.length - 1] || {};
  const checkoutItems = currentOrder.items || [];
  const totalPrice = currentOrder.amount || 0;

  
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
    console.log("1. 결제 버튼 클릭됨"); // 로그 찍히는지 확인
    console.log("현재 정보:", { finalPrice, buyerInfo, checkoutItems });

    if (window.confirm(`${finalPrice.toLocaleString()}원을 결제하시겠습니까?`)) {
      console.log("2. 확인창 승인됨");

      try {
        // 혹시 여기서 cart가 정의 안 되어 있을 수 있으니 checkoutItems를 활용하세요!
        const orderedItems = [...checkoutItems]; 

        const allOrders = JSON.parse(localStorage.getItem('petbit_orders') || '[]');
        
        if (allOrders.length > 0) {
          const lastIndex = allOrders.length - 1;
          allOrders[lastIndex] = {
            ...allOrders[lastIndex],
            buyerName: buyerInfo.name,
            address: `${buyerInfo.address} ${buyerInfo.detailAddress}`,
            amount: finalPrice,
            status: 'completed',
            date: new Date().toLocaleString()
          };
          
          localStorage.setItem('petbit_orders', JSON.stringify(allOrders));
          console.log("3. 스토리지 저장 성공");
        }

        dispatch(clearCart());
        console.log("4. 장바구니 비우기 성공");
        
        toast.success('주문이 완료되었습니다! 🎉');
        
        setTimeout(() => {
          console.log("5. 페이지 이동 시도");
          navigate('/orderComplete', { state: allOrders[allOrders.length - 1] });
        }, 1500);

      } catch (error) {
        console.error("결제 처리 중 에러 발생:", error);
      }
    } else {
      console.log("결제 취소됨");
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
            <h5>결제 정보</h5>
            

            <div className="order-summary-container">
              {checkoutItems.map((item: any) => (
                <div key={item.id} className="checkout-item-row">
                  {/* 1. 이미지 */}
                  <img 
                    src={item.image || item.img} 
                    alt={item.name} 
                    className="checkout-item-img" 
                  />
                  
                  {/* 2. 상품명 (중앙 정렬 효과) */}
                  <div className="checkout-item-name">
                    {item.name}
                  </div>

                  {/* 3. 수량 */}
                  <div className="checkout-item-count">
                    {item.count || 1}개
                  </div>

                  {/* 4. 가격 (오른쪽 정렬) */}
                  <div className="checkout-item-price">
                    {(item.price * (item.count || 1)).toLocaleString()}원
                  </div>
                </div>
              ))}
            </div>

            <div className="py-3 bg-white">
              {/* 총 상품 금액 */}
              <div className="d-flex justify-content-between px-4 py-2">
                <span className="text-muted">총 상품 금액</span>
                <span className="fw-medium text-dark">{totalPrice.toLocaleString()}원</span>
              </div>

              {/* 배송비 */}
              <div className="d-flex justify-content-between px-4 py-2">
                <span className="text-muted">배송비</span>
                <span className="fw-medium text-dark">{shippingFee.toLocaleString()}원</span>
              </div>

              {/* 구분선 (필요하면 넣으세요) */}
              <div className="mx-4 my-2 border-top" style={{ opacity: 0.1 }}></div>

              {/* 최종 결제 금액 */}
              <div className="d-flex justify-content-between px-4 py-3 align-items-center">
                <span className="fw-bold fs-5">최종 결제 금액</span>
                <span className="fw-bold text-danger fs-4">
                  {(totalPrice + shippingFee).toLocaleString()}원
                </span>
              </div>
            </div>
            
            <Button 
            variant={isFormValid ? "dark" : "secondary"} 
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