// src/components/UserProfile.js
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { login, logout } from './userSlice';

const UserProfile = () => {
    const dispatch = useDispatch();
    const userInfo = useSelector((state) => state.user.userInfo);
    const isLoggedIn = useSelector((state) => state.user.isLoggedIn);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = () => {
        const userData = { username, password }; // Include password if needed
        dispatch(login(userData));
        setUsername(''); // Clear input after login
        setPassword(''); // Clear input after login
    };

    const handleLogout = () => {
        dispatch(logout());
    };

    return (
        <div>
            {isLoggedIn ? (
                <div>
                    <h2>Welcome, {userInfo.username}</h2>
                    <button onClick={handleLogout}>Logout</button>
                </div>
            ) : (
                <div>
                    <input 
                        type="text" 
                        value={username} 
                        onChange={(e) => setUsername(e.target.value)} 
                        placeholder="Enter your username" 
                    />
                    <input 
                        type="password" 
                        value={password} 
                        onChange={(e) => setPassword(e.target.value)} 
                        placeholder="Enter your password" 
                    />
                    <button onClick={handleLogin}>Login</button>
                </div>
            )}
        </div>
    );
};

export default UserProfile;
