
import { createSlice, PayloadAction } from '@reduxjs/toolkit';


interface UserInfo {
  userId: string;
  role: 'ADMIN' | 'USER';
}


interface AuthState {
  loginUser: UserInfo | null;
}

const initialState: AuthState = {
  loginUser: localStorage.getItem('loginUser')
  ? JSON.parse(localStorage.getItem('loginUser')!)
  : null
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
  },
});


export const { setUser, clearUser } = authSlice.actions;
export default authSlice.reducer;