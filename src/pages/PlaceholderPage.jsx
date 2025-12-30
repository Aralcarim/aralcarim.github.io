import React from 'react';
import Layout from '../layout/Layout';
import { motion } from 'framer-motion';

const PlaceholderPage = ({ title }) => {
    return (
        <Layout>
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                style={{
                    padding: '120px 20px 60px',
                    textAlign: 'center',
                    minHeight: '60vh',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center'
                }}
            >
                <h1 style={{
                    fontFamily: 'var(--font-heading)',
                    fontSize: '3rem',
                    color: 'var(--color-primary)',
                    marginBottom: '20px'
                }}>
                    {title}
                </h1>
                <p style={{ fontSize: '1.2rem', color: '#666', maxWidth: '600px' }}>
                    This is a placeholder page for future content.
                </p>
                <div style={{
                    marginTop: '40px',
                    width: '100px',
                    height: '2px',
                    background: 'var(--color-gold)'
                }}></div>
            </motion.div>
        </Layout>
    );
};

export default PlaceholderPage;
