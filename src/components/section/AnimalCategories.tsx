import { Navbar, Nav, Container, Row, Col, Form, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import './AnimalCategories.css'


function AnimalCategories() {

  const navigate = useNavigate();

  return(
    <div className='categoryList componentList'>
    <h3>종류별로 보기</h3>

    <Row className='categoriesRow componentRow'>
      <Col onClick={()=>{navigate('/category')}}>
        <img src='/images/categories/all.png' alt="all" />
        <p>전체 동물 보기</p>
      </Col>
      <Col onClick={()=>{navigate('/category/small')}}>
        <img src='/images/categories/small.png' alt="small" />
        <p>소형 동물</p>
      </Col>
      <Col onClick={()=>{navigate('/category/medium')}}>
        <img src='/images/categories/medium.png' alt="medium" />
        <p>중형 동물</p>
      </Col>
      <Col onClick={()=>{navigate('/category/large')}}>
        <img src='/images/categories/large.png' alt="large" />
        <p>대형 동물</p>
      </Col>
      <Col onClick={()=>{navigate('/category/bird')}}>
        <img src='/images/categories/bird.png' alt="bird" />
        <p>새</p>
      </Col>
    </Row>
  </div>
  )
}

export default AnimalCategories;