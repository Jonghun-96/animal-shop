import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signup } from '../../utils/authService';
import { Button, Container, Card, Form } from 'react-bootstrap';
import './SignupPage.css';


const MIN_ID_LENGTH = 4;
const MIN_PW_LENGTH = 4;
const ID_REGEX = /^[a-zA-Z0-9]+$/;


function SignupPage(){

  const navigate = useNavigate();
  const [userId, setUserId] = useState('');
  const [password, setPassword] = useState('');
  const [showPw, setShowPw] = useState(false);

  const isIdLengthValid = userId.length >= MIN_ID_LENGTH;
  const isIdRegexValid = ID_REGEX.test(userId);
  const isPwValid = password.length >= MIN_PW_LENGTH;

  const isFormValid =
    userId &&
    password &&
    isIdLengthValid &&
    isIdRegexValid &&
    isPwValid;


  const handleSignUp = () => {
    const result = signup(userId, password);

    if (!result || !result.success) {
      alert(result?.message || '회원가입에 실패했습니다');
      return;
    }

    alert('회원가입 완료! 로그인 페이지로 이동합니다.');
    navigate('/login');
  };


  return (
<>
  <div className="d-flex justify-content-center align-items-center min-vh-100">
    <Card style={{ width: "400px" }} className="p-4 shadow">
      <h3 className="text-center mb-3">회원가입</h3>

      <p className="text-center text-muted mb-4">
        가입할 아이디와 비밀번호를 입력하세요
      </p>

      <Form>
        {/* 아이디 */}
        <Form.Group className="mb-3">
          <div className="d-flex justify-content-between align-items-center">
            <Form.Label className="mb-1">아이디</Form.Label>

            {userId && !isIdRegexValid && (
              <small className="text-danger">
                영문/숫자만 가능
              </small>
            )}

            {userId && !isIdLengthValid && isIdRegexValid && (
              <small className="text-danger">
                {MIN_ID_LENGTH}자 이상
              </small>
            )}
          </div>

          <Form.Control
            type="text"
            placeholder="아이디"
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
            isInvalid={userId !== "" && (!isIdRegexValid || !isIdLengthValid)}
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
          onClick={handleSignUp}
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
