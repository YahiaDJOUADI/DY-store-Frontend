import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  token: null, // Add token to the initial state
  isAuthenticated: false,
  error: null,
  loading: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login(state, action) {
      state.user = action.payload.user; // Assuming payload contains user data
      state.token = action.payload.token; // Store the token
      state.isAuthenticated = true;
      state.error = null;
      state.loading = false;
    },
    logout(state) {
      state.user = null;
      state.token = null; // Clear the token on logout
      state.isAuthenticated = false;
      state.error = null;
      state.loading = false;
    },
    setUser(state, action) {
      state.user = action.payload;
    },
    setToken(state, action) {
      state.token = action.payload; // Add a reducer to set the token
    },
  },
});

export const { login, logout, setUser, setToken } = userSlice.actions;
export default userSlice.reducer;