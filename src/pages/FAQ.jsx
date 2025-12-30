import React, { useState } from 'react';
import Layout from '../layout/Layout';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import './FAQ.css';

const FAQItem = ({ question, answer }) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className={`faq-item ${isOpen ? 'active' : ''}`}>
            <button
                className="faq-question-btn"
                onClick={() => setIsOpen(!isOpen)}
                aria-expanded={isOpen}
            >
                <span>{question}</span>
                <span className="faq-icon">▾</span>
            </button>
            <div className="faq-answer">
                <p>{answer}</p>
            </div>
        </div>
    );
};

const FAQCategory = ({ title, questions }) => {
    return (
        <div className="faq-category">
            <h2 className="category-title">{title}</h2>
            {questions.map((q, index) => (
                <FAQItem key={index} question={q.q} answer={q.a} />
            ))}
        </div>
    );
};

const FAQ = () => {
    const { t } = useTranslation();

    const faqData = [
        {
            category: t('faq.categories.venue'),
            questions: [
                { q: t('faq.questions.when_wedding'), a: t('faq.questions.when_wedding_a') },
                { q: t('faq.questions.where_ceremony'), a: t('faq.questions.where_ceremony_a') },
                { q: t('faq.questions.where_reception'), a: t('faq.questions.where_reception_a') },
                { q: t('faq.questions.arrival_time'), a: t('faq.questions.arrival_time_a') },
            ]
        },
        {
            category: t('faq.categories.dress'),
            questions: [
                { q: t('faq.questions.dress_code'), a: t('faq.questions.dress_code_a') },
                { q: t('faq.questions.outdoor_elements'), a: t('faq.questions.outdoor_elements_a') },
            ]
        },
        {
            category: t('faq.categories.rsvp'),
            questions: [
                { q: t('faq.questions.how_rsvp'), a: t('faq.questions.how_rsvp_a') },
                { q: t('faq.questions.rsvp_deadline'), a: t('faq.questions.rsvp_deadline_a') },
                { q: t('faq.questions.plus_one'), a: t('faq.questions.plus_one_a') },
                { q: t('faq.questions.children'), a: t('faq.questions.children_a') },
            ]
        },
        {
            category: t('faq.categories.travel'),
            questions: [
                { q: t('faq.questions.how_get_there'), a: t('faq.questions.how_get_there_a') },
                { q: t('faq.questions.parking'), a: t('faq.questions.parking_a') },
                { q: t('faq.questions.hotels'), a: t('faq.questions.hotels_a') },
                { q: t('faq.questions.transportation'), a: t('faq.questions.transportation_a') },
            ]
        },
        {
            category: t('faq.categories.food'),
            questions: [
                { q: t('faq.questions.food_provided'), a: t('faq.questions.food_provided_a') },
                { q: t('faq.questions.dietary'), a: t('faq.questions.dietary_a') },
                { q: t('faq.questions.bar'), a: t('faq.questions.bar_a') },
            ]
        },
        {
            category: t('faq.categories.gifts'),
            questions: [
                { q: t('faq.questions.gifts_expected'), a: t('faq.questions.gifts_expected_a') },
                { q: t('faq.questions.registry'), a: t('faq.questions.registry_a') },
                { q: t('faq.questions.gift_way'), a: t('faq.questions.gift_way_a') },
            ]
        },
        {
            category: t('faq.categories.photo'),
            questions: [
                { q: t('faq.questions.unplugged'), a: t('faq.questions.unplugged_a') },
                { q: t('faq.questions.take_photos'), a: t('faq.questions.take_photos_a') },
                { q: t('faq.questions.hashtag'), a: t('faq.questions.hashtag_a') },
            ]
        },
        {
            category: t('faq.categories.schedule'),
            questions: [
                { q: t('faq.questions.schedule'), a: t('faq.questions.schedule_a') },
                { q: t('faq.questions.reception_end'), a: t('faq.questions.reception_end_a') },
            ]
        },
        {
            category: t('faq.categories.weather'),
            questions: [
                { q: t('faq.questions.rain'), a: t('faq.questions.rain_a') },
            ]
        },
        {
            category: t('faq.categories.culture'),
            questions: [
                { q: t('faq.questions.traditions'), a: t('faq.questions.traditions_a') },
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
                            />
                        ))}
                    </section>
                </div>
            </div>
        </Layout>
    );
};

export default FAQ;
