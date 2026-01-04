import React, { useState } from 'react';
import Layout from '../layout/Layout';
import { motion, AnimatePresence } from 'framer-motion';
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
        attending: '',
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
        const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        return regex.test(email);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateEmail(formData.email)) {
            setError('Please enter a valid email address (e.g., name@example.com)');
            return;
        }

        if (!e.target.reportValidity()) {
            return;
        }

        setSubmitting(true);
        setError('');

        try {
            const params = new URLSearchParams(formData);
            const response = await fetch(GOOGLE_SCRIPT_URL, {
                method: 'POST',
                mode: 'no-cors',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: params.toString()
            });

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
                <div className="container rsvp-page">
                    <motion.div
                        className="rsvp-error"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                    >
                        <div className="rsvp-error-icon">⚠️</div>
                        <h2>{t('rsvp.title')}</h2>
                        <p>RSVP form is not yet configured. Please contact us directly.</p>
                    </motion.div>
                </div>
            </Layout>
        );
    }

    return (
        <Layout>
            <div className="container rsvp-page">
                <motion.div
                    className="rsvp-header"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                >
                    <h1 className="rsvp-title">{t('rsvp.title')}</h1>
                    <p className="rsvp-subtitle">{t('rsvp.deadline')}</p>
                </motion.div>

                <motion.div
                    className="rsvp-content"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                >
                    {submitted ? (
                        <motion.div
                            className="rsvp-success"
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.1 }}
                        >
                            <div className="rsvp-success-icon">✨</div>
                            <h2>Thank You!</h2>
                            <p>{t('rsvp.alert').replace('{{name}}', formData.name)}</p>
                            <p className="rsvp-success-note">
                                {t('rsvp.confirmation')} <a href="/contact">{t('rsvp.contact_link')}</a>
                            </p>
                        </motion.div>
                    ) : (
                        <form className="rsvp-form" onSubmit={handleSubmit}>
                            {error && (
                                <motion.div
                                    className="rsvp-form-error"
                                    initial={{ opacity: 0, y: -10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                >
                                    {error}
                                </motion.div>
                            )}

                            <motion.div
                                className="form-group"
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.1 }}
                            >
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    placeholder=" "
                                    value={formData.name}
                                    onChange={handleChange}
                                    required
                                    disabled={submitting}
                                />
                                <label htmlFor="name">{t('rsvp.name')}</label>
                            </motion.div>

                            <motion.div
                                className="form-group"
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.15 }}
                            >
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    placeholder=" "
                                    value={formData.email}
                                    onChange={handleChange}
                                    pattern="[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}"
                                    title="Please enter a valid email address (e.g., name@example.com)"
                                    required
                                    disabled={submitting}
                                />
                                <label htmlFor="email">{t('rsvp.email')}</label>
                            </motion.div>

                            <motion.div
                                className="form-group form-group-attendance"
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.2 }}
                            >
                                <label className="form-group-label">{t('rsvp.attending')}</label>
                                <div className="attendance-options">
                                    <label className={`attendance-option ${formData.attending === 'yes' ? 'selected' : ''}`}>
                                        <input
                                            type="radio"
                                            name="attending"
                                            value="yes"
                                            checked={formData.attending === 'yes'}
                                            onChange={handleChange}
                                            disabled={submitting}
                                        />
                                        <span className="attendance-checkmark">✓</span>
                                        <span className="attendance-label">{t('rsvp.yes')}</span>
                                    </label>
                                    <label className={`attendance-option ${formData.attending === 'no' ? 'selected' : ''}`}>
                                        <input
                                            type="radio"
                                            name="attending"
                                            value="no"
                                            checked={formData.attending === 'no'}
                                            onChange={handleChange}
                                            disabled={submitting}
                                        />
                                        <span className="attendance-checkmark">✓</span>
                                        <span className="attendance-label">{t('rsvp.no')}</span>
                                    </label>
                                </div>
                            </motion.div>

                            <AnimatePresence mode="wait">
                                {formData.attending === 'yes' && (
                                    <motion.div
                                        className="form-group form-group-select"
                                        initial={{ opacity: 0, height: 0 }}
                                        animate={{ opacity: 1, height: 'auto' }}
                                        exit={{ opacity: 0, height: 0 }}
                                        transition={{ duration: 0.2 }}
                                    >
                                        <label htmlFor="guests">{t('rsvp.guests')}</label>
                                        <select
                                            id="guests"
                                            name="guests"
                                            value={formData.guests}
                                            onChange={handleChange}
                                            required
                                            disabled={submitting}
                                        >
                                            <option value="">{t('rsvp.guests')}</option>
                                            <option value="1">1</option>
                                            <option value="2">2</option>
                                            <option value="3">3</option>
                                            <option value="4">4</option>
                                        </select>
                                    </motion.div>
                                )}
                            </AnimatePresence>

                            <motion.div
                                className="form-group"
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.25 }}
                            >
                                <textarea
                                    id="dietary"
                                    name="dietary"
                                    placeholder=" "
                                    value={formData.dietary}
                                    onChange={handleChange}
                                    rows="2"
                                    disabled={submitting}
                                />
                                <label htmlFor="dietary">{t('rsvp.dietary')}</label>
                            </motion.div>

                            <motion.div
                                className="form-group"
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.3 }}
                            >
                                <textarea
                                    id="comments"
                                    name="comments"
                                    placeholder=" "
                                    value={formData.comments}
                                    onChange={handleChange}
                                    rows="2"
                                    disabled={submitting}
                                />
                                <label htmlFor="comments">Additional Comments</label>
                            </motion.div>

                            <motion.button
                                type="submit"
                                className="rsvp-submit-btn"
                                disabled={submitting}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.35 }}
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                            >
                                {submitting ? 'Sending...' : t('rsvp.submit')}
                            </motion.button>
                        </form>
                    )}
                </motion.div>
            </div>
        </Layout>
    );
};

export default RSVP;
