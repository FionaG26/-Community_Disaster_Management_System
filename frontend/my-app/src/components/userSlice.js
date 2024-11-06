// src/userSlice.js
import { createSlice } from '@reduxjs/toolkit';

// Initial state
const initialState = {
    userInfo: null,  // Will hold user information when logged in
    isLoggedIn: false,  // Indicates whether the user is logged in
};

// Create the user slice
const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        login: (state, action) => {
            // Update state with user information on login
            state.userInfo = action.payload;
            state.isLoggedIn = true;
        },
        logout: (state) => {
            // Reset state on logout
            state.userInfo = null;
            state.isLoggedIn = false;
        },
    },
});

// Export actions to be used in components
export const { login, logout } = userSlice.actions;

// Export the reducer to be used in the store
export default userSlice.reducer;
