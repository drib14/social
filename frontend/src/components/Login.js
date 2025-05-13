// components/Login.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleLogin = () => {
        // Simulate successful login (replace with actual API call)
        if (email && password) {
            localStorage.setItem('authToken', 'fakeToken');
            navigate('/');
        } else {
            alert('Please fill out all fields');
        }
    };

    return (
        <div className="login-container">
            <h2>Login</h2>
            <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
            <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <button onClick={handleLogin}>Login</button>
            <p>Don't have an account? <a href="/register">Register here</a></p>
        </div>
    );
};

export default Login;
