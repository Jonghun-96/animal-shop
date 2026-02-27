import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Table, Badge, Button, Row, Col, Card, Form } from 'react-bootstrap';

const OrderManager = () => {
  // 1. 옵셔널 체이닝(?.)과 기본값([])을 사용하여 에러 방지
  const orders = useSelector((state) => state.orders?.items || []); 
  const dispatch = useDispatch();
  
  const [filter, setFilter] = useState('전체');

  // orders가 배열인지 확실히 체크
  const filteredOrders = orders.filter(order => {
    if (filter === '전체') return true;
    return order.status === filter;
  });

  const handleStatusChange = (orderId, newStatus) => {
    // 실제 액션 함수명으로 교체 필요 (예: updateStatus)
    // dispatch({ type: 'orders/updateStatus', payload: { id: orderId, status: newStatus } });
    console.log(`${orderId}번 상태 변경: ${newStatus}`);
  };

  return (
    <div className="p-4">
      <h4 className="fw-bold mb-4">🛒 주문 내역 관리</h4>

      <Row className="mb-4 g-3">
        <Col md={3}>
          <Card className="text-center border-0 shadow-sm bg-primary text-white">
            <Card.Body>
              <div className="small">전체 주문</div>
              <h3 className="fw-bold">{orders?.length || 0}건</h3>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3}>
          <Card className="text-center border-0 shadow-sm bg-warning text-dark">
            <Card.Body>
              <div className="small">배송 대기</div>
              <h3 className="fw-bold">
                {orders?.filter(o => o.status === '대기').length || 0}건
              </h3>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Card className="border-0 shadow-sm">
        <Card.Header className="bg-body py-3 d-flex justify-content-between align-items-center">
          <span className="fw-bold">주문 목록</span>
          <Form.Select 
            size="sm" 
            style={{ width: '150px' }}
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          >
            <option value="전체">전체 보기</option>
            <option value="대기">대기</option>
            <option value="배송중">배송중</option>
            <option value="완료">완료</option>
          </Form.Select>
        </Card.Header>
        
        <Table hover responsive className="mb-0 align-middle text-center">
          <thead className="table-body">
            <tr>
              <th>주문번호</th>
              <th>주문자</th>
              <th>상품명</th>
              <th>결제금액</th>
              <th>상태</th>
              <th>관리</th>
            </tr>
          </thead>
          <tbody>
            {filteredOrders.length > 0 ? (
              filteredOrders.map((order) => (
                <tr key={order.id}>
                  <td className="text-muted small">#{order.id}</td>
                  <td className="fw-bold">{order.customer}</td>
                  <td>{order.itemName}</td>
                  <td>{(order.totalPrice || 0).toLocaleString()}원</td>
                  <td>
                    <Badge bg={
                      order.status === '완료' ? 'secondary' : 
                      order.status === '배송중' ? 'info' : 'warning'
                    }>
                      {order.status}
                    </Badge>
                  </td>
                  <td>
                    <div className="d-flex justify-content-center gap-1">
                      <Button 
                        variant="outline-dark" 
                        size="sm"
                        onClick={() => handleStatusChange(order.id, '배송중')}
                        disabled={order.status !== '대기'}
                      >출고</Button>
                      <Button 
                        variant="outline-success" 
                        size="sm"
                        onClick={() => handleStatusChange(order.id, '완료')}
                        disabled={order.status === '완료'}
                      >완료</Button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="py-5 text-muted">주문 내역이 없습니다.</td>
              </tr>
            )}
          </tbody>
        </Table>
      </Card>
    </div>
  );
};

export default OrderManager;