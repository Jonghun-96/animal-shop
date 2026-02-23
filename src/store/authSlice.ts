
import { createSlice, PayloadAction } from '@reduxjs/toolkit';


interface AuthState {
  loginUser: string | null;
}

const initialState: AuthState = {
  loginUser: localStorage.getItem('loginUser'),
};


const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser(state, action: PayloadAction<string>) {
      state.loginUser = action.payload;
    },
    clearUser(state) {
      state.loginUser = null;
    },
  },
});


export const { setUser, clearUser } = authSlice.actions;
export default authSlice.reducer;