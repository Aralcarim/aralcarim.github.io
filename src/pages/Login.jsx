import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useTranslation } from 'react-i18next';
import Layout from '../layout/Layout';
import './Login.css';

const Login = () => {
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const { login } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const { t } = useTranslation();

    const from = location.state?.from?.pathname || '/';

    const handleSubmit = (e) => {
        e.preventDefault();
        if (login(password)) {
            navigate(from, { replace: true });
        } else {
            // Use a translation key if available, otherwise hardcode for now or simple message
            setError('Incorrect password');
        }
    };

    return (
        <Layout>
            <div className="login-container">
                <div className="login-card">
                    <h1>{t('login.title', 'Welcome')}</h1>
                    <p>{t('login.description', 'Please enter the password to access the wedding details.')}</p>

                    <form onSubmit={handleSubmit} className="login-form">
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Password"
                            className="login-input"
                        />
                        {error && <p className="login-error">{error}</p>}
                        <button type="submit" className="login-button">
                            {t('login.submit', 'Enter')}
                        </button>
                    </form>
                </div>
            </div>
        </Layout>
    );
};

export default Login;
