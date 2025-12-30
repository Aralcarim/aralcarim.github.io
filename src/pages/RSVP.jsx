import React, { useState } from 'react';
import Layout from '../layout/Layout';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import './RSVP.css';

const RSVP = () => {
    const { t } = useTranslation();
    const [submitted, setSubmitted] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        attending: 'yes',
        guests: '1',
        dietary: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('RSVP Submitted:', formData);
        // In a real app, you would send this to a backend or Google Sheet
        setSubmitted(true);
    };

    if (submitted) {
        return (
            <Layout>
                <div className="rsvp-page">
                    <motion.div
                        className="rsvp-container rsvp-success"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                    >
                        <div className="success-icon">✨</div>
                        <h2>{t('rsvp.title')} - {t('nav.rsvp')}</h2>
                        <p>{t('rsvp.alert', { name: formData.name })}</p>
                        <Link to="/" className="back-home-btn">
                            {t('nav.home')}
                        </Link>
                    </motion.div>
                </div>
            </Layout>
        );
    }

    return (
        <Layout>
            <div className="rsvp-page">
                <motion.div
                    className="rsvp-container"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                >
                    <h1 className="rsvp-title">{t('rsvp.title')}</h1>
                    <small className="rsvp-deadline">{t('rsvp.deadline')}</small>

                    <form className="rsvp-form" onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label htmlFor="name">{t('rsvp.name')}</label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="email">{t('rsvp.email')}</label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="attending">{t('rsvp.attending')}</label>
                            <select
                                id="attending"
                                name="attending"
                                value={formData.attending}
                                onChange={handleChange}
                            >
                                <option value="yes">{t('rsvp.yes')}</option>
                                <option value="no">{t('rsvp.no')}</option>
                            </select>
                        </div>

                        {formData.attending === 'yes' && (
                            <div className="form-group">
                                <label htmlFor="guests">{t('rsvp.guests')}</label>
                                <select
                                    id="guests"
                                    name="guests"
                                    value={formData.guests}
                                    onChange={handleChange}
                                >
                                    <option value="1">1</option>
                                    <option value="2">2</option>
                                    <option value="3">3</option>
                                    <option value="4">4</option>
                                </select>
                            </div>
                        )}

                        <div className="form-group">
                            <label htmlFor="dietary">{t('rsvp.dietary')}</label>
                            <textarea
                                id="dietary"
                                name="dietary"
                                placeholder={t('rsvp.dietary_placeholder')}
                                value={formData.dietary}
                                onChange={handleChange}
                                rows="3"
                            />
                        </div>

                        <button type="submit" className="rsvp-submit-btn">
                            {t('rsvp.submit')}
                        </button>
                    </form>
                </motion.div>
            </div>
        </Layout>
    );
};

export default RSVP;
