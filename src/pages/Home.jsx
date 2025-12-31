import React from 'react';
import Layout from '../layout/Layout';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import Countdown from '../components/Countdown';

const Home = () => {
    const { t } = useTranslation();

    return (
        <Layout>
            <section className="hero" style={{
                position: 'relative',
                height: 'calc(100vh - 80px)',
                marginTop: '-80px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: 'var(--color-background)'
            }}>

                <style>{`
                    @media (max-width: 768px) {
                        .hero {
                            margin-top: -40px !important;
                        }
                    }
                `}</style>

                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1, delay: 0.5 }}
                    className="hero-content text-center"
                    style={{ position: 'relative', zIndex: 1 }}
                >
                    <p style={{
                        textTransform: 'uppercase',
                        letterSpacing: '5px',
                        fontSize: '1.2rem',
                        marginBottom: '1rem'
                    }}>{t('home.intro')}</p>

                    <h1 style={{
                        fontSize: '4rem',
                        margin: '20px 0',
                        lineHeight: 1.2
                    }}>
                        Cinzia <span className="text-gold">&</span> Vaclav
                    </h1>

                    <div style={{
                        display: 'inline-block',
                        borderTop: '1px solid #333',
                        borderBottom: '1px solid #333',
                        padding: '10px 40px',
                        marginTop: '20px'
                    }}>
                        <p style={{
                            fontSize: '1.5rem',
                            fontWeight: 600,
                            letterSpacing: '2px',
                            margin: 0
                        }}>{t('home.date')}</p>
                        <p style={{
                            fontSize: '1rem',
                            margin: '5px 0 0',
                            textTransform: 'uppercase',
                            letterSpacing: '3px'
                        }}>{t('home.location')}</p>
                    </div>

                    <Countdown />

                </motion.div>
            </section>
        </Layout>
    );
};

export default Home;
