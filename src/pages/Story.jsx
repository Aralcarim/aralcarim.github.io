import React from 'react';
import Layout from '../layout/Layout';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import './Story.css';

const TimelineItem = ({ date, year, caption, location, image, side }) => {
    return (
        <div className={`timeline-item ${side}`}>
            <motion.div
                className="timeline-dot"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5 }}
            />
            <motion.div
                className="timeline-content"
                initial={{ opacity: 0, x: side === 'left' ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5 }}
            >
                <div className="timeline-header">
                    <span className="timeline-date">{date} {year}</span>
                    {location && <span className="timeline-location">• {location}</span>}
                </div>
                {image && <img src={image} alt={caption} className="timeline-img" />}
                {!image && (
                    <div className="timeline-img-placeholder">
                        <span>{year}</span>
                    </div>
                )}
                <p className="timeline-caption">{caption}</p>
            </motion.div>
        </div>
    );
};

const Story = () => {
    const { t } = useTranslation();

    const timelineEvents = [
        { date: "May", year: "2022", caption: t('story.timeline.event1'), location: "London", image: null, side: "left" },
        { date: "August", year: "2022", caption: t('story.timeline.event2'), location: "Italy", image: null, side: "right" },
        { date: "December", year: "2022", caption: t('story.timeline.event3'), location: "Germany", image: null, side: "left" },
        { date: "January", year: "2023", caption: t('story.timeline.event4'), location: "Italy", image: null, side: "right" },
        { date: "March", year: "2023", caption: t('story.timeline.event5'), location: "Vienna", image: null, side: "left" },
        { date: "Spring", year: "2023", caption: t('story.timeline.event6'), location: "London", image: null, side: "right" },
        { date: "July", year: "2023", caption: t('story.timeline.event7'), location: "Japan", image: null, side: "left" },
        { date: "March", year: "2024", caption: t('story.timeline.event8'), location: "London", image: null, side: "right" },
        { date: "June", year: "2024", caption: t('story.timeline.event9'), location: "Ischia", image: null, side: "left" },
        { date: "July", year: "2024", caption: t('story.timeline.event10'), location: "Iceland", image: null, side: "right" },
        { date: "Winter", year: "2024", caption: t('story.timeline.event11'), location: "London", image: null, side: "left" },
        { date: "December", year: "2024", caption: t('story.timeline.event12'), location: "Mexico", image: null, side: "right" },
        { date: "March", year: "2025", caption: t('story.timeline.event13'), location: "Norway", image: null, side: "left" },
        { date: "April", year: "2025", caption: t('story.timeline.event14'), location: "London", image: null, side: "right" },
        { date: "Summer", year: "2025", caption: t('story.timeline.event15'), location: "London", image: null, side: "left" },
        { date: "November", year: "2025", caption: t('story.timeline.event16'), location: "London", image: null, side: "right" },
        { date: "June", year: "2026", caption: t('story.timeline.event17'), location: "Apulia", image: null, side: "left" },
    ];

    return (
        <Layout>
            <div className="story-container">
                {/* Couple Photo Section */}
                <section className="profiles-section">
                    <div className="container profile-grid">
                        <div className="couple-photo-wrapper">
                            <div className="profile-pic-wrapper couple-photo">
                                <img src="/assets/our-story-couple.jpg" alt="Cinzia & Vaclav" className="profile-pic" />
                            </div>
                            <p className="couple-photo-caption">{t('story.couplePhotoCaption')}</p>
                        </div>
                    </div>
                </section>

                {/* Timeline Section */}
                <section className="timeline-section">
                    <div className="timeline-line"></div>
                    <div className="container timeline-container">
                        {timelineEvents.map((event, index) => (
                            <TimelineItem key={index} {...event} />
                        ))}
                    </div>
                </section>
            </div>
        </Layout>
    );
};

export default Story;
