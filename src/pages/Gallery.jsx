import React, { useState, useMemo } from 'react';
import Layout from '../layout/Layout';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import galleryPhotos from '../data/gallery-photos.json';
import './Gallery.css';

const Gallery = () => {
    const { t } = useTranslation();
    const [selectedFilter, setSelectedFilter] = useState('all');
    const [selectedPhoto, setSelectedPhoto] = useState(null);
    const [photoIndex, setPhotoIndex] = useState(0);

    // Photo categories
    const categories = [
        { id: 'all', label: t('gallery.filters.all') },
        { id: 'moments', label: t('gallery.filters.moments') },
        { id: 'friends', label: t('gallery.filters.friends') },
        { id: 'family', label: t('gallery.filters.family') },
    ];

    // Extract date from filename (YYYYMMDD format)
    const getDateFromFilename = (filename) => {
        const match = filename.match(/(\d{4})(\d{2})/);
        if (!match) return null;

        const year = match[1];
        const month = parseInt(match[2]);
        const monthNames = ['January', 'February', 'March', 'April', 'May', 'June',
                           'July', 'August', 'September', 'October', 'November', 'December'];

        return `${monthNames[month - 1]} ${year}`;
    };

    // Photo collection - loaded from JSON file
    const photos = useMemo(() => {
        return galleryPhotos.map(p => ({
            ...p,
            src: `/assets/gallery/${p.src}`,
            thumb: `/assets/gallery/thumbs/${p.src}`,
            date: getDateFromFilename(p.src)
        }));
    }, []);

    const filteredPhotos = useMemo(() => {
        if (selectedFilter === 'all') return photos;
        return photos.filter(photo => photo.category === selectedFilter);
    }, [photos, selectedFilter]);

    const openLightbox = (index) => {
        setPhotoIndex(index);
        setSelectedPhoto(filteredPhotos[index]);
        document.body.style.overflow = 'hidden';
    };

    const closeLightbox = () => {
        setSelectedPhoto(null);
        document.body.style.overflow = 'unset';
    };

    const navigatePhoto = (direction) => {
        let newIndex;
        if (direction === 'next') {
            newIndex = (photoIndex + 1) % filteredPhotos.length;
        } else {
            newIndex = (photoIndex - 1 + filteredPhotos.length) % filteredPhotos.length;
        }
        setPhotoIndex(newIndex);
        setSelectedPhoto(filteredPhotos[newIndex]);
    };

    React.useEffect(() => {
        const handleKeyDown = (e) => {
            if (!selectedPhoto) return;
            if (e.key === 'Escape') closeLightbox();
            if (e.key === 'ArrowRight') navigatePhoto('next');
            if (e.key === 'ArrowLeft') navigatePhoto('prev');
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [selectedPhoto, photoIndex, filteredPhotos]);

    return (
        <Layout>
            <div className="gallery-page">
                <motion.div
                    className="gallery-hero"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                >
                    <h1 className="gallery-title">{t('gallery.title')}</h1>
                    <p className="gallery-subtitle">{t('gallery.subtitle')}</p>
                </motion.div>

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

                <motion.div
                    className="gallery-count"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                >
                    {t('gallery.photoCount', { count: filteredPhotos.length })}
                </motion.div>

                <motion.div
                    className="gallery-grid"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4 }}
                >
                    <AnimatePresence>
                        {filteredPhotos.map((photo, index) => (
                            <motion.div
                                key={photo.src}
                                className="gallery-item"
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                transition={{ delay: Math.min(index * 0.02, 0.5) }}
                                whileHover={{ scale: 1.02 }}
                                onClick={() => openLightbox(index)}
                            >
                                <img
                                    src={photo.thumb}
                                    alt={photo.date || photo.src}
                                    loading="lazy"
                                />
                                {photo.date && (
                                    <div className="gallery-item-caption">{photo.date}</div>
                                )}
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </motion.div>

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
                                whileHover={{ scale: 1.1 }}
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
                                initial={{ scale: 0.9, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                exit={{ scale: 0.9, opacity: 0 }}
                                onClick={(e) => e.stopPropagation()}
                            >
                                <img src={selectedPhoto.src} alt={selectedPhoto.date || selectedPhoto.src} />
                                {selectedPhoto.date && (
                                    <div className="lightbox-caption">{selectedPhoto.date}</div>
                                )}
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
