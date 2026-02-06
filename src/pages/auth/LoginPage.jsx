import { Link } from 'react-router-dom';
import { Container, Card, Form, Button } from 'react-bootstrap';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login, setLoginUser, logout } from '../../utils/authService';
import { getLoginUser } from '../../utils/authStorage';


function LoginPage(){

  const navigate = useNavigate();  
  const [inputId, setInputId] = useState('');
  const [inputPassword, setInputPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const handleLogin = () => {
    const result = login(inputId, inputPassword)
    if(result.success) {
      navigate('/')
    } else {
      setErrorMsg(result.message);
    }
  }

  useEffect(() => {
    const loginUser = getLoginUser();
    if(loginUser) {
      navigate('/');
    }
  }, [navigate])

  return (
  <>
    <input 
      placeholder="아이디" 
      value={inputId}
      onChange={(e) => setInputId(e.target.value)} 
    />
    <input 
      type="password" 
      placeholder="비밀번호" 
      value={inputPassword}
      onChange={(e) => setInputPassword(e.target.value)}
    />
    <button onClick={handleLogin}>로그인</button>

    {errorMsg && <p>{errorMsg}</p>}

    <p>
      계정이 없으신가요?{' '}
      <Link to="/signup">회원가입</Link>
    </p>
  </>
  )
}

export default LoginPage;
