
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

const initialState: AuthState = {
  loginUser: localStorage.getItem('loginUser')
  ? JSON.parse(localStorage.getItem('loginUser')!)
  : null,

  users: localStorage.getItem('users')
    ? JSON.parse(localStorage.getItem('users')!)
    : []
};


const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser(state, action: PayloadAction<UserInfo>) {
      state.loginUser = action.payload;
    },
    clearUser(state) {
      state.loginUser = null;
    },
    deleteAccount(state, action: PayloadAction<string>) {
      const targetId = action.payload;
      
      state.users = state.users.map(user => 
        user.userId === targetId ? { ...user, isActive: false } : user
      );
      localStorage.setItem('users', JSON.stringify(state.users));

      if (state.loginUser?.userId === targetId) {
        state.loginUser = null;
        localStorage.removeItem('loginUser');
      }
    },
    changePassword(state, action) {

      const { newPw } = action.payload; 
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
    }

  },
});


export const { setUser, clearUser, deleteAccount, changePassword } = authSlice.actions;
export default authSlice.reducer;