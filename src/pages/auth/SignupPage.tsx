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

    <h3 className="text-center signup-text">회원 가입</h3>
    <Container className="d-flex justify-content-center align-items-center vh-100">
      <Card style={{ width: '400px' }}>
        <Card.Body>
          <p className="text-center mb-4">
            가입할 아이디와 비밀번호를 입력하세요
          </p>

          <Form>
            {/* 아이디 */}
            <Form.Group className="mb-2">
              <Form.Control
                placeholder="아이디"
                proven
                value={userId}
                onChange={(e) => setUserId(e.target.value)}
              />
            </Form.Group>

            {userId && !isIdRegexValid && (
              <small className="text-danger d-block mb-1">
                아이디는 영문과 숫자만 사용할 수 있습니다
              </small>
            )}

            {userId && !isIdLengthValid && isIdRegexValid && (
              <small className="text-danger d-block mb-1">
                아이디는 {MIN_ID_LENGTH}자 이상이어야 합니다
              </small>
            )}

            {/* 비밀번호 */}
            <Form.Group className="mb-2">
              <Form.Control
                type={showPw ? 'text' : 'password'}
                placeholder="비밀번호"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </Form.Group>

            {password && !isPwValid && (
              <small className="text-danger d-block mb-2">
                비밀번호는 {MIN_PW_LENGTH}자 이상이어야 합니다
              </small>
            )}

            <Form.Check
              type="checkbox"
              label="비밀번호 보기"
              className="mb-3"
              checked={showPw}
              onChange={() => setShowPw(!showPw)}
            />

            <Button
              className="w-100"
              disabled={!isFormValid}
              onClick={handleSignUp}
            >
              회원 가입
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  </>
  )
}

export default SignupPage;
