import { Link } from 'react-router-dom';
import { Button, Container, Card, Form, Alert } from 'react-bootstrap';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login, setLoginUser, logout } from '@/utils/authService';
import { getLoginUser } from '../../utils/authStorage';
import { useDispatch } from "react-redux";
import { getCart, saveCart } from "../../utils/cartStorage";
import { setCart } from "@/store/cartSlice";
import { setUser } from '@/store/authSlice';
import { useLocation } from "react-router-dom";
import Toast from 'react-bootstrap/Toast';
import './LoginPage.css';
import { toast } from 'react-hot-toast';



function LoginPage(){

  const dispatch = useDispatch();
  const navigate = useNavigate();  
  const [inputId, setInputId] = useState('');
  const [inputPassword, setInputPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";
  const [showToast, setShowToast] = useState(false);
  const [toastMsg, setToastMsg] = useState("");



  const handleLogin = (e) => {
    if (e) e.preventDefault(); 

    const result = login(inputId, inputPassword);

    //  에러 발생 시
    if (!result.success) {
      toast.error(result.message);
      return;
    } 

    // ... (장바구니 병합 로직 동일)
    const userId = inputId;
    const guestCart = getCart();
    const userCart = getCart(userId) || [];
    const mergedCart = [...userCart]; 

    guestCart.forEach(guestItem => {
      const found = mergedCart.find(item => item.id === guestItem.id);
      if (found) { found.count += guestItem.count; } 
      else { mergedCart.push(guestItem); }
    });


    const userData = {
      userId: inputId,
      role: result.role
    };

    dispatch(setUser(userData));
    localStorage.setItem('loginUser', JSON.stringify(userData));

    saveCart(mergedCart, userId);
    localStorage.removeItem("cart_guest");

    // 로그인 성공 시 토스트 호출
    toast.success(`${inputId}님, 환영합니다! 🎉`);

    dispatch(setCart(mergedCart));

    setTimeout(() => {
      if (userData.role === 'ADMIN') {
        navigate('/admin');
      }else{
        navigate(-1);
      }  
    }, 1500); // 토스트를 읽을 시간을 조금 더 줌

  };



  const isDisabled = inputId.trim() === "" || inputPassword.trim() === "";

  useEffect(() => {
    const loginUser = getLoginUser();
    if(loginUser) {
      navigate('/');
    }
  }, [navigate])



  return (
  <div className="d-flex justify-content-center align-items-center min-vh-100">


    <Card style={{ width: "400px" }} className="p-4 shadow">
      <h3 className="text-center mb-4">로그인</h3>

      <Form>
        <Form.Group className="mb-3">
          <Form.Label>아이디</Form.Label>
          <Form.Control
            type="text"
            placeholder="아이디를 입력하세요"
            value={inputId}
            onChange={(e) => setInputId(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>비밀번호</Form.Label>
          <Form.Control
            type="password"
            placeholder="비밀번호를 입력하세요"
            value={inputPassword}
            onChange={(e) => setInputPassword(e.target.value)}
          />
        </Form.Group>

        {errorMsg && (
          <Alert variant="danger" className="mt-2">
            {errorMsg}
          </Alert>
        )}

        <Button
          type="submit"
          variant="dark"
          className="w-100 mt-3"
          onClick={handleLogin}
          disabled={isDisabled}
        >
          로그인
        </Button>
      </Form>

      <p className="text-center mt-3 mb-0">
        계정이 없으신가요?{" "}
        <Link to="/signup" style={{ textDecoration: "none" }}>
          회원가입
        </Link>
      </p>
    </Card>


    <Toast
      className='toast-login'
      show={showToast}
      onClose={() => setShowToast(false)}
      delay={3000}
      autohide
    >
      <Toast.Body>{toastMsg}</Toast.Body>
    </Toast>

  </div>
  
  )
}

export default LoginPage;
