
import ChangePassword from '@/pages/auth/ChangePassword';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';


interface UserInfo {
  userId: string;
  role: 'ADMIN' | 'USER';
}


interface AuthState {
  loginUser: UserInfo | null;
  users: UserInfo[];
}

const dummyUsers = [
  { userId: 'Chulsoo', role: 'USER', status: 'active' },
  { userId: 'dog_lover', role: 'USER', status: 'active' },
  { userId: 'cat_master', role: 'USER', status: 'banned' }, 
  { userId: 'bye_bye', role: 'USER', status: 'active' },
  { userId: 'minji', role: 'USER', status: 'withDrawn' },
];

const savedLoginUser = localStorage.getItem('loginUser');
const savedUsers = localStorage.getItem('users');

const initialState: AuthState = {
  loginUser: savedLoginUser ? JSON.parse(savedLoginUser) : null,

  users: savedUsers ? JSON.parse(savedUsers) : dummyUsers
};


if (!savedUsers) {
  localStorage.setItem('users', JSON.stringify(dummyUsers));
}




const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {

    addUser(state, action: PayloadAction<UserInfo>) {

      state.users.push(action.payload);
      
      localStorage.setItem('users', JSON.stringify(state.users));
    },

    setUser(state, action: PayloadAction<UserInfo>) {
      state.loginUser = action.payload;
    },
    
    clearUser(state) {
      state.loginUser = null;
    },

    deleteAccount(state, action: PayloadAction<string>) {
      const targetId = action.payload;
      
      state.users = state.users.map(user => 
        user.userId === targetId ? { ...user, status: 'withDrawn' } : user
      );
      localStorage.setItem('users', JSON.stringify(state.users));

      if (state.loginUser?.userId === targetId) {
        state.loginUser = null;
        localStorage.removeItem('loginUser');
      }
    },

    changePassword(state, action) {

      const { userId, newPw } = action.payload; 
      const currentUserId = state.loginUser?.userId;

      if (currentUserId) {
        const userToUpdate = state.users.find(u => u.userId === currentUserId);
      
        if (userToUpdate) {
          // 2. 객체가 아닌 '문자열(newPw)'만 대입합니다.
          userToUpdate.password = newPw; 

          // 3. 스토리지 저장
          localStorage.setItem('users', JSON.stringify(state.users));
        }
      }
    },

    updateUserStatus(state, action) {

      const { userId, status, isActive } = action.payload;
      const userToUpdate = state.users.find((u) => u.userId === userId);

      if (userToUpdate) {
      
        userToUpdate.status = status;

        localStorage.setItem('petbit_users', JSON.stringify(state.users));
      }
    }

  },
});


export const { addUser, setUser, clearUser, deleteAccount, changePassword, updateUserStatus } = authSlice.actions;
export default authSlice.reducer;