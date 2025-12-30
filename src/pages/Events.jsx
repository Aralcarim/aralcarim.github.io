import React from 'react';
import Layout from '../layout/Layout';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import './Events.css';

const TimelineEvent = ({ time, title, desc, delay }) => (
    <motion.div
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ delay, duration: 0.5 }}
        viewport={{ once: true }}
        className="timeline-event"
    >
        <div className="event-time">{time}</div>
        <h3 className="event-title">{title}</h3>
        <p className="event-desc">{desc}</p>
    </motion.div>
);

const Events = () => {
    const { t } = useTranslation();

    const events = [
        {
            time: t('events.timeline.ceremony.time'),
            title: t('events.timeline.ceremony.title'),
            desc: t('events.timeline.ceremony.desc'),
            delay: 0.2
        },
        {
            time: t('events.timeline.entrees.time'),
            title: t('events.timeline.entrees.title'),
            desc: t('events.timeline.entrees.desc'),
            delay: 0.3
        },
        {
            time: t('events.timeline.lunch.time'),
            title: t('events.timeline.lunch.title'),
            desc: t('events.timeline.lunch.desc'),
            delay: 0.4
        },
        {
            time: t('events.timeline.cake.time'),
            title: t('events.timeline.cake.title'),
            desc: t('events.timeline.cake.desc'),
            delay: 0.5
        },
        {
            time: t('events.timeline.afterparty.time'),
            title: t('events.timeline.afterparty.title'),
            desc: t('events.timeline.afterparty.desc'),
            delay: 0.6
        }
    ];

    return (
        <Layout>
            <div className="events-container">
                <div className="container" style={{ padding: '60px 20px' }}>

                    {/* Venue Section */}
                    <section className="venue-header">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            className="venue-image-placeholder"
                        >
                            Le Querce di Mamre
                        </motion.div>

                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="venue-title"
                        >
                            {t('events.venue.title')}
                        </motion.h1>

                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 }}
                            viewport={{ once: true }}
                            className="venue-blurb"
                        >
                            {t('events.venue.blurb')}
                        </motion.p>

                        <motion.a
                            href="https://maps.app.goo.gl/LeQuerceDiMamre"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="directions-btn"
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            transition={{ delay: 0.2 }}
                            viewport={{ once: true }}
                        >
                            {t('events.venue.directions')}
                        </motion.a>
                    </section>

                    {/* Timeline Section */}
                    <section className="timeline-section">
                        <h2 className="text-center" style={{ marginBottom: '50px', fontSize: '2.5rem', fontFamily: 'var(--font-heading)' }}>
                            {t('events.title')}
                        </h2>

                        <div className="timeline-list">
                            {events.map((event, index) => (
                                <TimelineEvent key={index} {...event} />
                            ))}
                        </div>
                    </section>
                </div>
            </div>
        </Layout>
    );
};

export default Events;
