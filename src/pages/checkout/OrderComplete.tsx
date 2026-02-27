import { useLocation, useNavigate } from 'react-router-dom';
import { Container, Card, Button, ListGroup } from 'react-bootstrap';
import { CheckCircleFill } from 'react-bootstrap-icons';
import './OrderComplete.css';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { addOrder } from '@/store/orderSlice';


function OrderComplete() {

  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  console.log("현재 location.state 전체:", location.state);
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

  useEffect(() => {
    // 1. 데이터가 없거나 이미 저장 로직이 실행되었다면 중단
    if (!orderData) return;

    // 2. 로컬스토리지에서 기존 주문 목록 가져오기 (없으면 빈 배열)
    const savedOrders = JSON.parse(localStorage.getItem('petbit_orders') || '[]');

    // 3. 중복 저장 방지: 현재 주문 번호가 이미 스토리지에 있는지 확인
    const isAlreadySaved = savedOrders.some((order: any) => order.orderId === orderData.orderId);

    if (!isAlreadySaved) {
      // 4. 새 주문 객체 생성 (현재 날짜 추가)
      const newOrder = {
        ...orderData,
        date: new Date().toLocaleString(), // 주문 날짜 기록
      };

      // 5. 기존 배열에 추가 후 로컬스토리지 저장
      const updatedOrders = [newOrder, ...savedOrders]; // 최신 주문이 위로 오게 저장
      localStorage.setItem('petbit_orders', JSON.stringify(updatedOrders));

      // 6. (선택사항) 여기서 Redux dispatch를 날려주면 리덕스 상태도 바로 업데이트.
      dispatch(addOrder(newOrder));
    }
  }, [orderData]);



  return (
    <Container className="py-5 d-flex justify-content-center">
      <Card className="p-4 shadow-sm border-0 ordercomplete-box" style={{ maxWidth: '500px', width: '100%' }}>
        <div className="text-center mb-4">
          <CheckCircleFill size={60} color="#198754" className="mb-3" />
          <h2 className="fw-bold ordertext">주문이 완료되었습니다!</h2>
          <p className="text-muted">귀하의 주문이 성공적으로 접수되었습니다.</p>
        </div>

        <Card className="bg-light border-0 mb-4 ordercompletelist">
          
          <Card.Body className='ordercomplete-textbox p-0'> 
            {/* 1. 제목 영역 */}
            <h6 className="fw-bold px-4 py-3 mb-0 border-bottom ordertext">주문 정보</h6>
            
            {/* 2. [수정된 부분] 상품 리스트 영역 - 여기서부터 넣으세요! */}
            <div className="py-2 border-bottom"> 
              {orderData.items.map((item: any) => (
                <div 
                  key={item.id} 
                  className="d-flex justify-content-between align-items-center px-4 py-3" 
                  style={{ borderBottom: '1px solid rgba(0,0,0,0.05)' }}
                >
                  <div style={{ flex: 1 }}>
                    <div className="fw-bold text-dark" style={{ fontSize: '1rem' }}>
                      {item.name}
                    </div>
                    <div className="text-muted small">{item.count}개</div>
                  </div>
                  <div className="fw-bold text-dark" style={{ minWidth: '100px', textAlign: 'right' }}>
                    {(item.price * item.count).toLocaleString()}원
                  </div>
                </div>
              ))}
            </div>
            {/* 3. 여기까지 상품 리스트 끝! */}

            {/* 4. 하단 주문 상세 정보 (주문자, 금액 등) */}
            <div className="px-4 py-4">
              <div className="d-flex justify-content-between mb-3">
                <span className="text-muted">주문 번호</span>
                <span className="fw-medium">{orderData.orderId}</span>
              </div>

              <div className="d-flex justify-content-between mb-3">
                <span className="text-muted">주문자</span>
                <span className="fw-medium">{orderData.buyerName}</span>
              </div>

              <div className="d-flex justify-content-between mb-3">
                <span className="text-muted">결제 금액</span>
                <span className="fw-bold text-danger fs-5">{orderData.amount.toLocaleString()}원</span>
              </div>

              <div className="border-top pt-3">
                <div className="text-muted mb-1">배송지</div>
                <div className="fw-medium text-end w-100">{orderData.address}</div>
              </div>
            </div>
          </Card.Body>

          
        </Card>

        <div className="d-grid gap-2">
          <Button variant="dark" size="lg" onClick={() => navigate('/')}>
            홈으로 이동
          </Button>
          <Button variant="dark" size="lg" onClick={() => navigate('/mypage')}>
            마이페이지로 이동
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