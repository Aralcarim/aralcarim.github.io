import React from 'react';
import Layout from '../layout/Layout';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';

const EventCard = ({ title, time, location, address, mapLink, delay, directionsText }) => (
    <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ delay }}
        viewport={{ once: true }}
        style={{
            background: '#fff',
            padding: '40px',
            borderRadius: '8px',
            boxShadow: '0 5px 20px rgba(0,0,0,0.05)',
            marginBottom: '30px',
            textAlign: 'center'
        }}
    >
        <h2 style={{ fontSize: '2rem', marginBottom: '10px' }}>{title}</h2>
        <p style={{
            fontSize: '1.2rem',
            color: 'var(--color-gold)',
            fontWeight: 600,
            marginBottom: '10px'
        }}>{time}</p>
        <p style={{ fontWeight: 600, marginBottom: '5px' }}>{location}</p>
        <p style={{ color: '#666', marginBottom: '20px' }}>{address}</p>

        <div style={{ height: '300px', width: '100%', background: '#eee', borderRadius: '4px', overflow: 'hidden' }}>
            <iframe
                title={title}
                width="100%"
                height="100%"
                frameBorder="0"
                style={{ border: 0 }}
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d163972.84666324022!2d14.30154839845511!3d50.05929340941913!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x470b939c0970798b%3A0x400af0f66164090!2sPrague%2C%20Czechia!5e0!3m2!1sen!2sus!4v1709123456789!5m2!1sen!2sus"
                allowFullScreen
            />
        </div>
        <a href={mapLink} target="_blank" rel="noopener noreferrer" style={{
            display: 'inline-block',
            marginTop: '20px',
            textDecoration: 'underline',
            color: 'var(--color-text)'
        }}>{directionsText}</a>
    </motion.div>
);

const Events = () => {
    const { t } = useTranslation();

    return (
        <Layout>
            <div className="container" style={{ padding: '60px 20px', maxWidth: '800px' }}>
                <h1 className="text-center" style={{ marginBottom: '40px', fontSize: '3rem' }}>{t('events.title')}</h1>

                <EventCard
                    title={t('events.ceremony.title')}
                    time={t('events.ceremony.time')}
                    location={t('events.ceremony.location')}
                    address="III. nádvoří 48/2, 119 01 Praha 1-Hradčany"
                    mapLink="https://maps.app.goo.gl/example"
                    directionsText={t('events.directions')}
                    delay={0.1}
                />

                <EventCard
                    title={t('events.reception.title')}
                    time={t('events.reception.time')}
                    location={t('events.reception.location')}
                    address="Jiřská 3, 119 00 Praha 1-Hradčany"
                    mapLink="https://maps.app.goo.gl/example"
                    directionsText={t('events.directions')}
                    delay={0.3}
                />

                <div className="text-center" style={{ marginTop: '50px' }}>
                    <h3>{t('events.transport')}</h3>
                    <p style={{ marginTop: '10px' }}>{t('events.transport_desc')}</p>
                </div>
            </div>
        </Layout>
    );
};

export default Events;
