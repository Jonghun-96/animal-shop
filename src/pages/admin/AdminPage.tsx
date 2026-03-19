import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import './AdminPage.css';
import { useState } from 'react';
import ProductManager from './ProductManager';
import OrderManager from './OrderManager'; 
import UserManager from '@/pages/admin/UserManager';






const AdminPage = () => {

  const navigate = useNavigate();
  const user = useSelector((state: any) => state.auth.user);
  const [view, setView] = useState('main');
  const products = useSelector((state: any) => state.animals.items) || [];
  const [orders, setOrders] = useState<any[]>([]);

  const allUsers = useSelector((state: any) => state.auth.users) || [];
  const userCount = allUsers?.length || 0;

  const reduxOrders = useSelector((state: any) => state.order.items || state.order);

  useEffect(() => {
    
    if (reduxOrders && reduxOrders.length > 0) {
      setOrders(reduxOrders);
    } else {
      const savedOrders = localStorage.getItem('petbit_orders');
      if (savedOrders) {
        setOrders(JSON.parse(savedOrders));
      }
    }
  }, [reduxOrders, view]);




  useEffect(() => {
    const savedOrders = localStorage.getItem('petbit_orders');

    if (savedOrders) {
      setOrders(JSON.parse(savedOrders));
    }
  }, [view])



  useEffect(() => {

    if (user === undefined) return; 
    
    const savedUser = JSON.parse(localStorage.getItem('loginUser') || 'null');
    const currentRole = user?.role || savedUser?.role;

    if (!savedUser || savedUser.role?.toUpperCase() !== 'ADMIN') {
      alert('접근 권한이 없습니다.');
      navigate('/');
    }
  }, []);


  return (
    <div className="container mt-5 pb-5">
      {/* 상단 타이틀 & 내비게이션 */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="fw-bold m-0" onClick={() => setView('main')} style={{cursor:'pointer'}}>
          🛠️ 관리자 센터 {view !== 'main' && <small className="text-muted fs-5">| {view.toUpperCase()}</small>}
        </h2>
        {view !== 'main' && (
          <button className="btn btn-outline-dark btn-lg outline-secondary dashboard-btn" onClick={() => setView('main')}>
            🏠 대시보드로 돌아가기
          </button>
        )}
      </div>
      <hr />

      {/* 2. 조건부 렌더링 시스템 */}
      
      {/* [CASE 1: 메인 대시보드] */}
      {view === 'main' && (
        <div className="row g-4">

          {/* 상품 관리 카드 */}
          <div className="col-md-4">
            <div 
            className="card p-4 shadow-sm h-100 border-0 bg-body text-center" 
            onClick={() => setView('products')} 
            style={{cursor:'pointer'}}>
              <h1 className="display-4">📦</h1>
              <h4 className="fw-bold">상품 관리</h4>
              <p className="text-muted">전체 상품 : {products.length}개</p>
              <button className="btn btn-primary w-100">관리하기</button>
            </div>
          </div>

          {/* 주문 관리 카드 */}
          <div className="col-md-4">
            <div 
            className="card p-4 shadow-sm h-100 border-0 bg-body text-center" 
            onClick={() => setView('orders')} 
            style={{cursor:'pointer'}}>
              <h1 className="display-4">📋</h1>
              <h4 className="fw-bold">주문 관리</h4>
              <p className="text-muted">신규 주문 : {orders?.filter(o => o.status === "대기").length || 0}건</p>
              <button className="btn btn-success w-100">확인하기</button>
            </div>
          </div>

          {/* 회원 관리 카드 */}
          <div className="col-md-4">
            <div className="card p-4 shadow-sm h-100 border-0 bg-body text-center" 
            onClick={() => setView('users')} 
            style={{cursor:'pointer'}}>
              <h1 className="display-4">👥</h1>
              <h4 className="fw-bold">회원 관리</h4>
              <p className="text-muted">가입 유저 : {userCount}명</p>
              <button className="btn btn-warning w-100">권한설정</button>
            </div>
          </div>

        </div>
      )}

      {/* [CASE 2: 각 세부 관리 화면] */}
      {view === 'products' && <ProductManager />}
      {view === 'orders' && <OrderManager/>}
      {view === 'users' && <UserManager/>}

    </div>
  );
};

export default AdminPage;