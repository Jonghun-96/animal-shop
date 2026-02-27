import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { RootState } from '@/store';
import { deleteAccount } from '@/store/authSlice';
import { toast } from 'react-hot-toast';

const DeleteAccount = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [confirmText, setConfirmText] = useState(""); // 확인 문구 상태 추가
  
  const REQUIRED_TEXT = "탈퇴하겠습니다"; // 요구하는 정확한 문구

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { users, loginUser } = useSelector((state: RootState) => state.auth);

  const handleDeleteSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!loginUser) return;

    // 1. 확인 문구 일치 여부 검사
    if (confirmText !== REQUIRED_TEXT) {
      toast.error(`'${REQUIRED_TEXT}'를 정확히 입력해주세요.`);
      return;
    }

    // 2. 입력한 두 비밀번호 일치 여부 검사
    if (password !== confirmPassword) {
      toast.error("입력하신 두 비밀번호가 일치하지 않습니다.");
      return;
    }

    // 3. 실제 저장된 비밀번호와 대조
    const me = users.find((u) => u.userId === loginUser.userId);
    if (!me || password !== me.password) {
      toast.error("현재 비밀번호가 올바르지 않습니다.");
      return;
    }

    // 4. 최종 컨펌
    if (window.confirm("정말로 탈퇴하시겠습니까? 이 작업은 되돌릴 수 없습니다.")) {
      dispatch(deleteAccount(loginUser.userId));
      toast.success("회원 탈퇴가 완료되었습니다.");
      navigate('/');
    }
  };

  return (
    <div className="container mt-5" style={{ maxWidth: '450px' }}>
      <div className="card shadow p-4 border-0">
        <h3 className="text-center text-danger mb-3">회원 탈퇴 확인</h3>
        <p className="text-muted text-center small mb-4">
          계정 삭제를 위해 비밀번호와 확인 문구를 입력해주세요.
        </p>

        <form onSubmit={handleDeleteSubmit}>
          {/* 비밀번호 입력란 */}
          <div className="mb-3">
            <label className="form-label fw-bold small">비밀번호</label>
            <input
              type="password"
              className="form-control"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label fw-bold small">비밀번호 확인</label>
            <input
              type="password"
              className="form-control"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>

          <hr className="my-4" />

          {/* 확인 문구 입력란 */}
          <div className="mb-4 p-3 bg-light rounded">
            <label className="form-label fw-bold small text-danger">
              확인 문구 입력 (아래 문구를 똑같이 입력하세요)
            </label>
            <div className="text-center mb-2 fw-bold" style={{ letterSpacing: '2px' }}>
              "{REQUIRED_TEXT}"
            </div>
            <input
              type="text"
              className="form-control text-center"
              placeholder="위 문구를 입력하세요"
              value={confirmText}
              onChange={(e) => setConfirmText(e.target.value)}
              required
            />
          </div>

          <button 
            type="submit" 
            className="btn btn-danger w-100 py-2 fw-bold"
            disabled={confirmText !== REQUIRED_TEXT} // 문구가 틀리면 버튼 비활성화 (선택사항)
          >
            본인 확인 및 탈퇴하기
          </button>
          
          <button 
            type="button" 
            className="btn btn-link w-100 text-secondary mt-2 shadow-none"
            onClick={() => navigate(-1)}
          >
            그만두고 돌아가기
          </button>
        </form>
      </div>
    </div>
  );
};

export default DeleteAccount;