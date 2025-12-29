import React from 'react';
import Layout from '../layout/Layout';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';

const Story = () => {
    const { t } = useTranslation();

    return (
        <Layout>
            <div className="container" style={{ padding: '40px 20px' }}>
                <div style={{ maxWidth: '800px', margin: '0 auto' }}>
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center"
                    >
                        <h1 style={{ fontSize: '3rem', marginBottom: '2rem' }}>{t('story.title')}</h1>
                        <img
                            src="/assets/couple.png"
                            alt="Vaclav and Cinzia"
                            style={{
                                width: '100%',
                                maxHeight: '500px',
                                objectFit: 'cover',
                                borderRadius: '8px',
                                marginBottom: '2rem',
                                boxShadow: '0 10px 30px rgba(0,0,0,0.1)'
                            }}
                        />
                    </motion.div>

                    <div style={{ fontSize: '1.1rem', lineHeight: 1.8 }}>
                        <motion.p
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            transition={{ delay: 0.2 }}
                            style={{ marginBottom: '20px' }}>
                            {t('story.p1')}
                        </motion.p>
                        <motion.p
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            transition={{ delay: 0.3 }}
                            style={{ marginBottom: '20px' }}>
                            {t('story.p2')}
                        </motion.p>
                        <motion.p
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            transition={{ delay: 0.4 }}
                        >
                            {t('story.p3')}
                        </motion.p>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default Story;
