import React from 'react';
import { useTranslation } from 'react-i18next';
import InfoPage from './InfoPage';

const ThingsToKnow = () => {
    const { t } = useTranslation();

    return (
        <InfoPage
            title={t('things_to_know.title')}
            description={t('things_to_know.desc')}
            imagePlaceholder="💡"
        >
            <div className="info-card">
                <h3>{t('things_to_know.title')}</h3>
                <ul style={{ listStyle: 'none', padding: 0 }}>
                    <li style={{ marginBottom: '15px' }}>
                        <strong>Currency & Payments</strong><br />
                        <span style={{ fontSize: '0.9rem', color: '#777' }}>{t('things_to_know.tip1')}</span>
                    </li>
                    <li style={{ marginBottom: '15px' }}>
                        <strong>Weather</strong><br />
                        <span style={{ fontSize: '0.9rem', color: '#777' }}>{t('things_to_know.tip2')}</span>
                    </li>
                    <li>
                        <strong>Tipping</strong><br />
                        <span style={{ fontSize: '0.9rem', color: '#777' }}>{t('things_to_know.tip3')}</span>
                    </li>
                </ul>
            </div>
        </InfoPage>
    );
};

export default ThingsToKnow;
