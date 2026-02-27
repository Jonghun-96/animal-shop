import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Form, Button, Row, Col, Card, Table } from 'react-bootstrap';
import { deleteAnimal, animalsSlice, increaseStock, decreaseStock, addAnimal, editAnimal } from '@/store/animalsSlice';





const ProductManager = () => {

  const [name, setName] = useState('');
  const [price, setPrice] = useState(0); 
  const [stock, setStock] = useState(0); 
  const [editingId, setEditingId] = useState(null);
  const [editData, setEditData] = useState({ name: '', price: 0, stock: 0 });

  const handleAdd = (e) => {
    e.preventDefault();
    if (!name || price === '' || stock === '') return alert('모든 정보를 입력해주세요!');

    const newItem = {
      id: Date.now(),
      name: name,
      price: Number(price),
      stock: Number(stock),
      // 이미지를 안 넣어도 랜덤하게 부여 (고양이/강아지 랜덤 서비스 사용)
      img: `https://loremflickr.com/200/200/animal?lock=${Date.now() % 1000}`
    };

    dispatch(addAnimal(newItem));
    
    // 입력창 초기화
    setName(''); setPrice(''); setStock('');
  };



  const products = useSelector((state) => state.animals.items);
  const sortedProducts = [...products].sort((a, b) => b.id - a.id);

  const dispatch = useDispatch();

  const onDelete = (id) => {
    if(window.confirm("정말 이 아이를 목록에서 지울까요? 😢")) {
      dispatch(deleteAnimal(id));
    }
  };

  return (
    <Form onSubmit={handleAdd} className="bg-body p-4 shadow-sm rounded">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h4 className="fw-bold m-0">📦 상품 데이터 관리</h4>

        <Card className="border-0 shadow-sm mb-4">
          <Card.Body>
            <Row className="align-items-end g-2">

              <Col md={4}>
                <Form.Label className="small fw-bold">동물 이름</Form.Label>
                <Form.Control value={name} onChange={(e) => setName(e.target.value)} placeholder="예: 판다" />
              </Col>

              <Col md={3}>
                <Form.Label className="small fw-bold">가격</Form.Label>
                <Form.Control type="text" value={price} onChange={(e) => setPrice(e.target.value)} />
              </Col>

              <Col md={2}>
                <Form.Label onSubmit={handleAdd} className="small fw-bold">재고</Form.Label>
                <Form.Control 
                type="number" 
                value={stock} 
                onChange={(e) => setStock(e.target.value)} 
                onKeyDown={(e) => {
                  if (e.key === 'Enter') handleAdd();
                }}/>
              </Col>

              <Col md={3} className="d-grid">
                <Button type="submit" variant="dark">추가</Button>
              </Col>
            </Row>
          </Card.Body>
        </Card>

      </div>

      <Table hover responsive className="align-middle">
        <thead className="table-body">
          <tr>
            <th>ID</th>
            <th>상품 정보</th>
            <th>가격</th>
            <th>재고</th>
            <th>작업</th>
          </tr>
        </thead>

        <tbody>
          
          {sortedProducts.map((item) => (
            <tr key={item.id}>

              <td>{item.id}</td>
              
              <td>
                <div className="d-flex align-items-center">
                  <img src={item.img} alt="" style={{ width: '40px', marginRight: '10px', borderRadius: '4px' }} />
                  
                  {editingId === item.id ? (
                    <Form.Control 
                      size="sm"
                      autoFocus 
                      value={editData.name} 
                      onChange={(e) => setEditData({ ...editData, name: e.target.value })}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                          dispatch(editAnimal(editData));
                          setEditingId(null);
                        } else if (e.key === 'Escape') {
                          setEditingId(null);
                        }
                      }}
                    />
                  ) : (
                    <span className="fw-bold">{item.name}</span>
                  )}
                </div>
              </td>
              
              <td>
                {editingId === item.id ? (
                  <Form.Control 
                    type="text"
                    size="sm"
                    value={editData.price} 
                    onChange={(e) => setEditData({ ...editData, price: Number(e.target.value) })}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        dispatch(editAnimal(editData));
                        setEditingId(null);
                      } else if (e.key === 'Escape') {
                        setEditingId(null);
                      }
                    }}                    
                  />
                ) : (
                  <>{item.price?.toLocaleString()}원</>
                )}
              </td>

              <td>
                <div className="d-flex align-items-center gap-2">

                  <button 
                    type='button'
                    className="btn btn-sm btn-outline-secondary"
                    onClick={() => dispatch(increaseStock(item.id))}
                  > + </button> 

                  <div style={{ width: '60px', textAlign: 'center' }}>
                    {item.stock >= 5 && <span className="badge bg-success">{item.stock}개</span>}
                    {item.stock < 5 && item.stock > 0 && <span className="badge bg-warning text-dark">{item.stock}개</span>}
                    {item.stock === 0 && <span className="badge bg-danger">품절</span>}
                  </div>

                  <button 
                    type='button'
                    className="btn btn-sm btn-outline-secondary"
                    onClick={() => dispatch(decreaseStock(item.id))}
                  > - </button>    

                </div>
              </td>

              <td>
                <Button 
                onClick={() => { setEditingId(item.id); setEditData(item); }} 
                variant="outline-primary" 
                size="sm" 
                className="me-1">수정</Button>
                <Button variant="outline-danger" size="sm" onClick={() => onDelete(item.id)}>삭제</Button>
              </td>
            </tr>
          ))}

        </tbody>
      </Table>
    </Form>
  );
};

export default ProductManager;