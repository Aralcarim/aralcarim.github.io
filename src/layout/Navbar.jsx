import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import LanguageSwitcher from '../components/LanguageSwitcher';
import { motion, AnimatePresence } from 'framer-motion';
import './Navbar.css';

const Navbar = () => {
    const { t } = useTranslation();
    const [isOpen, setIsOpen] = useState(false);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const location = useLocation();

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 50) {
                setScrolled(true);
            } else {
                setScrolled(false);
            }
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navLinks = [
        { name: t('nav.home'), path: '/' },
        { name: t('nav.story'), path: '/story' },
        { name: t('nav.events'), path: '/events' },
        { name: t('nav.rsvp'), path: '/rsvp' },
        { name: t('nav.faq'), path: '/faq' },
        { name: t('nav.travel'), path: '/travel' },
        { name: t('nav.things_to_know'), path: '/things-to-know' },
        { name: t('nav.things_to_do'), path: '/things-to-do' },
        { name: t('nav.registry'), path: '/registry' },
    ];

    const moreLinks = [
        { name: t('nav.gallery'), path: '/gallery' },
        { name: t('nav.dress_code'), path: '/dress-code' },
        { name: t('nav.map'), path: '/map' },
        { name: t('nav.contact'), path: '/contact' }
    ];

    return (
        <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
            {/* Fluid container for more space */}
            <div className="container-fluid nav-container" style={{ padding: '0 30px' }}>
                <Link to="/" className="nav-logo" style={{ marginRight: '20px' }}>
                    Cinzia <span className="text-gold">&</span> Vaclav
                </Link>

                <div className={`nav-menu ${isOpen ? 'active' : ''}`}>
                    <div className="mobile-language-switcher">
                        <LanguageSwitcher />
                    </div>
                    {navLinks.map((link) => (
                        <Link
                            key={link.path}
                            to={link.path}
                            className={`nav-link ${location.pathname === link.path ? 'active' : ''}`}
                            onClick={() => setIsOpen(false)}
                            style={{ fontSize: '0.8rem', letterSpacing: '1px' }} // Reduce size slightly for fit
                        >
                            {link.name}
                        </Link>
                    ))}

                    <div
                        className="nav-link dropdown-trigger"
                        onMouseEnter={() => setIsDropdownOpen(true)}
                        onMouseLeave={() => setIsDropdownOpen(false)}
                        style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '5px' }}
                    >
                        {t('nav.more')} <span style={{ fontSize: '0.6rem' }}>▼</span>

                        <AnimatePresence>
                            {isDropdownOpen && (
                                <motion.div
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: 10 }}
                                    transition={{ duration: 0.2 }}
                                    className="dropdown-menu"
                                    style={{ minWidth: '150px' }}
                                >
                                    {moreLinks.map((link) => (
                                        <Link
                                            key={link.path}
                                            to={link.path}
                                            className="dropdown-item"
                                            onClick={() => {
                                                setIsOpen(false);
                                                setIsDropdownOpen(false);
                                            }}
                                        >
                                            {link.name}
                                        </Link>
                                    ))}
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </div>

                <div className="nav-controls">
                    <div className="desktop-lang-switcher">
                        <LanguageSwitcher />
                    </div>
                    <div className={`hamburger ${isOpen ? 'open' : ''}`} onClick={() => setIsOpen(!isOpen)}>
                        <span className="bar"></span>
                        <span className="bar"></span>
                        <span className="bar"></span>
                    </div>
                </div>

                <style>{`
                    .mobile-language-switcher {
                        display: none;
                        width: 100%;
                        padding: 10px 0;
                        border-bottom: 1px solid var(--color-gold);
                        margin-bottom: 10px;
                    }
                    .mobile-language-switcher .lang-switcher {
                        margin-left: 0;
                        justify-content: center;
                    }
                    .desktop-lang-switcher {
                        display: flex;
                        align-items: center;
                    }
                    .nav-controls {
                        display: flex;
                        align-items: center;
                        gap: 15px;
                    }
                    @media (max-width: 768px) {
                        .mobile-language-switcher {
                            display: block;
                        }
                        .desktop-lang-switcher {
                            display: none !important;
                        }
                        .nav-controls {
                            gap: 0 !important;
                        }
                    }
                `}</style>
            </div>
        </nav>
    );
};

export default Navbar;
