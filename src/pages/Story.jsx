import React from 'react';
import Layout from '../layout/Layout';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import './Story.css';

const ProfileCard = ({ name, movie, books, fact, quote, alignment }) => {
    const { t } = useTranslation();
    return (
        <div className={`profile-info ${alignment}`}>
            <h2 className="profile-name">{name}</h2>
            <div className="profile-detail">
                <strong>{t('story.profile.movie')}:</strong> {movie}
            </div>
            <div className="profile-detail">
                <strong>{t('story.profile.books')}:</strong> {books}
            </div>
            <div className="profile-detail">
                <strong>{t('story.profile.fact')}:</strong> {fact}
            </div>
            <div className="profile-detail">
                <strong>{t('story.profile.quote')}:</strong> <em>"{quote}"</em>
            </div>
        </div>
    );
};

const TimelineItem = ({ date, year, caption, image, side }) => {
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
                <div className="timeline-date">{date} {year}</div>
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
        { date: "January", year: "2022", caption: t('story.timeline.event1'), image: "/assets/timeline-1.png", side: "left" },
        { date: "August", year: "2023", caption: t('story.timeline.event2'), image: null, side: "right" },
        { date: "December", year: "2024", caption: t('story.timeline.event3'), image: null, side: "left" },
        { date: "December", year: "2025", caption: t('story.timeline.event4'), image: null, side: "right" },
        { date: "June", year: "2026", caption: t('story.timeline.event5'), image: null, side: "left" },
    ];

    return (
        <Layout>
            <div className="story-container">
                {/* Profiles Section */}
                <section className="profiles-section">
                    <div className="container profile-grid">
                        {/* Vaclav Info */}
                        <ProfileCard
                            name="Vaclav"
                            movie={t('story.profile.vaclav.movie')}
                            books={t('story.profile.vaclav.books')}
                            fact={t('story.profile.vaclav.fact')}
                            quote={t('story.profile.vaclav.quote')}
                            alignment="text-right"
                        />
                        {/* Couple Photo */}
                        <div className="couple-photo-wrapper">
                            <div className="profile-pic-wrapper couple-photo">
                                <img src="/assets/our-story-couple.jpg" alt="Cinzia & Vaclav" className="profile-pic" />
                            </div>
                            <p className="couple-photo-caption">{t('story.couplePhotoCaption')}</p>
                        </div>
                        {/* Cinzia Info */}
                        <ProfileCard
                            name="Cinzia"
                            movie={t('story.profile.cinzia.movie')}
                            books={t('story.profile.cinzia.books')}
                            fact={t('story.profile.cinzia.fact')}
                            quote={t('story.profile.cinzia.quote')}
                            alignment="text-left"
                        />
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
