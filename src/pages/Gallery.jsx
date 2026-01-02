import React, { useState } from 'react';
import Layout from '../layout/Layout';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import './Gallery.css';

const Gallery = () => {
    const { t } = useTranslation();
    const [selectedFilter, setSelectedFilter] = useState('all');
    const [selectedPhoto, setSelectedPhoto] = useState(null);

    // Photo categories for the gallery
    const categories = [
        { id: 'all', label: t('gallery.filters.all') },
        { id: 'couple', label: t('gallery.filters.couple') },
        { id: 'venue', label: t('gallery.filters.venue') },
        { id: 'moments', label: t('gallery.filters.moments') },
        { id: 'details', label: t('gallery.filters.details') },
    ];

    // Enhanced photo collection with categories and sizes for masonry layout
    const photos = [
        { src: "/assets/our-story-couple.jpg", alt: "Our favorite moment", category: "couple", size: "large" },
        { src: "/assets/couple.png", alt: "Just us", category: "couple", size: "medium" },
        { src: "/assets/querce-location.jpeg", alt: "The venue", category: "venue", size: "wide" },
        { src: "/assets/hero-banner.png", alt: "Together forever", category: "couple", size: "medium" },
        { src: "/assets/couple.png", alt: "Sweet moments", category: "moments", size: "tall" },
        { src: "/assets/our-story-couple.jpg", alt: "Wedding details", category: "details", size: "medium" },
        { src: "/assets/querce-location.jpeg", alt: "Beautiful venue", category: "venue", size: "medium" },
        { src: "/assets/hero-banner.png", alt: "Happy times", category: "moments", size: "medium" },
        { src: "/assets/couple.png", alt: "Love story", category: "couple", size: "wide" },
        { src: "/assets/our-story-couple.jpg", alt: "Special details", category: "details", size: "tall" },
        { src: "/assets/querce-location.jpeg", alt: "Our venue", category: "venue", size: "medium" },
        { src: "/assets/hero-banner.png", alt: "Precious moments", category: "moments", size: "large" },
    ];

    // Filter photos based on selected category
    const filteredPhotos = selectedFilter === 'all'
        ? photos
        : photos.filter(photo => photo.category === selectedFilter);

    // Open lightbox
    const openLightbox = (photo) => {
        setSelectedPhoto(photo);
        document.body.style.overflow = 'hidden';
    };

    // Close lightbox
    const closeLightbox = () => {
        setSelectedPhoto(null);
        document.body.style.overflow = 'unset';
    };

    // Navigate to next/previous photo
    const navigatePhoto = (direction) => {
        const currentIndex = filteredPhotos.findIndex(p => p.src === selectedPhoto.src);
        let newIndex;
        if (direction === 'next') {
            newIndex = (currentIndex + 1) % filteredPhotos.length;
        } else {
            newIndex = (currentIndex - 1 + filteredPhotos.length) % filteredPhotos.length;
        }
        setSelectedPhoto(filteredPhotos[newIndex]);
    };

    // Handle keyboard navigation
    React.useEffect(() => {
        const handleKeyDown = (e) => {
            if (!selectedPhoto) return;
            if (e.key === 'Escape') closeLightbox();
            if (e.key === 'ArrowRight') navigatePhoto('next');
            if (e.key === 'ArrowLeft') navigatePhoto('prev');
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [selectedPhoto]);

    return (
        <Layout>
            <div className="gallery-page">
                {/* Hero Section */}
                <motion.div
                    className="gallery-hero"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                >
                    <h1 className="gallery-title">{t('gallery.title')}</h1>
                    <p className="gallery-subtitle">{t('gallery.subtitle')}</p>
                </motion.div>

                {/* Filter Buttons */}
                <motion.div
                    className="gallery-filters"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2, duration: 0.5 }}
                >
                    {categories.map((category) => (
                        <motion.button
                            key={category.id}
                            className={`filter-btn ${selectedFilter === category.id ? 'active' : ''}`}
                            onClick={() => setSelectedFilter(category.id)}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            {category.label}
                        </motion.button>
                    ))}
                </motion.div>

                {/* Photo Count */}
                <motion.div
                    className="gallery-count"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                >
                    {t('gallery.photoCount', { count: filteredPhotos.length })}
                </motion.div>

                {/* Masonry Gallery Grid */}
                <motion.div
                    className={`gallery-masonry ${selectedFilter}`}
                    layout
                >
                    <AnimatePresence mode="popLayout">
                        {filteredPhotos.map((photo, index) => (
                            <motion.div
                                key={`${photo.src}-${selectedFilter}`}
                                className={`gallery-item gallery-item-${photo.size}`}
                                layout
                                initial={{ opacity: 0, scale: 0.8, y: 20 }}
                                animate={{ opacity: 1, scale: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.8, transition: { duration: 0.2 } }}
                                whileHover={{ scale: 1.02, zIndex: 1 }}
                                transition={{
                                    layout: { duration: 0.3 },
                                    opacity: { delay: index * 0.05, duration: 0.4 },
                                    scale: { duration: 0.2 }
                                }}
                                onClick={() => openLightbox(photo)}
                            >
                                <img
                                    src={photo.src}
                                    alt={photo.alt}
                                    className="gallery-img"
                                    loading="lazy"
                                />
                                <div className="gallery-overlay">
                                    <div className="overlay-content">
                                        <svg className="overlay-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                            <circle cx="11" cy="11" r="8"></circle>
                                            <path d="M21 21l-4.35-4.35"></path>
                                        </svg>
                                        <span className="overlay-caption">{photo.alt}</span>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </motion.div>

                {/* Lightbox Modal */}
                <AnimatePresence>
                    {selectedPhoto && (
                        <motion.div
                            className="lightbox"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={closeLightbox}
                        >
                            <motion.button
                                className="lightbox-close"
                                onClick={closeLightbox}
                                whileHover={{ scale: 1.1, rotate: 90 }}
                                whileTap={{ scale: 0.9 }}
                            >
                                ×
                            </motion.button>

                            <motion.button
                                className="lightbox-nav lightbox-prev"
                                onClick={(e) => { e.stopPropagation(); navigatePhoto('prev'); }}
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                            >
                                ‹
                            </motion.button>

                            <motion.div
                                className="lightbox-content"
                                initial={{ scale: 0.8, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                exit={{ scale: 0.8, opacity: 0 }}
                                transition={{ type: "spring", damping: 25, stiffness: 300 }}
                                onClick={(e) => e.stopPropagation()}
                            >
                                <img src={selectedPhoto.src} alt={selectedPhoto.alt} />
                                <div className="lightbox-caption">{selectedPhoto.alt}</div>
                            </motion.div>

                            <motion.button
                                className="lightbox-nav lightbox-next"
                                onClick={(e) => { e.stopPropagation(); navigatePhoto('next'); }}
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                            >
                                ›
                            </motion.button>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </Layout>
    );
};

export default Gallery;
