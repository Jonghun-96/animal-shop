import { createSlice } from '@reduxjs/toolkit';
import { animals } from '../data/data';



const animalsSlice = createSlice({
  name: 'animals',
  initialState: {
    items: animals 
    },
  reducers: {
    deleteAnimal: (state, action) => {
      state.items = state.items.filter(item => item.id !== action.payload);
    },
    addAnimal: (state, action) => {
      state.items.unshift(action.payload);
    },
    editAnimal: (state, action) => {
      const index = state.items.findIndex(i => i.id === action.payload.id);
      if (index !== -1) {
        state.items[index] = { ...state.items[index], ...action.payload };
      }
    },
    increaseStock: (state, action) => {
      const items = state.items.find(i => i.id === action.payload);
      if (items) items.stock += 1;
    },
    decreaseStock: (state, action) => {
      const items = state.items.find(i => i.id === action.payload);
      if (items && items.stock > 0) {
        items.stock -= 1;
      }
    }
  }
})

export const { deleteAnimal, increaseStock, decreaseStock, addAnimal, editAnimal } = animalsSlice.actions; 
export default animalsSlice.reducer;



export const selectSpecialAnimals = state =>
  state.animals.items.filter(a => a.isSpecial);

export const selectPopularAnimals = state =>
  [...state.animals.items].sort((a, b) => b.seedLikes - a.seedLikes);

