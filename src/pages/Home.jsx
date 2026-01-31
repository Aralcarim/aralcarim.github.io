import React, { useState } from 'react';
import Layout from '../layout/Layout';
import { motion } from 'framer-motion';
import { useTranslation, Trans } from 'react-i18next';
import { useAuth } from '../context/AuthContext';
import Countdown from '../components/Countdown';
import RecommendedSections from '../components/RecommendedSections';
import './Home.css';

const Home = () => {
    const { t } = useTranslation();
    const { isAuthenticated, login } = useAuth();
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleLogin = (e) => {
        e.preventDefault();
        if (login(password)) {
            setError('');
            setPassword('');
        } else {
            setError(t('home.password_prompt.error'));
        }
    };

    return (
        <Layout>
            <section className="home-hero">
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1, delay: 0.5 }}
                    className="home-hero-content"
                >
                    <p className="home-intro">{t('home.intro')}</p>

                    <h1 className="home-title">
                        <Trans i18nKey="home.names" components={{ span: <span className="text-gold" /> }} />
                    </h1>

                    <div className="home-divider">
                        <p className="home-date">{t('home.date')}</p>
                        <p className="home-location">
                            {isAuthenticated ? t('home.location') : "Apulia, Italy"}
                        </p>
                    </div>

                    {!isAuthenticated && (
                        <div className="home-password-container">
                            <p className="home-password-text">{t('home.password_prompt.text')}</p>
                            <form onSubmit={handleLogin} className="home-password-form">
                                <input
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder={t('home.password_prompt.placeholder')}
                                    className="home-password-input"
                                />
                                <button type="submit" className="home-password-button">
                                    {t('home.password_prompt.button')}
                                </button>
                            </form>
                            {error && <p className="home-password-error">{error}</p>}
                        </div>
                    )}

                    {isAuthenticated && <RecommendedSections />}

                    <Countdown />

                </motion.div>
            </section>
        </Layout>
    );
};

export default Home;
