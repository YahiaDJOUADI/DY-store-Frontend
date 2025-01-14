import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [], 
  totalCount: 0, 
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    setCart: (state, action) => {
      state.items = action.payload.products || [];
      state.totalCount = action.payload.products.reduce(
        (total, item) => total + (item.quantity || 0),
        0
      );
    },
    clearCart: (state) => {
      state.items = [];
      state.totalCount = 0;
    },
  },
});

export const { setCart, clearCart } = cartSlice.actions;
export default cartSlice.reducer;