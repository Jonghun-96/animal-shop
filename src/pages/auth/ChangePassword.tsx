
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { RootState } from '@/store/store';
import { clearUser, changePassword } from '@/store/authSlice';
import { Card, Form, Button, Alert } from 'react-bootstrap';
import { FaLock, FaCheckCircle } from 'react-icons/fa';
import { toast } from 'react-hot-toast';



const ChangePassword = () => {
  const [currentPw, setCurrentPw] = useState("");
  const [newPw, setNewPw] = useState("");
  const [confirmPw, setConfirmPw] = useState("");
  const [error, setError] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();
  

  const { users, loginUser } = useSelector((state: RootState) => state.auth);

  // 현재 로그인된 유저 정보 가져오기
  const currentUser = useSelector((state: RootState) => state.auth.loginUser);

  // 비밀번호 변경 제출 핸들러
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    const me = users.find((u) => u.userId === loginUser?.userId);

    // 1. 유효성 검사: 빈 값 확인
    if (!currentPw || !newPw || !confirmPw) {
      setError("모든 항목을 입력하세요.");
      return;
    }

    // 2. 유효성 검사: 현재 비밀번호가 맞는지 확인 (로컬 데이터 기준)
    // 실제 서버가 있다면 서버에서 확인하겠지만, 여기선 Redux의 users 데이터와 비교 가능합니다.

    if (currentPw !== me.password) {
      setError("현재 비밀번호가 일치하지 않습니다.");
      return;
    }

    if (currentPw === newPw) {
      setError("새 비밀번호는 현재 비밀번호와 다르게 설정해야 합니다.");
      return;
    }

    // 3. 유효성 검사: 새 비밀번호 일치 확인
    if (newPw !== confirmPw) {
      setError("새 비밀번호 확인이 일치하지 않습니다.");
      return;
    }

    // 4. 유효성 검사: 비밀번호 길이 (예: 4자 이상)
    if (newPw.length < 4) {
      setError("비밀번호는 최소 4자 이상이어야 합니다.");
      return;
    }

    // 5. 리덕스 액션 실행 (비밀번호 변경)
    dispatch(changePassword({ userId: loginUser!.userId, newPw }));

    // 6. 보안을 위한 후속 조치: 로그아웃 및 로그인 페이지 이동
    toast.success("비밀번호가 성공적으로 변경되었습니다.");
    navigate('/mypage');
  };

  return (
    <div className="container py-5 d-flex justify-content-center">
      <Card className="shadow-sm border-0" style={{ maxWidth: '450px', width: '100%', borderRadius: '15px' }}>
        <Card.Body className="p-4">
          <div className="text-center mb-4">
            <div className="bg-primary bg-opacity-10 p-3 rounded-circle d-inline-block mb-3">
              <FaLock size={30} className="text-primary" />
            </div>
            <h3 className="fw-bold">비밀번호 변경</h3>
            <p className="text-muted small">안전한 계정 사용을 위해 비밀번호를 변경해주세요.</p>
          </div>

          {error && <Alert variant="danger" className="py-2 small">{error}</Alert>}

          <Form onSubmit={handleSubmit}>
            {/* 현재 비밀번호 확인란 */}
            <Form.Group className="mb-3">
              <Form.Label className="small fw-bold text-secondary">현재 비밀번호</Form.Label>
              <Form.Control 
                type="password" 
                placeholder="현재 비밀번호 입력"
                value={currentPw}
                onChange={(e) => setCurrentPw(e.target.value)}
              />
            </Form.Group>

            <hr className="my-4 text-light" />

            {/* 새 비밀번호 입력 */}
            <Form.Group className="mb-3">
              <Form.Label className="small fw-bold text-secondary">새 비밀번호</Form.Label>
              <Form.Control 
                type="password" 
                placeholder="4자 이상 입력"
                value={newPw}
                onChange={(e) => setNewPw(e.target.value)}
              />
            </Form.Group>

            {/* 새 비밀번호 확인 */}
            <Form.Group className="mb-4">
              <Form.Label className="small fw-bold text-secondary">새 비밀번호 확인</Form.Label>
              <Form.Control 
                type="password" 
                placeholder="새 비밀번호 다시 입력"
                value={confirmPw}
                onChange={(e) => setConfirmPw(e.target.value)}
              />
            </Form.Group>

            <div className="d-grid gap-2">
              <Button variant="primary" type="submit" className="py-2 fw-bold" style={{ borderRadius: '8px' }}>
                비밀번호 변경하기
              </Button>
              <Button variant="link" className="text-muted text-decoration-none small" onClick={() => navigate(-1)}>
                취소하고 돌아가기
              </Button>
            </div>
          </Form>
        </Card.Body>
      </Card>
    </div>
  );
};

export default ChangePassword;