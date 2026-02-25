import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Table, Button, Badge } from 'react-bootstrap';
import { deleteAnimal, animalsSlice } from '@/store/animalsSlice'; // 삭제 액션이 있다면 임포트



const ProductManager = () => {
  const products = useSelector((state) => state.animals.items);
  const dispatch = useDispatch();

  const onDelete = (id) => {
    if(window.confirm("정말 이 아이를 목록에서 지울까요? 😢")) {
      dispatch(deleteAnimal(id));
    }
  };

  return (
    <div className="bg-white p-4 shadow-sm rounded">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h4 className="fw-bold m-0">📦 상품 데이터 관리</h4>
        <Button variant="dark" size="sm">+ 새 상품 추가</Button>
      </div>

      <Table hover responsive className="align-middle">
        <thead className="table-light">
          <tr>
            <th>ID</th>
            <th>상품 정보</th>
            <th>가격</th>
            <th>재고</th>
            <th>작업</th>
          </tr>
        </thead>
        <tbody>
          {products.map((item) => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>
                <div className="d-flex align-items-center">
                  <img src={item.img} alt="" style={{ width: '40px', marginRight: '10px' }} />
                  <span className="fw-bold">{item.name}</span>
                </div>
              </td>
              <td>{item.price?.toLocaleString()}원</td>
              <td>
                <Badge bg={item.stock > 0 ? "success" : "danger"}>
                  {item.stock > 0 ? `${item.stock}개` : "품절"}
                </Badge>
              </td>
              <td>
                <Button variant="outline-primary" size="sm" className="me-1">수정</Button>
                <Button variant="outline-danger" size="sm" onClick={() => onDelete(item.id)}>삭제</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default ProductManager;