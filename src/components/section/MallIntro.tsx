import { Carousel } from 'react-bootstrap';
import './MallIntro.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';


function MallIntro() {

  const navigate = useNavigate();

  return(
  <>

    <Carousel fade interval={4000}>
      <Carousel.Item onClick={() => navigate('/search?keyword=해')}>
        <img className="d-block w-100 mainImg" src="/images/banner/banner_img1.jpg" alt="배너1" />
        <Carousel.Caption>
          <span>해태와 해치, 수호신을 피규어로 재해석하다</span>
        </Carousel.Caption>
      </Carousel.Item>

      <Carousel.Item onClick={() => navigate('/detail/55')}>
        <img className="d-block w-100 mainImg" src="/images/banner/banner_img2.jpg" alt="배너2" />
        <Carousel.Caption>
          <span>봄꽃사슴의 우아함을 화사한 봄과 함께 맞이하세요</span>
        </Carousel.Caption>
      </Carousel.Item>

      <Carousel.Item onClick={() => navigate('/detail/38')}>
        <img className="d-block w-100 mainImg" src="/images/banner/banner_img3.jpeg" alt="배너3" />
        <Carousel.Caption>
          <span>미어캣은 당신이 뭘하든 다~ 지켜봅니다</span>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
    
  </>
  )
}

export default MallIntro;