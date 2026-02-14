import { Route, Routes, Link, useNavigate, Outlet } from 'react-router-dom';
import { Navbar, Nav, Container, Row, Col, Form, Button } from 'react-bootstrap';
import { animals } from '../../data/data';
import AnimalCard from '../../components/common/AnimalCard';
import AnimalListPage from '../AnimalListPage';



function Small({ likes, count }) {


  const small = animals.filter(a => a.category === 'small');


  return(
    
  <>
    <AnimalListPage 
      animals={small}
      title="작은 친구"
      likes={likes}
      showMore={true}
      initialCount={8}
    />
  </>
    
  )
}

export default Small;