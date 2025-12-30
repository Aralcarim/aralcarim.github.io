import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';

const DisclaimerModal = () => {
    const { t } = useTranslation();
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        const hasSeenDisclaimer = localStorage.getItem('seenDisclaimer');
        if (!hasSeenDisclaimer) {
            // Small delay to not be jarring
            const timer = setTimeout(() => {
                setIsOpen(true);
            }, 1000);
            return () => clearTimeout(timer);
        }
    }, []);

    const handleClose = () => {
        setIsOpen(false);
        localStorage.setItem('seenDisclaimer', 'true');
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    style={{
                        position: 'fixed',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        backgroundColor: 'rgba(0, 0, 0, 0.5)',
                        zIndex: 2000,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        padding: '20px'
                    }}
                >
                    <motion.div
                        initial={{ scale: 0.9, y: 20 }}
                        animate={{ scale: 1, y: 0 }}
                        exit={{ scale: 0.9, y: 20 }}
                        style={{
                            backgroundColor: '#fff',
                            padding: '40px',
                            borderRadius: '8px',
                            maxWidth: '500px',
                            textAlign: 'center',
                            boxShadow: '0 10px 30px rgba(0,0,0,0.2)'
                        }}
                    >
                        <h2 style={{ fontSize: '1.8rem', color: 'var(--color-text)', marginBottom: '15px' }}>
                            {t('disclaimer.title')}
                        </h2>
                        <p style={{ fontSize: '1.1rem', marginBottom: '30px', lineHeight: 1.6 }}>
                            {t('disclaimer.message')}
                        </p>
                        <button
                            onClick={handleClose}
                            style={{
                                background: 'var(--color-gold)',
                                color: '#fff',
                                border: 'none',
                                padding: '12px 30px',
                                fontSize: '1rem',
                                borderRadius: '4px',
                                cursor: 'pointer',
                                textTransform: 'uppercase',
                                letterSpacing: '1px',
                                fontWeight: 600
                            }}
                        >
                            {t('disclaimer.button')}
                        </button>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default DisclaimerModal;
