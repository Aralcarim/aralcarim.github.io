import React, { useState } from 'react';
import Layout from '../layout/Layout';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation, Trans } from 'react-i18next';
import { Link } from 'react-router-dom';
import './FAQ.css';

const FAQItem = ({ qKey, aKey, components }) => {
    const { t } = useTranslation();
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className={`faq-item ${isOpen ? 'active' : ''}`}>
            <button
                className="faq-question-btn"
                onClick={() => setIsOpen(!isOpen)}
                aria-expanded={isOpen}
            >
                <span>{t(qKey)}</span>
                <span className="faq-icon">▾</span>
            </button>
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="faq-answer"
                    >
                        <p>
                            <Trans i18nKey={aKey} components={components} />
                        </p>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

const FAQCategory = ({ title, questions, emoji }) => {
    return (
        <div className="faq-category">
            <h2 className="category-title"><span className="category-emoji">{emoji}</span> {title}</h2>
            {questions.map((q, index) => (
                <FAQItem key={index} qKey={q.q} aKey={q.a} components={q.components} />
            ))}
        </div>
    );
};

const FAQ = () => {
    const { t } = useTranslation();

    const faqData = [
        {
            category: t('faq.categories.venue'),
            emoji: '🏛️',
            questions: [
                { q: 'faq.questions.where_ceremony', a: 'faq.questions.where_ceremony_a' },
                {
                    q: 'faq.questions.where_reception',
                    a: 'faq.questions.where_reception_a',
                    components: { runOfShowLink: <Link to="/run-of-show" /> }
                },
                { q: 'faq.questions.arrival_time', a: 'faq.questions.arrival_time_a' },
            ]
        },
        {
            category: t('faq.categories.schedule'),
            emoji: '📅',
            questions: [
                {
                    q: 'faq.questions.schedule',
                    a: 'faq.questions.schedule_a',
                    components: { runOfShowLink: <Link to="/run-of-show" /> }
                },
                { q: 'faq.questions.reception_end', a: 'faq.questions.reception_end_a' },
            ]
        },
        {
            category: t('faq.categories.rsvp'),
            emoji: '📝',
            questions: [
                {
                    q: 'faq.questions.how_rsvp',
                    a: 'faq.questions.how_rsvp_a',
                    components: { rsvpLink: <Link to="/rsvp" /> }
                },
                { q: 'faq.questions.rsvp_deadline', a: 'faq.questions.rsvp_deadline_a' },
                { q: 'faq.questions.plus_one', a: 'faq.questions.plus_one_a' },
                { q: 'faq.questions.children', a: 'faq.questions.children_a' },
            ]
        },
        {
            category: t('faq.categories.photo'),
            emoji: '📸',
            questions: [
                { q: 'faq.questions.unplugged', a: 'faq.questions.unplugged_a' },
                { q: 'faq.questions.take_photos', a: 'faq.questions.take_photos_a' },
            ]
        },
        {
            category: t('faq.categories.weather'),
            emoji: '🌤️',
            questions: [
                { q: 'faq.questions.expected_weather', a: 'faq.questions.expected_weather_a' },
                { q: 'faq.questions.rain', a: 'faq.questions.rain_a' },
            ]
        },
        {
            category: t('faq.categories.culture'),
            emoji: '💒',
            questions: [
                { q: 'faq.questions.traditions', a: 'faq.questions.traditions_a' },
            ]
        },
        {
            category: t('faq.categories.gifts'),
            emoji: '🎁',
            questions: [
                {
                    q: 'faq.questions.gifts_expected',
                    a: 'faq.questions.gifts_expected_a',
                    components: { registryLink: <Link to="/registry" /> }
                },
                {
                    q: 'faq.questions.registry',
                    a: 'faq.questions.registry_a',
                    components: { registryLink: <Link to="/registry" /> }
                },
            ]
        },
        {
            category: t('faq.categories.travel'),
            emoji: '✈️',
            questions: [
                { q: 'faq.questions.where_to_go', a: 'faq.questions.where_to_go_a' },
                {
                    q: 'faq.questions.how_get_there',
                    a: 'faq.questions.how_get_there_a',
                    components: { travelLink: <Link to="/travel" /> }
                },
                { q: 'faq.questions.car_rental', a: 'faq.questions.car_rental_a' },
                { q: 'faq.questions.venue_transport', a: 'faq.questions.venue_transport_a' },
                { q: 'faq.questions.parking', a: 'faq.questions.parking_a' },
                { q: 'faq.questions.hotels', a: 'faq.questions.hotels_a' },
            ]
        },
        {
            category: t('faq.categories.dress'),
            emoji: '👔',
            questions: [
                { q: 'faq.questions.dress_code', a: 'faq.questions.dress_code_a' },
                { q: 'faq.questions.bathing_suit', a: 'faq.questions.bathing_suit_a' },
                { q: 'faq.questions.jacket', a: 'faq.questions.jacket_a' },
            ]
        }
    ];

    return (
        <Layout>
            <div className="faq-container">
                <div className="container">
                    <section className="faq-header">
                        <motion.h1
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="faq-title"
                        >
                            {t('faq.title')}
                        </motion.h1>
                        <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.2 }}
                            className="faq-oneliner"
                        >
                            {t('faq.oneliner')}
                        </motion.p>
                    </section>

                    <section className="faq-sections">
                        {faqData.map((category, index) => (
                            <FAQCategory
                                key={index}
                                title={category.category}
                                questions={category.questions}
                                emoji={category.emoji}
                            />
                        ))}
                    </section>
                </div>
            </div>
        </Layout>
    );
};

export default FAQ;
