import React from 'react';
import Layout from '../layout/Layout';
import { motion } from 'framer-motion';
import { useTranslation, Trans } from 'react-i18next';
import Countdown from '../components/Countdown';
import './Home.css';

const Home = () => {
    const { t } = useTranslation();

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
                        <p className="home-location">{t('home.location')}</p>
                    </div>

                    <Countdown />

                </motion.div>
            </section>
        </Layout>
    );
};

export default Home;
