import { Carousel } from 'react-bootstrap';
import './MallIntro.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';


// 1. 폴더 내 모든 이미지를 객체 형태로 가져옴
const imageModules: any = import.meta.glob('../../images/banner/*.jpg', { eager: true });

// 2. 파일명만 키값으로 갖는 깨끗한 객체로 변환
// 예: { "peacock.png": "/assets/peacock.hash.png", ... }
const images: { [key: string]: string } = {};
for (const path in imageModules) {
  const fileName = path.split('/').pop() || ''; 
  images[fileName] = imageModules[path].default;
}


function MallIntro() {

  const navigate = useNavigate();

  return(
  <>

    <Carousel fade interval={4000}>
      <Carousel.Item onClick={() => navigate('/search?keyword=해')}>
        <img className="d-block w-100 mainImg" src={images[`banner_img1.jpg`]} alt="배너1" />
        <Carousel.Caption>
          <span>해태와 해치, 수호신을 피규어로 재해석하다</span>
        </Carousel.Caption>
      </Carousel.Item>

      <Carousel.Item onClick={() => navigate('/detail/39')}>
        <img className="d-block w-100 mainImg" src={images[`banner_img2.jpg`]} alt="배너2" />
        <Carousel.Caption>
          <span>봄꽃사슴의 우아함을 화사한 봄과 함께 맞이하세요</span>
        </Carousel.Caption>
      </Carousel.Item>

      <Carousel.Item onClick={() => navigate('/detail/38')}>
        <img className="d-block w-100 mainImg" src={images[`banner_img3.jpg`]} alt="배너3" />
        <Carousel.Caption>
          <span>미어캣은 당신이 뭘하든 다~ 지켜봅니다</span>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
    
  </>
  )
}

export default MallIntro;