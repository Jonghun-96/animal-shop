import { Route, Routes, Link, useNavigate, Outlet } from 'react-router-dom';
import { Navbar, Nav, Container, Row, Col, Form, Button } from 'react-bootstrap';
import { animals } from '../../data/data';
import AnimalCard from '../../components/common/AnimalCard';
import AnimalListPage from '../AnimalListPage';


function Bird({ likes }) {

  const navigate = useNavigate();
  const bird = animals.filter(a => a.category === 'bird')


  return(
    
  <>
  
    <AnimalListPage 
      animals={bird}
      title="날개 달린 친구"
      likes={likes}
      showMore={true}
      initialCount={8}
    />
  </>
    
  )
}

export default Bird;