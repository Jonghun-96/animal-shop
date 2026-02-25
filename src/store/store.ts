import { configureStore } from "@reduxjs/toolkit";
import animalsReducer from "./animalsSlice";
import likesReducer from "./likesSlice";
import cartReducer from "./cartSlice";
import themeReducer from "./themeSlice";
import authReducer from "./authSlice";
import wishlistReducer from "./wishlistSlice";
import orderReducer from "./orderSlice";


export const store = configureStore({
  reducer: {
    animals: animalsReducer,
    likes: likesReducer,
    cart: cartReducer,
    theme: themeReducer,
    auth: authReducer,
    wishlist: wishlistReducer,
    order: orderReducer
  },
});


export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;