import { useLocation, useNavigate } from 'react-router-dom';
import { Container, Card, Button, ListGroup } from 'react-bootstrap';
import { CheckCircleFill } from 'react-bootstrap-icons';
import './OrderComplete.css';


function OrderComplete() {
  const location = useLocation();
  const navigate = useNavigate();
  
  // 결제 페이지에서 보낸 데이터 받기
  const orderData = location.state;

  // 만약 데이터 없이 이 페이지에 직접 접속했다면 메인으로 튕겨내기
  if (!orderData) {
    return (
      <Container className="py-5 text-center">
        <h4>잘못된 접근입니다.</h4>
        <Button onClick={() => navigate('/')}>메인으로 가기</Button>
      </Container>
    );
  }

  return (
    <Container className="py-5 d-flex justify-content-center">
      <Card className="p-4 shadow-sm border-0 ordercomplete-box" style={{ maxWidth: '500px', width: '100%' }}>
        <div className="text-center mb-4">
          <CheckCircleFill size={60} color="#198754" className="mb-3" />
          <h2 className="fw-bold ordertext">주문이 완료되었습니다!</h2>
          <p className="text-muted">귀하의 주문이 성공적으로 접수되었습니다.</p>
        </div>

        <Card className="bg-light border-0 mb-4">
          <Card.Body className='ordercomplete-textbox'>
            <h6 className="fw-bold mb-3 ordertext">주문 정보</h6>
            <ListGroup variant="flush" className="bg-transparent">

              {orderData.items.map((item: any) => (
                <ListGroup.Item key={item.id} className='d-flex justify-content-between align-items-center'>
                  <div>

                    <div className="fw-medium text-muted">
                      {item.name} 
                    </div>

                    <div className="text-muted small">{item.count}개</div>
                  </div>
                  <span>{(item.price * item.count).toLocaleString()}원</span>
                </ListGroup.Item>
              ))}

              <ListGroup.Item className="d-flex justify-content-between bg-transparent px-0">
                <span>주문 번호</span>
                <span className="fw-medium">{orderData.orderId}</span>
              </ListGroup.Item>

              <ListGroup.Item className="d-flex justify-content-between bg-transparent px-0">
                <span>주문자</span>
                <span className="fw-medium">{orderData.buyerName}</span>
              </ListGroup.Item>

              <ListGroup.Item className="d-flex justify-content-between bg-transparent px-0">
                <span>결제 금액</span>
                <span className="fw-bold text-danger order-price">{orderData.amount.toLocaleString()}원</span>
              </ListGroup.Item>

              <ListGroup.Item className="bg-transparent px-0">
                <div className="d-flex justify-content-between mb-1">
                  <span>배송지</span>
                </div>
                <div className="text-muted small text-end">{orderData.address}</div>
              </ListGroup.Item>

            </ListGroup>
          </Card.Body>
        </Card>

        <div className="d-grid gap-2">
          <Button variant="dark" size="lg" onClick={() => navigate('/')}>
            쇼핑 계속하기
          </Button>
          <Button variant="outline-secondary" onClick={() => window.print()}>
            주문 영수증 출력
          </Button>
        </div>
      </Card>
    </Container>
  );
}

export default OrderComplete;