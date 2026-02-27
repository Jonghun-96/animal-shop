import { configureStore, createSlice, PayloadAction } from '@reduxjs/toolkit'


let orderSlice = createSlice({
  name: 'orders',
  initialState: [],
  reducers: {

    addOrder(state, action) {
      
      state.unshift(action.payload);
    },
    updateStatus: (state, action: PayloadAction<{id: number; status: string}>) => {
      const { id, status } = action.payload;
      const order = state.items.find(item => item.id === id);
      if (order) {
        order.status = status;
      }
    }
  }
})


export let { addOrder } = orderSlice.actions;
export default orderSlice.reducer;