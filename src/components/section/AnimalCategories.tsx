import { Navbar, Nav, Container, Row, Col, Form, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import './AnimalCategories.css'


// 1. 카테고리 폴더의 모든 이미지를 가져옵니다.
const catImages = import.meta.glob('../../images/categories/*.png', { eager: true });

// 2. 경로에서 파일명만 키로 뽑아냅니다.
const images = {};
for (const path in catImages) {
  const fileName = path.split('/').pop().replace('.png', ''); 
  images[fileName] = catImages[path].default;
}


function AnimalCategories() {

  const navigate = useNavigate();

  return(
  <div className='categoryList componentList'>
    <h3>종류별로 보기</h3>

    <Row className='categoriesRow componentRow'>
      <Col onClick={()=>{navigate('/category')}}>
        <img src={images[`all`]} alt="all" />
        <p>전체 동물 보기</p>
      </Col>
      <Col onClick={()=>{navigate('/category/small')}}>
        <img src={images[`small`]} alt="small" />
        <p>소형 동물</p>
      </Col>
      <Col onClick={()=>{navigate('/category/medium')}}>
        <img src={images[`medium`]} alt="medium" />
        <p>중형 동물</p>
      </Col>
      <Col onClick={()=>{navigate('/category/large')}}>
        <img src={images[`large`]} alt="large" />
        <p>대형 동물</p>
      </Col>
      <Col onClick={()=>{navigate('/category/bird')}}>
        <img src={images[`bird`]} alt="bird" />
        <p>새</p>
      </Col>
    </Row>
  </div>
  )
}

export default AnimalCategories;