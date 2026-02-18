import { Route, Routes, Link, useNavigate, Outlet } from 'react-router-dom';
import { Navbar, Nav, Container, Row, Col, Form, Button } from 'react-bootstrap';
import { animals } from '../../data/data';
import './All.css'
import AnimalListPage from '../AnimalListPage';


function All({ likes }) {

  

  return(
    
  <>
    <AnimalListPage 
      animals={animals}
      title="전체 동물 보기"
      likes={likes}
      showMore={true}
      initialCount={12}
      enableMore={true} 
    />
  </>
    
  )
}

export default All;