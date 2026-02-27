import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import './AdminPage.css';
import { useState } from 'react';
import ProductManager from './ProductManager';
import OrderManager from './OrderManager'; 
// import UserManager from './UserManager';
// import StatManager from './StatManager';


const AdminPage = () => {

  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.user);
  const [view, setView] = useState('main');
  const products = useSelector((state: any) => state.animals.items) || [];


  useEffect(() => {

    if (user === undefined) return; 


    const savedUser = JSON.parse(localStorage.getItem('loginUser'));
    const currentRole = user?.role || savedUser?.role;


    if (!user || user.role.toUpperCase() !== 'ADMIN') {
      alert('접근 권한이 없습니다.');
      navigate('/');
    }
  }, [user, navigate]);


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
          <div className="col-md-3">
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
          <div className="col-md-3">
            <div 
            className="card p-4 shadow-sm h-100 border-0 bg-body text-center" 
            onClick={() => setView('orders')} 
            style={{cursor:'pointer'}}>
              <h1 className="display-4">📋</h1>
              <h4 className="fw-bold">주문 관리</h4>
              <p className="text-muted">새 주문 : 2건</p>
              <button className="btn btn-success w-100">확인하기</button>
            </div>
          </div>

          {/* 회원 관리 카드 */}
          <div className="col-md-3">
            <div className="card p-4 shadow-sm h-100 border-0 bg-body text-center" 
            onClick={() => setView('users')} 
            style={{cursor:'pointer'}}>
              <h1 className="display-4">👥</h1>
              <h4 className="fw-bold">회원 관리</h4>
              <p className="text-muted">가입 유저 : 15명</p>
              <button className="btn btn-warning w-100">권한설정</button>
            </div>
          </div>

          {/* 매출 통계 카드 */}
          <div className="col-md-3">
            <div 
            className="card p-4 shadow-sm h-100 border-0 bg-body text-center" 
            onClick={() => setView('stats')} 
            style={{cursor:'pointer'}}>
              <h1 className="display-4">📊</h1>
              <h4 className="fw-bold">매출 통계</h4>
              <p className="text-muted">이번 주 분석</p>
              <button className="btn btn-info text-white w-100">분석하기</button>
            </div>
          </div>
        </div>
      )}

      {/* [CASE 2: 각 세부 관리 화면] */}
      {view === 'products' && <ProductManager />}
      {view === 'orders' && <OrderManager/>}
      {view === 'users' && <div className="p-5 bg-white shadow rounded">회원 관리 준비 중...</div>}
      {view === 'stats' && <div className="p-5 bg-white shadow rounded">통계 분석 준비 중...</div>}

    </div>
  );
};

export default AdminPage;