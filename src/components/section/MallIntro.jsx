import { Navbar, Nav, Container, Row, Col, Form, Button } from 'react-bootstrap';
import { images } from '@/assets/images/images.js'
import './MallIntro.css';

function MallIntro() {
  return(
  <>
    <div className='topBanner'>
      <img src={images.hihi} className='mainImg'/>
      <span>지금 바로 동물피규어 친구들을 만나보세요</span>
    </div>
    

  </>
  )
}

export default MallIntro;