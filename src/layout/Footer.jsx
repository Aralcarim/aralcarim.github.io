import React from 'react';
import { useTranslation } from 'react-i18next';

const Footer = () => {
    const { t } = useTranslation();
    return (
        <footer style={{
            textAlign: 'center',
            padding: '40px 0',
            marginTop: '50px',
            borderTop: '1px solid #eee',
            fontSize: '0.9rem',
            color: '#666'
        }}>
            <p style={{ fontFamily: 'var(--font-heading)', fontSize: '1.2rem', marginBottom: '10px' }}>
                Vaclav <span className="text-gold">&</span> Cinzia
            </p>
            <p>{t('footer.hashtag')}</p>
        </footer>
    );
};

export default Footer;
