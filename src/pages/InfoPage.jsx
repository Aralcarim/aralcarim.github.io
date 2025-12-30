import React from 'react';
import Layout from '../layout/Layout';
import { motion } from 'framer-motion';
import './InfoPage.css';

const InfoPage = ({ title, description, children, imagePlaceholder }) => {
    return (
        <Layout>
            <div className="info-page-container">
                <div className="container" style={{ maxWidth: '800px', padding: '60px 20px' }}>
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="info-header"
                    >
                        {imagePlaceholder && (
                            <div className="info-image-placeholder">
                                {imagePlaceholder}
                            </div>
                        )}
                        <h1 className="info-title">{title}</h1>
                        {description && <p className="info-description">{description}</p>}
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.2 }}
                        className="info-content"
                    >
                        {children}
                    </motion.div>
                </div>
            </div>
        </Layout>
    );
};

export default InfoPage;
