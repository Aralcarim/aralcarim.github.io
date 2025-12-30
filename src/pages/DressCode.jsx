import React from 'react';
import { useTranslation } from 'react-i18next';
import InfoPage from './InfoPage';

const DressCode = () => {
    const { t } = useTranslation();

    return (
        <InfoPage
            title={t('dress_code.title')}
            description={t('dress_code.desc')}
            imagePlaceholder="👔"
        >
            <div className="info-card">
                <h3>{t('nav.dress_code')}</h3>
                <p><strong>Gentlemen:</strong> {t('dress_code.gentlemen')}</p>
                <p><strong>Ladies:</strong> {t('dress_code.ladies')}</p>
                <div style={{ marginTop: '20px', padding: '15px', background: '#fcf8e3', borderRadius: '4px', border: '1px solid #faebcc' }}>
                    <p style={{ margin: 0, color: '#8a6d3b', fontSize: '0.9rem' }}>
                        ⚠️ {t('dress_code.note')}
                    </p>
                </div>
            </div>
        </InfoPage>
    );
};

export default DressCode;
