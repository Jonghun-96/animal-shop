import { Route, Routes, Link, useNavigate, Outlet } from 'react-router-dom';
import { Navbar, Nav, Container, Row, Col, Form, Button } from 'react-bootstrap';
import { animals } from '../../data/data';
import './All.css'
import AnimalListPage from '../AnimalListPage';


function All({ likes }) {

  // const [visibleCount, setVisibleCount] = useState(12);
  // const totalCount = animals.length;
  

  return(
    
  <>
    <AnimalListPage 
      animals={animals}
      title="전체 동물 보기"
      likes={likes}
      showMore={true}
      initialCount={8}
    />
  </>
    
  )
}

export default All;