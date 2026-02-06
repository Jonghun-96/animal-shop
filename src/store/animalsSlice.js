import { createSlice } from '@reduxjs/toolkit';
import { animals } from '../data/data';



const animalsSlice = createSlice({
  name: 'animals',
  initialState: animals,
  reducers: {}
})



export default animalsSlice.reducer; 

export const selectSpecialAnimals = state =>
  state.animals.filter(a => a.isSpecial);

export const selectPopularAnimals = state =>
  [...state.animals].sort((a, b) => b.seedLikes - a.seedLikes);

