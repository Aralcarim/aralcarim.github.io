import React from 'react';
import { useTranslation } from 'react-i18next';

const Footer = () => {
    const { t } = useTranslation();
    return (
        <footer style={{
            textAlign: 'center',
            padding: '20px 0',
            marginTop: '20px',
            fontSize: '0.9rem',
            color: '#666'
        }}>
            <p style={{ fontFamily: 'var(--font-heading)', fontSize: '1.2rem', marginBottom: '10px' }}>
                Cinzia <span className="text-gold">&</span> Vaclav
            </p>
            <p>{t('footer.hashtag')}</p>
        </footer>
    );
};

export default Footer;
