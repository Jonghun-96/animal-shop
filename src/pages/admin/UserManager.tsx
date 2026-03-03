import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Table, Badge, Button, Form, InputGroup, Card } from 'react-bootstrap';
import { FaSearch, FaUserShield, FaUserEdit, FaLockOpen } from 'react-icons/fa';
import { RootState } from '@/store/store'; 
import { toast } from 'react-hot-toast';
import { updateUserStatus } from '@/store/authSlice';




const UserManager = () => {
  const users = useSelector((state: RootState) => state.auth.users) || [];
  const dispatch = useDispatch();


  const handleToggleStatus = (userId: string, currentStatus: string) => {
    const nextStatus = currentStatus === 'active' ? 'banned' : 'active';
    const confirmMsg = nextStatus === 'banned' 
    ? "이 회원을 정지 처리하시겠습니까?" 
    : "이 회원의 정지를 해제하시겠습니까?";

    if (window.confirm(confirmMsg)) {
      dispatch(updateUserStatus({ 
        userId, 
        status: nextStatus,
        isActive: nextStatus === 'active'
      }));
    }
  };

  return (
  <Table hover responsive className="align-middle border-top">
    <thead className="table-light">
      <tr>
        <th>회원 ID</th>
        <th>상태</th>
        <th className="text-center">계정 관리</th>
      </tr>
    </thead>
    <tbody>
      {users.map((u: any) => {
        const isWithDrawn = u.status === 'withDrawn';
        const isBanned = u.status === 'banned';

        return (
          <tr 
            key={u.userId} 
            style={{ 
              backgroundColor: isWithDrawn ? '#f1f3f5' : 'transparent',
              opacity: isWithDrawn ? 0.5 : 1,
              transition: 'background-color 0.2s'
            }}
          >

            <td className={isWithDrawn ? "text-muted text-decoration-line-through" : "fw-bold"}>
              {u.userId}
            </td>

            <td>
              <Badge bg={u.status === 'active' ? 'success' : isBanned ? 'danger' : 'secondary'}>
                {u.status === 'active' ? '정상' : isBanned ? '정지' : '탈퇴'}
              </Badge>
            </td>

            <td className="text-center">
              {isWithDrawn ? (
                <span className="small text-muted">탈퇴 완료</span>
              ) : (
                <Button
                  size="sm"
                  variant={u.status === 'active' ? "outline-danger" : "success"}
                  style={{ width: '80px' }}
                  onClick={() => handleToggleStatus(u.userId, u.status)}
                >
                  {u.status === 'active' ? '🚫 정지' : '🔓 복구'}
                </Button>
              )}
            </td>
          </tr>
        );
      })}
    </tbody>
  </Table>
  );
};




export default UserManager;