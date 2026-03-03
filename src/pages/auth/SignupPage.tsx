import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signup } from '../../utils/authService';
import { Button, Container, Card, Form } from 'react-bootstrap';
import './SignupPage.css';
import { toast } from 'react-hot-toast';
import { addUser } from '@/store/authSlice';
import { useDispatch } from 'react-redux';



const MIN_ID_LENGTH = 4;
const MIN_PW_LENGTH = 4;
const ID_REGEX = /^[a-zA-Z0-9]+$/;


function SignupPage(){

  const navigate = useNavigate();
  const [inputId, setInputId] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPw, setShowPw] = useState(false);
  const dispatch = useDispatch();

  

  const isIdLengthValid = inputId.length >= MIN_ID_LENGTH;
  const isIdRegexValid = ID_REGEX.test(inputId);
  const isPwValid = password.length >= MIN_PW_LENGTH;
  const isPwMatch = password === confirmPassword;

  const isFormValid =
    inputId &&
    password &&
    isIdLengthValid &&
    isIdRegexValid &&
    isPwValid&&
    isPwMatch;


  const handleSignUp = (e) => {




    if (e) e.preventDefault();
    const result = signup(inputId, password);

    if (inputId.trim().toLowerCase() === 'admin') {
      toast.error("사용할 수 없는 아이디입니다.");
      return;
    }

    if (!isPwMatch) {
      toast.error("비밀번호가 일치하지 않습니다.");
      return;
    }


    if (!result || !result.success) {
      toast.error(result?.message || '회원가입에 실패했습니다 😢');
      return;
    }

    toast.success('회원가입 완료! 🎉');
    window.location.reload;

    setTimeout(() => {
      navigate('/login');
    }, 1500);
  };


  return (
<>
  <div className="d-flex justify-content-center align-items-center min-vh-100">
    <Card style={{ width: "400px" }} className="p-4 shadow">
      <h3 className="text-center mb-3">회원가입</h3>

      <p className="text-center text-muted mb-4">
        가입할 아이디와 비밀번호를 입력하세요
      </p>

      <Form onSubmit={handleSignUp}>
        {/* 아이디 */}
        <Form.Group className="mb-3">
          <div className="d-flex justify-content-between align-items-center">
            <Form.Label className="mb-1">아이디</Form.Label>

            {inputId && !isIdRegexValid && (
              <small className="text-danger">
                영문/숫자만 가능
              </small>
            )}

            {inputId && !isIdLengthValid && isIdRegexValid && (
              <small className="text-danger">
                {MIN_ID_LENGTH}자 이상
              </small>
            )}
          </div>

          <Form.Control
            type="text"
            placeholder="아이디"
            value={inputId}
            onChange={(e) => setInputId(e.target.value)}
            isInvalid={inputId !== "" && (!isIdRegexValid || !isIdLengthValid)}
          />
        </Form.Group>

        {/* 비밀번호 */}
        <Form.Group className="mb-3">
          <div className="d-flex justify-content-between align-items-center">
            <Form.Label className="mb-1">비밀번호</Form.Label>

            {password && !isPwValid && (
              <small className="text-danger">
                {MIN_PW_LENGTH}자 이상
              </small>
            )}
          </div>

          <Form.Control
            type={showPw ? "text" : "password"}
            placeholder="비밀번호"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            isInvalid={password !== "" && !isPwValid}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <div className="d-flex justify-content-between align-items-center">
            <Form.Label className="mb-1 small fw-bold">비밀번호 확인</Form.Label>
            {confirmPassword && !isPwMatch && (
              <small className="text-danger">비밀번호가 일치하지 않음</small>
            )}
            {confirmPassword && isPwMatch && (
              <small className="text-success">비밀번호 일치 ✨</small>
            )}
          </div>
          <Form.Control
            type={showPw ? "text" : "password"}
            placeholder="비밀번호 재입력"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            isInvalid={confirmPassword !== "" && !isPwMatch}
          />
        </Form.Group>

        <Form.Check
          type="checkbox"
          id="showPwCheck"
          label="비밀번호 보기"
          className="mb-3"
          checked={showPw}
          onChange={(e) => setShowPw(e.target.checked)}
        />

        <Button
          variant="dark"
          className="w-100 mt-2"
          disabled={!isFormValid}
          type="submit"
          
        >
          회원 가입
        </Button>
      </Form>
    </Card>
  </div>
</>
  )
}

export default SignupPage;
