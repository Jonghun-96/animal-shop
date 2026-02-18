import { createSlice } from '@reduxjs/toolkit';
import { animals } from '../data/data';
import { getLikes } from '../utils/likesStorage';



const initialState = getLikes() ??
  animals.reduce((acc, animal) => {
    acc[animal.id] = animal.seedlikes;
    return acc;
  }, {});


const likesSlice = createSlice({
  name: 'likes',
  initialState,
  reducers: {

    toggleLike(state, action){
      const id = action.payload;
      if(state[id]){
        delete state[id];
      }else{
        state[id] = 1;
      }
    }
  }
})


export const { toggleLike } = likesSlice.actions;
export default likesSlice.reducer;
