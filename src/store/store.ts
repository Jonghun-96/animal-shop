import { configureStore } from '@reduxjs/toolkit';
import animalsReducer from './animalsSlice';
import likesReducer from './likesSlice';
import cartReducer from './cartSlice';
import themeReducer from './themeSlice';





export default configureStore({
  reducer: {
    animals: animalsReducer,
    likes: likesReducer,
    cart: cartReducer,
    theme: themeReducer
  }
}) 