import { Navbar, Nav, Container, Row, Col, Form, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import './AnimalCategories.css'


function AnimalCategories() {

  const navigate = useNavigate();

  return(
    <div className='categoryList componentList'>
    <h3>종류별로 보기</h3>

    <Row className='categoriesRow componentRow'>
      <Col onClick={()=>{navigate('/category')}}>전체 동물 보기</Col>
      <Col onClick={()=>{navigate('/category/small')}}>작은 친구</Col>
      <Col onClick={()=>{navigate('/category/medium')}}>중형 친구</Col>
      <Col onClick={()=>{navigate('/category/large')}}>덩치 큰 친구</Col>
      <Col onClick={()=>{navigate('/category/bird')}}>날개 달린 친구</Col>
    </Row>
  </div>
  )
}

export default AnimalCategories;