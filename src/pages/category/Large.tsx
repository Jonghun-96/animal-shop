import { Route, Routes, Link, useNavigate, Outlet } from 'react-router-dom';
import { Navbar, Nav, Container, Row, Col, Form, Button } from 'react-bootstrap';
import { animals } from '../../data/data';
import AnimalCard from '../../components/common/AnimalCard';
import AnimalListPage from '../AnimalListPage';



function Large({ likes }) {


  const large = animals.filter(a => a.category === 'large');


  return(
    
  <>
    <AnimalListPage 
      animals={large}
      title="덩치 큰 친구"
      likes={likes}
      showMore={true}
      initialCount={8}
    />
  </>
    
  )
}

export default Large;