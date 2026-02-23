import { createSlice } from '@reduxjs/toolkit';
import { getCart, saveCart } from '../utils/cartStorage';

const cartSlice = createSlice({
  name: 'cart',
  initialState: getCart() ?? [],
  reducers: {

    setCart(state, action) {
      return action.payload; 
    },

    addToCart(state, action) {
      const item = action.payload;
      const found = state.find(i => i.id === item.id);
      if (found) {
        found.count += 1;
      } else {
        state.push({ ...item, count: 1 });
      }

      saveCart(state); 
    },

    clearCart(state){
      saveCart([]);
      return [];
    },

    removeFromCart(state, action) {
      const updated = state.filter(i => i.id !== action.payload);
      saveCart(updated);
      return updated;
    },

    increaseCount(state, action) {
      const found = state.find(i => i.id === action.payload);
      if (found) {
        found.count += 1;
        saveCart(state);
      }
    },
    
    decreaseCount(state, action) {
      const found = state.find(i => i.id === action.payload);
      if (found) {
        found.count -= 1;
        saveCart(state);
      }
    },    
    
  }
});

export const { addToCart, setCart, increaseCount, decreaseCount, removeFromCart, clearCart } = cartSlice.actions;
export default cartSlice.reducer;