import React, { useState } from 'react';
import Layout from '../layout/Layout';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';

const RSVP = () => {
    const { t } = useTranslation();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        guests: 1,
        attending: 'yes',
        dietary: ''
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        alert(t('rsvp.alert', { name: formData.name }));
    };

    const inputStyle = {
        width: '100%',
        padding: '12px',
        margin: '10px 0',
        border: '1px solid #ddd',
        borderRadius: '4px',
        fontFamily: 'var(--font-body)'
    };

    return (
        <Layout>
            <div className="container" style={{ padding: '60px 20px', maxWidth: '600px' }}>
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="rsvp-card"
                    style={{
                        background: '#fff',
                        padding: '40px',
                        borderRadius: '8px',
                        boxShadow: '0 5px 30px rgba(0,0,0,0.05)'
                    }}
                >
                    <h1 className="text-center" style={{ marginBottom: '10px' }}>{t('rsvp.title')}</h1>
                    <p className="text-center" style={{ marginBottom: '30px' }}>{t('rsvp.deadline')}</p>

                    <form onSubmit={handleSubmit}>
                        <div>
                            <label>{t('rsvp.name')}</label>
                            <input
                                type="text"
                                name="name"
                                required
                                value={formData.name}
                                onChange={handleChange}
                                style={inputStyle}
                            />
                        </div>

                        <div>
                            <label>{t('rsvp.email')}</label>
                            <input
                                type="email"
                                name="email"
                                required
                                value={formData.email}
                                onChange={handleChange}
                                style={inputStyle}
                            />
                        </div>

                        <div style={{ margin: '15px 0' }}>
                            <label style={{ marginRight: '20px' }}>{t('rsvp.attending')}</label>
                            <label style={{ marginRight: '15px' }}>
                                <input
                                    type="radio"
                                    name="attending"
                                    value="yes"
                                    checked={formData.attending === 'yes'}
                                    onChange={handleChange}
                                    style={{ marginRight: '5px' }}
                                />
                                {t('rsvp.yes')}
                            </label>
                            <label>
                                <input
                                    type="radio"
                                    name="attending"
                                    value="no"
                                    checked={formData.attending === 'no'}
                                    onChange={handleChange}
                                    style={{ marginRight: '5px' }}
                                />
                                {t('rsvp.no')}
                            </label>
                        </div>

                        {formData.attending === 'yes' && (
                            <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: 'auto', opacity: 1 }}
                            >
                                <div>
                                    <label>{t('rsvp.guests')}</label>
                                    <select
                                        name="guests"
                                        value={formData.guests}
                                        onChange={handleChange}
                                        style={inputStyle}
                                    >
                                        <option value="1">{t('rsvp.guest_count', { count: 1 })}</option>
                                        <option value="2">{t('rsvp.guest_count_plural', { count: 2 })}</option>
                                        <option value="3">{t('rsvp.guest_count_plural', { count: 3 })}</option>
                                    </select>
                                </div>
                                <div>
                                    <label>{t('rsvp.dietary')}</label>
                                    <textarea
                                        name="dietary"
                                        rows="3"
                                        value={formData.dietary}
                                        onChange={handleChange}
                                        style={inputStyle}
                                        placeholder={t('rsvp.dietary_placeholder')}
                                    />
                                </div>
                            </motion.div>
                        )}

                        <button type="submit" style={{
                            width: '100%',
                            padding: '15px',
                            background: 'var(--color-gold)',
                            color: '#fff',
                            border: 'none',
                            borderRadius: '4px',
                            fontSize: '1rem',
                            fontWeight: '600',
                            cursor: 'pointer',
                            marginTop: '20px',
                            letterSpacing: '1px',
                            textTransform: 'uppercase'
                        }}>
                            {t('rsvp.submit')}
                        </button>
                    </form>
                </motion.div>
            </div>
        </Layout>
    );
};

export default RSVP;
