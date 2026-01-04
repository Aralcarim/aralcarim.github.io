import React, { useState } from 'react';
import Layout from '../layout/Layout';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { GOOGLE_SCRIPT_URL } from '../config';
import './RSVP.css';

const RSVP = () => {
    const { t } = useTranslation();
    const [submitted, setSubmitted] = useState(false);
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState('');
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        attending: 'yes',
        guests: '1',
        dietary: '',
        comments: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const validateEmail = (email) => {
        // More strict regex: requires @ and at least one dot in the domain part
        const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        return regex.test(email);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Manual email validation
        if (!validateEmail(formData.email)) {
            setError('Please enter a valid email address (e.g., name@example.com)');
            return;
        }

        // Check form validity and show browser validation errors
        if (!e.target.reportValidity()) {
            return;
        }

        setSubmitting(true);
        setError('');

        try {
            // Use form-urlencoded for better Google Apps Script compatibility
            const params = new URLSearchParams(formData);
            const response = await fetch(GOOGLE_SCRIPT_URL, {
                method: 'POST',
                mode: 'no-cors',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: params.toString()
            });

            // no-cors means we can't read the response, but if we get here without error it likely worked
            setSubmitted(true);
        } catch (err) {
            setError('Something went wrong. Please try again or contact us directly.');
            console.error('RSVP submission error:', err);
        } finally {
            setSubmitting(false);
        }
    };

    if (!GOOGLE_SCRIPT_URL) {
        return (
            <Layout>
                <div className="rsvp-page">
                    <motion.div
                        className="rsvp-container rsvp-error"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                    >
                        <div className="error-icon">⚠️</div>
                        <h2>{t('rsvp.title')}</h2>
                        <p>RSVP form is not yet configured. Please contact us directly.</p>
                    </motion.div>
                </div>
            </Layout>
        );
    }

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
                        <h2>{t('rsvp.title')}</h2>
                        <p>{t('rsvp.success')}</p>
                        <p style={{ color: '#999', fontSize: '0.9rem', marginTop: '15px' }}>
                            {t('rsvp.confirmation')} <a href="/contact" style={{ color: 'var(--color-primary)', textDecoration: 'underline' }}>{t('rsvp.contact_link')}</a>
                        </p>
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

                    {error && (
                        <div className="rsvp-error-message">
                            {error}
                        </div>
                    )}

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
                                disabled={submitting}
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
                                pattern="[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}"
                                title="Please enter a valid email address (e.g., name@example.com)"
                                required
                                disabled={submitting}
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="attending">{t('rsvp.attending')}</label>
                            <select
                                id="attending"
                                name="attending"
                                value={formData.attending}
                                onChange={handleChange}
                                required
                                disabled={submitting}
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
                                    required
                                    disabled={submitting}
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
                                disabled={submitting}
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="comments">Additional Comments</label>
                            <textarea
                                id="comments"
                                name="comments"
                                placeholder="Any song requests, messages for the couple, or other notes?"
                                value={formData.comments}
                                onChange={handleChange}
                                rows="3"
                                disabled={submitting}
                            />
                        </div>

                        <button type="submit" className="rsvp-submit-btn" disabled={submitting}>
                            {submitting ? 'Sending...' : t('rsvp.submit')}
                        </button>
                    </form>
                </motion.div>
            </div>
        </Layout>
    );
};

export default RSVP;
