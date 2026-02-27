import { useState, useEffect } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Toaster } from 'react-hot-toast';
import NavBar from './components/layout/NavBar';
import CartButton from './components/cart/CartButton';
import CartModal from './components/cart/CartModal';
import MallIntro from './components/section/MallIntro';
import SpecialAnimals from './components/section/SpecialAnimals';
import PopularAnimals from './components/section/PopularAnimals';
import AnimalCategories from './components/section/AnimalCategories';
import { Route, Routes, useLocation, Navigate } from 'react-router-dom';
import Detail from './pages/shop/Detail';
import Popular from './pages/shop/Popular';
import Special from './pages/shop/Special';
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
import MyPage from './pages/account/MyPage';
import Checkout from './pages/checkout/Checkout'

import OrderComplete from './pages/checkout/OrderComplete';
import AdminPage from './pages/admin/AdminPage';
import { useDispatch } from 'react-redux';
import { deleteAccount, setUser } from '@/store/authSlice';
import { setCart } from "@/store/cartSlice";
import ChangePassword from './pages/auth/ChangePassword';
import DeleteAccount from './pages/auth/DeleteAccount';



function App() {
  const [count, setCount] = useState(0)
  const dispatch = useDispatch();
  const [isCartOpen, setIsCartOpen] = useState(false);

  useEffect(() => {
    const savedUser = localStorage.getItem('loginUser');
    
    if (savedUser) {
      const parsedUser = JSON.parse(savedUser);
      dispatch(setUser(parsedUser)); 
      
      const userCart = getCart(parsedUser.userId);
      dispatch(setCart(userCart));
    }
  }, []);



  const AdminRoute = ({ children }) => {
    const loginUser = useSelector((state) => state.auth?.loginUser); 

    //  로그인을 안 했거나(null), 아이디가 'admin'이 아니면 튕겨내기
    if (!loginUser || loginUser.role !== 'ADMIN') {
      alert("관리자만 접근 가능합니다!");
      return <Navigate to="/login" replace />;
    }

    //  관리자('admin')라면 통과
    return children;
  };



  return (
    <>
      <Toaster containerStyle={{top: 100}}/>
      <StorageSync />
      <ScrollToTop/>
      <NavBar/>
      <CartButton onClick={()=>{setIsCartOpen(prev => !prev)}}/>
      <CartModal show={isCartOpen} onHide={()=>{setIsCartOpen(false)}} clearCartStorage={clearCartStorage}/>

      <Routes>

        <Route path='/' element={
          <>
            <MallIntro/>
            <SpecialAnimals/>
            <PopularAnimals/>
            <AnimalCategories/>
          </>
        }/>

        <Route path='/admin' element={
          <AdminRoute>
            <AdminPage />
          </AdminRoute>
        }/>

        <Route path='/mypage' element={<MyPage/>}/>
        <Route path='/checkout' element={<Checkout/>}/>
        <Route path='/orderComplete' element={<OrderComplete/>}/>
        <Route path='/special' element={<Special/>}/>
        <Route path='/popular' element={<Popular/>}/>
        <Route path='/detail/:id' element={<Detail/>}/>
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
        <Route path='/changePassword' element={<ChangePassword/>}/>
        <Route path='/deleteAccount' element={<DeleteAccount/>}/>

        <Route path='/*' element={<div className='not-found'>잘못된 페이지 접근입니다</div>} />
      </Routes>
      <Footer/>

    </>
  )
}


export default App
