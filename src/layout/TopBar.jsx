import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';

const TopBar = () => {
    const { t } = useTranslation();
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    return (
        <div style={{
            backgroundColor: '#333',
            color: '#fff',
            padding: '10px 0',
            fontSize: '0.9rem',
            position: 'relative',
            zIndex: 1100
        }}>
            <div className="container" style={{
                display: 'flex',
                justifyContent: 'flex-end',
                padding: '0 20px',
                position: 'relative'
            }}>
                <div
                    style={{ position: 'relative', cursor: 'pointer' }}
                    onMouseEnter={() => setIsDropdownOpen(true)}
                    onMouseLeave={() => setIsDropdownOpen(false)}
                >
                    <span style={{
                        textTransform: 'uppercase',
                        letterSpacing: '1px',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '5px'
                    }}>
                        {t('topbar.menu')} <span style={{ fontSize: '0.7rem' }}>▼</span>
                    </span>

                    <AnimatePresence>
                        {isDropdownOpen && (
                            <motion.div
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                transition={{ duration: 0.2 }}
                                style={{
                                    position: 'absolute',
                                    top: '100%',
                                    right: 0,
                                    backgroundColor: '#fff',
                                    color: '#333',
                                    boxShadow: '0 5px 15px rgba(0,0,0,0.1)',
                                    borderRadius: '4px',
                                    minWidth: '200px',
                                    padding: '10px 0',
                                    marginTop: '10px'
                                }}
                            >
                                {[1, 2, 3, 4, 5].map((num) => (
                                    <Link
                                        key={num}
                                        to={`/extra-${num}`}
                                        style={{
                                            display: 'block',
                                            padding: '10px 20px',
                                            textDecoration: 'none',
                                            color: '#333',
                                            transition: 'background 0.2s',
                                            borderBottom: num < 5 ? '1px solid #eee' : 'none'
                                        }}
                                        onMouseOver={(e) => e.target.style.background = '#f9f9f9'}
                                        onMouseOut={(e) => e.target.style.background = 'transparent'}
                                    >
                                        {t(`topbar.item${num}`)}
                                    </Link>
                                ))}
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </div>
    );
};

export default TopBar;
