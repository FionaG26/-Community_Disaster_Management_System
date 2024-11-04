// src/userSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    userInfo: null,
    isLoggedIn: false,
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        login: (state, action) => {
            state.userInfo = action.payload; // Set user info
            state.isLoggedIn = true; // Update login status
        },
        logout: (state) => {
            state.userInfo = null; // Clear user info
            state.isLoggedIn = false; // Update login status
        },
    },
});

// Export actions for use in components
export const { login, logout } = userSlice.actions;

// Export the reducer to be included in the store
export default userSlice.reducer;
