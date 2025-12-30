import React from 'react';
import { useTranslation } from 'react-i18next';
import InfoPage from './InfoPage';

const Travel = () => {
    const { t } = useTranslation();

    return (
        <InfoPage
            title={t('travel.title')}
            description={t('travel.airports.desc')}
            imagePlaceholder="✈️"
        >
            <div className="info-card">
                <h3>{t('travel.airports.title')}</h3>
                <p>{t('travel.airports.desc')}</p>
            </div>

            <div className="info-card">
                <h3>{t('travel.hotels.title')}</h3>
                <ul style={{ listStyle: 'none', padding: 0 }}>
                    <li style={{ marginBottom: '15px' }}>
                        <strong>Masseria Relais</strong><br />
                        <span style={{ fontSize: '0.9rem', color: '#777' }}>{t('travel.hotels.hotel1')}</span>
                    </li>
                    <li style={{ marginBottom: '15px' }}>
                        <strong>Hotel Apulia</strong><br />
                        <span style={{ fontSize: '0.9rem', color: '#777' }}>{t('travel.hotels.hotel2')}</span>
                    </li>
                    <li>
                        <strong>B&B Garden</strong><br />
                        <span style={{ fontSize: '0.9rem', color: '#777' }}>{t('travel.hotels.hotel3')}</span>
                    </li>
                </ul>
            </div>

            <div className="info-card">
                <h3>Transport</h3>
                <p>{t('faq.questions.transportation_a')}</p>
            </div>
        </InfoPage>
    );
};

export default Travel;
