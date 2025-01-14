
import { configureStore } from "@reduxjs/toolkit";
import userReducer from "@/features/userSlice";
import cartReducer from "@/features/cartSlice"


// Create the store
const store = configureStore({
  reducer: {
    user: userReducer,
   cart : cartReducer 
  },
});


export default store;