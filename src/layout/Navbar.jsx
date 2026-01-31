import React, { useState, useEffect, useLayoutEffect, useRef } from 'react';
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

    // Consolidate all links
    const [allLinks, setAllLinks] = useState([]);
    const [visibleLinks, setVisibleLinks] = useState([]);
    const [hiddenLinks, setHiddenLinks] = useState([]);
    const navRef = useRef(null);
    const measureRef = useRef(null);

    // Initial links definition
    useEffect(() => {
        const links = [
            { name: t('nav.home'), path: '/' },
            { name: t('nav.story'), path: '/story' },
            { name: t('nav.rsvp'), path: '/rsvp' },
            { name: t('nav.registry'), path: '/registry' },
            { name: t('nav.run_of_show'), path: '/run-of-show' },
            { name: t('nav.faq'), path: '/faq' },
            { name: t('nav.travel'), path: '/travel' },
            { name: t('nav.map'), path: '/map' },
            { name: t('nav.things_to_know'), path: '/things-to-know' },
            { name: t('nav.things_to_do'), path: '/things-to-do' },
            { name: t('nav.gallery'), path: '/gallery' },
            { name: t('nav.contact'), path: '/contact' }
        ];
        setAllLinks(links);
    }, [t]);

    // Calculation logic
    useLayoutEffect(() => {
        const calculateVisibleLinks = () => {
            if (!navRef.current || !measureRef.current) return;

            // Available width in the nav container
            // We need to measure the container's width, but wait, nav-menu is flex. 
            // Better to measure the parent's width available for it?
            // Actually, nav-menu width itself might be constrained by flex.
            // Let's use navRef.current.clientWidth.
            const navWidth = navRef.current.clientWidth;

            // Width of the "More" dropdown trigger (approximate or measured)
            const moreWidth = 100; // Safe margin for "More" + Arrow + Padding

            let currentWidth = 0;
            const visible = [];
            const hidden = [];

            // Get widths of all items from the hidden measure container
            const itemWidths = Array.from(measureRef.current.children).map(child => child.offsetWidth + 15); // +15 for gap

            // First pass: Try to fit everything
            allLinks.forEach((link, index) => {
                const itemWidth = itemWidths[index] || 100;

                if (currentWidth + itemWidth <= navWidth) {
                    visible.push(link);
                    currentWidth += itemWidth;
                } else {
                    hidden.push(link);
                }
            });

            // Second pass: If we have hidden items, check if the visible items + "More" button fit.
            if (hidden.length > 0) {
                // Check if adding the "More" button pushed us over
                // Current width includes all visible items.
                // We need to ensure (currentWidth + moreWidth) <= navWidth

                while (visible.length > 0 && (currentWidth + moreWidth > navWidth)) {
                    const movedItem = visible.pop();
                    hidden.unshift(movedItem);
                    const movedItemWidth = itemWidths[allLinks.indexOf(movedItem)] || 0;
                    currentWidth -= movedItemWidth;
                }
            }

            setVisibleLinks(visible);
            setHiddenLinks(hidden);
        };

        // Run calculation
        calculateVisibleLinks();

        // Re-run on resize
        const resizeObserver = new ResizeObserver(() => {
            calculateVisibleLinks();
        });

        if (navRef.current) {
            resizeObserver.observe(navRef.current);
        }

        return () => resizeObserver.disconnect();
    }, [allLinks, t]);


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


    return (
        <nav className={`navbar ${scrolled ? 'scrolled' : ''} ${isOpen ? 'mobile-open' : ''}`}>
            {/* Fluid container for more space */}
            <div className="container-fluid nav-container" style={{ padding: '0 30px' }}>
                <Link to="/" className="nav-logo" style={{ marginRight: '20px' }}>
                    Cinzia <span className="text-gold">&</span> Vaclav
                </Link>

                {/* Hidden Container for Measuring */}
                <div ref={measureRef} style={{ position: 'absolute', visibility: 'hidden', height: 0, overflow: 'hidden', whiteSpace: 'nowrap', left: '-9999px', top: '-9999px' }}>
                    {allLinks.map((link) => (
                        <span key={link.path} className="nav-link" style={{ display: 'inline-block', margin: 0, padding: 0 }}>{link.name}</span>
                    ))}
                </div>

                <div className={`nav-menu ${isOpen ? 'active' : ''}`} ref={navRef} style={{ overflow: 'visible' }}>
                    {/* Added overflow visible to allow dropdowns to pop out, but we need to handle the content overflow manually via our logic */}
                    {/* Actually, if we set flex-wrap: nowrap in CSS, items will just overflow if we calculate wrong. */}
                    {/* But our logic should prevent that. */}

                    <div className="mobile-language-switcher">
                        <LanguageSwitcher />
                    </div>

                    {window.innerWidth <= 768 ? (
                        allLinks.map((link) => (
                            <Link
                                key={link.path}
                                to={link.path}
                                className={`nav-link ${location.pathname === link.path ? 'active' : ''}`}
                                onClick={() => setIsOpen(false)}
                            >
                                {link.name}
                            </Link>
                        ))
                    ) : (
                        <>
                            {visibleLinks.map((link) => (
                                <Link
                                    key={link.path}
                                    to={link.path}
                                    className={`nav-link ${location.pathname === link.path ? 'active' : ''}`}
                                    onClick={() => setIsOpen(false)}
                                    style={{ fontSize: '0.8rem', letterSpacing: '1px' }}
                                >
                                    {link.name}
                                </Link>
                            ))}

                            {hiddenLinks.length > 0 && (
                                <div
                                    className="nav-link dropdown-trigger"
                                    onMouseEnter={() => setIsDropdownOpen(true)}
                                    onMouseLeave={() => setIsDropdownOpen(false)}
                                    style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '5px' }}
                                >
                                    <span className="more-label">{t('nav.more')}</span> <span style={{ fontSize: '0.6rem' }}>▼</span>

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
                                                {hiddenLinks.map((link) => (
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
                            )}
                        </>
                    )}
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
