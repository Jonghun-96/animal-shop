import { configureStore, createSlice } from '@reduxjs/toolkit'


let orderSlice = createSlice({
  name: 'orders',
  initialState: [],
  reducers: {

    addOrder(state, action) {
      
      state.unshift(action.payload);
    }
  }
})


export let { addOrder } = orderSlice.actions;
export default orderSlice.reducer;