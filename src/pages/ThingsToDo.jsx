import React from 'react';
import { useTranslation } from 'react-i18next';
import InfoPage from './InfoPage';

const ThingsToDo = () => {
    const { t } = useTranslation();

    return (
        <InfoPage
            title={t('things_to_do.title')}
            description={t('things_to_do.desc')}
            imagePlaceholder="🍦"
        >
            <div className="info-card">
                <h3>{t('things_to_do.item1.title')}</h3>
                <p>{t('things_to_do.item1.desc')}</p>
            </div>

            <div className="info-card">
                <h3>{t('things_to_do.item2.title')}</h3>
                <p>{t('things_to_do.item2.desc')}</p>
            </div>

            <div className="info-card">
                <h3>{t('things_to_do.item3.title')}</h3>
                <p>{t('things_to_do.item3.desc')}</p>
            </div>

            <p style={{ textAlign: 'center', marginTop: '40px', color: '#888' }}>
                <em>Apulia is full of hidden gems. Don't hesitate to explore!</em>
            </p>
        </InfoPage>
    );
};

export default ThingsToDo;
