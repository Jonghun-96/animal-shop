import { createSlice } from '@reduxjs/toolkit';
import { getCart } from '../utils/cartStorage';


const cartSlice = createSlice({
  name: 'cart',
  initialState: getCart(),
  reducers: {

    addToCart(state, action){
      const item = action.payload;
      const found = state.find(i => i.id === item.id);

      if(found){
        found.count += 1;
      }else{
        state.push({...item, count: 1})
      }
    },

    increaseCount(state, action){
      const id = action.payload;
      const found = state.find(i => i.id === id);

      if(found){
        found.count += 1;
      }
    },

    decreaseCount(state, action){
      const id = action.payload;
      const found = state.find(i => i.id === id);

      if(!found) return;
      if(found.count > 1){
        found.count -= 1;
      }
    },

    removeFromCart(state, action){
      const id = action.payload;

      return state.filter(i => i.id !== id)
    },

    clearCart(){
      return [];
    }

  }
})



export default cartSlice.reducer;

export const { addToCart, increaseCount, decreaseCount, removeFromCart, clearCart } = cartSlice.actions;
