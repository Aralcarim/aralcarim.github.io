import React from 'react';
import Layout from '../layout/Layout';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';

const photos = [
    { id: 1, src: '/assets/couple.png', alt: 'Engagement photo 1', span: 'col-span-2 row-span-2' },
    { id: 2, src: '/assets/couple.png', alt: 'Engagement photo 2', span: 'col-span-1 row-span-1' },
    { id: 3, src: '/assets/couple.png', alt: 'Engagement photo 3', span: 'col-span-1 row-span-1' },
    { id: 4, src: '/assets/hero-banner.png', alt: 'Venue photo', span: 'col-span-2 row-span-1' },
    { id: 5, src: '/assets/couple.png', alt: 'Engagement photo 4', span: 'col-span-1 row-span-2' },
    { id: 6, src: '/assets/couple.png', alt: 'Engagement photo 5', span: 'col-span-1 row-span-1' },
];

const Gallery = () => {
    const { t } = useTranslation();
    return (
        <Layout>
            <div className="container" style={{ padding: '60px 20px' }}>
                <h1 className="text-center" style={{ marginBottom: '40px' }}>{t('gallery.title')}</h1>

                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                    gap: '20px',
                    width: '100%'
                }}>
                    {photos.map((photo, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            transition={{ delay: index * 0.1 }}
                            whileHover={{ scale: 1.02 }}
                            style={{
                                overflow: 'hidden',
                                borderRadius: '8px',
                                boxShadow: '0 4px 15px rgba(0,0,0,0.1)',
                                cursor: 'pointer',
                                height: '300px'
                            }}
                        >
                            <img
                                src={photo.src}
                                alt={photo.alt}
                                style={{
                                    width: '100%',
                                    height: '100%',
                                    objectFit: 'cover',
                                    transition: 'transform 0.5s ease'
                                }}
                            />
                        </motion.div>
                    ))}
                </div>
            </div>
        </Layout>
    );
};

export default Gallery;
