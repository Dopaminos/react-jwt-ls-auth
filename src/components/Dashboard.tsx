import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './App.css';

const Dashboard: React.FC = () => {
    let token = localStorage.getItem('token');
    let tokenExpiry = new Date(parseInt(localStorage.getItem('tokenExpiry') || '0', 10));

    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('tokenExpiry');
        navigate('/login');
    };

    const handleRegenerateToken = () => {
        // ре-генерация токена
        token = Math.random().toString(36);
        tokenExpiry = new Date(new Date().getTime() + 3600 * 1000); 
        localStorage.setItem('token', token);
        localStorage.setItem('tokenExpiry', tokenExpiry.getTime().toString());
    };

    const checkTokenExpiry = () => {
        if (!token || new Date() > tokenExpiry) {
            handleRegenerateToken();
        }
    };

    useEffect(() => {
        const interval = setInterval(() => {
            checkTokenExpiry();
        }, 60000); 

        return () => clearInterval(interval);
    }, []); // 

    return (
        <div className="container">
            <h2>Dashboard</h2>
            <div className="dashboard-info">
                <h3>Account Info</h3>
                <p>Token: {token}</p>
                <p>Token Expiry: {tokenExpiry.toString()}</p>
            </div>
            <button onClick={handleRegenerateToken}>Regenerate Token</button>
            <button onClick={handleLogout}>Logout</button>
        </div>
    );
};

export default Dashboard;