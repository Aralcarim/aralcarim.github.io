import React from 'react';
import Layout from '../layout/Layout';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import './Gallery.css';

const Gallery = () => {
    const { t } = useTranslation();

    const photos = [
        { src: "/assets/couple.png", alt: "Couple 1", delay: 0 },
        { src: "/assets/hero-banner.png", alt: "Couple 2", delay: 0.1 },
        { src: "/assets/couple.png", alt: "Couple 3", delay: 0.2 },
        { src: "/assets/hero-banner.png", alt: "Couple 4", delay: 0.3 },
        { src: "/assets/couple.png", alt: "Couple 5", delay: 0.4 },
        { src: "/assets/hero-banner.png", alt: "Couple 6", delay: 0.5 },
        { src: "/assets/couple.png", alt: "Couple 7", delay: 0.6 },
        { src: "/assets/hero-banner.png", alt: "Couple 8", delay: 0.7 },
        { src: "/assets/couple.png", alt: "Couple 9", delay: 0.8 },
    ];

    return (
        <Layout>
            <div className="gallery-page">
                <motion.h1
                    className="gallery-title"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                >
                    {t('gallery.title')}
                </motion.h1>

                <div className="gallery-grid">
                    {photos.map((photo, index) => (
                        <motion.div
                            key={index}
                            className="gallery-item"
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: photo.delay, duration: 0.5 }}
                        >
                            <img
                                src={photo.src}
                                alt={photo.alt}
                                className="gallery-img"
                            />
                            <div className="gallery-overlay">
                                <span className="plus-icon">+</span>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </Layout>
    );
};

export default Gallery;
