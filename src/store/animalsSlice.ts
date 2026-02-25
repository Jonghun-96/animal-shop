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
    }
  }
})

export const { deleteAnimal } = animalsSlice.actions; 
export default animalsSlice.reducer;



export const selectSpecialAnimals = state =>
  state.animals.items.filter(a => a.isSpecial);

export const selectPopularAnimals = state =>
  [...state.animals.items].sort((a, b) => b.seedLikes - a.seedLikes);

