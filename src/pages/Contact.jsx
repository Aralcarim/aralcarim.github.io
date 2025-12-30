import React from 'react';
import { useTranslation } from 'react-i18next';
import InfoPage from './InfoPage';

const Contact = () => {
    const { t } = useTranslation();

    return (
        <InfoPage
            title={t('contact.title')}
            description={t('contact.desc')}
            imagePlaceholder="✉️"
        >
            <div className="info-card">
                <h3>Get in Touch</h3>
                <p>{t('contact.vaclav')}</p>
                <p>{t('contact.cinzia')}</p>
            </div>

            <div className="info-card" style={{ borderLeftColor: '#eee' }}>
                <h3>Social Media</h3>
                <p>Feel free to tag us in your posts using our official hashtag:</p>
                <p style={{ fontSize: '1.5rem', color: 'var(--color-gold)', fontFamily: 'var(--font-heading)' }}>
                    #VanZiaWedding2026
                </p>
            </div>
        </InfoPage>
    );
};

export default Contact;
