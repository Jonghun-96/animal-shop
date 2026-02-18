import { Link } from 'react-router-dom';
import { Button, Container, Card, Form, Alert } from 'react-bootstrap';
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
          type="button"
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
  </div>
  )
}

export default LoginPage;
