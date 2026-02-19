import { useState, useEffect } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Navbar, Nav, Container, Row, Col, Form, Button, Modal } from 'react-bootstrap';

import NavBar from './components/layout/NavBar';
import CartButton from './components/cart/CartButton';
import CartModal from './components/cart/CartModal';
import MallIntro from './components/section/MallIntro';
import SpecialAnimals from './components/section/SpecialAnimals';
import PopularAnimals from './components/section/PopularAnimals';
import AnimalCategories from './components/section/AnimalCategories';
import { Route, Routes, useLocation } from 'react-router-dom';
import Detail from './pages/Detail';
import Popular from './pages/Popular';
import Special from './pages/Special';
import Favorite from './pages/Favorite';
import Category from './pages/category/Category';
import StorageSync from './store/storageSync';
import Footer from './components/section/Footer'

import All from './pages/category/All'
import Small from './pages/category/Small'
import Medium from './pages/category/Medium'
import Large from './pages/category/Large'
import Bird from './pages/category/Bird'
import ScrollToTop from './utils/ScrollToTop';
import LoginPage from './pages/auth/LoginPage';
import SignupPage from './pages/auth/SignupPage';

import { getCart, saveCart, clearCartStorage } from './utils/cartStorage';
import { useSelector } from 'react-redux';
import SearchResultList from './components/layout/SearchResultList';
import SearchResultPage from './pages/search/SearchResultPage';


function App() {
  const [count, setCount] = useState(0)


  const [isCartOpen, setIsCartOpen] = useState(false);



  return (
    <>
      <StorageSync />
      <ScrollToTop/>
      <NavBar/>
      <CartButton onClick={()=>{setIsCartOpen(prev => !prev)}}/>
      <CartModal show={isCartOpen} onHide={()=>{setIsCartOpen(false)}} clearCart={clearCartStorage}/>

      <Routes>
        <Route path='/' element={
          <>
            <MallIntro/>
            <SpecialAnimals/>
            <PopularAnimals/>
            <AnimalCategories/>
          </>
        }/>
        <Route path='/special' element={<Special/>}/>
        <Route path='/popular' element={<Popular/>}/>
        <Route path='/detail/:id' element={<Detail/>}/>
        <Route path='/favorite' element={<Favorite/>}/>
        <Route path='/search' element={<SearchResultPage/>}/>

        <Route path='/category' element={<Category/>}>
          <Route index element={<All/>}/>
          <Route path='small' element={<Small/>}/>
          <Route path='medium' element={<Medium/>}/>
          <Route path='large' element={<Large/>}/>
          <Route path='bird' element={<Bird/>}/>
        </Route>

        <Route path='/login' element={<LoginPage/>}/>
        <Route path='/signup' element={<SignupPage/>}/>

        <Route path='/*' element={<div className='not-found'>잘못된 페이지 접근입니다</div>} />
      </Routes>
      <Footer/>

    </>
  )
}


export default App
