import React from 'react';
import Layout from '../layout/Layout';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import './RunOfShow.css';

const TimelineEvent = ({ time, title, desc, delay }) => (
    <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ delay, duration: 0.5 }}
        viewport={{ once: true }}
        className="timeline-event"
    >
        <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ delay, duration: 0.5 }}
            viewport={{ once: true }}
        >
            <div className="event-time">{time}</div>
            <h3 className="event-title">{title}</h3>
            <p className="event-desc">{desc}</p>
        </motion.div>
    </motion.div>
);

const RunOfShow = () => {
    const { t } = useTranslation();

    const timelineItems = [
        {
            time: t('run_of_show.timeline.ceremony.time'),
            title: t('run_of_show.timeline.ceremony.title'),
            desc: t('run_of_show.timeline.ceremony.desc'),
            delay: 0.2
        },
        {
            time: t('run_of_show.timeline.entrees.time'),
            title: t('run_of_show.timeline.entrees.title'),
            desc: t('run_of_show.timeline.entrees.desc'),
            delay: 0.3
        },
        {
            time: t('run_of_show.timeline.lunch.time'),
            title: t('run_of_show.timeline.lunch.title'),
            desc: t('run_of_show.timeline.lunch.desc'),
            delay: 0.4
        },
        {
            time: t('run_of_show.timeline.cake.time'),
            title: t('run_of_show.timeline.cake.title'),
            desc: t('run_of_show.timeline.cake.desc'),
            delay: 0.5
        },
        {
            time: t('run_of_show.timeline.afterparty.time'),
            title: t('run_of_show.timeline.afterparty.title'),
            desc: t('run_of_show.timeline.afterparty.desc'),
            delay: 0.6
        }
    ];

    return (
        <Layout>
            <div className="run-of-show-container">
                <div className="container" style={{ padding: '60px 20px' }}>

                    {/* Venue Section */}
                    <section className="venue-header">
                        <motion.img
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            className="venue-image"
                            src="/assets/querce-location.jpeg"
                            alt="Le Querce di Mamre"
                        />

                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="venue-title"
                        >
                            {t('run_of_show.venue.title')}
                        </motion.h1>

                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 }}
                            viewport={{ once: true }}
                            className="venue-blurb"
                        >
                            {t('run_of_show.venue.blurb')}
                        </motion.p>

                        <motion.a
                            href="https://maps.app.goo.gl/THpxYi7vTYL1b8gt6"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="directions-btn"
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            transition={{ delay: 0.2 }}
                            viewport={{ once: true }}
                        >
                            {t('run_of_show.venue.directions')}
                        </motion.a>
                    </section>

                    {/* Timeline Section */}
                    <section className="timeline-section">
                        <h2 className="text-center" style={{ marginBottom: '50px', fontSize: '2.5rem', fontFamily: 'var(--font-heading)' }}>
                            {t('run_of_show.title')}
                        </h2>

                        <div className="timeline-list">
                            {timelineItems.map((event, index) => (
                                <TimelineEvent key={index} {...event} />
                            ))}
                        </div>
                    </section>
                </div>
            </div>
        </Layout>
    );
};

export default RunOfShow;
