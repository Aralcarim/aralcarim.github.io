import React from 'react';
import { useTranslation } from 'react-i18next';
import InfoPage from './InfoPage';

const Registry = () => {
    const { t } = useTranslation();

    return (
        <InfoPage
            title={t('registry.title')}
            description={t('registry.desc')}
            imagePlaceholder="🎁"
        >
            <div className="info-card" style={{ textAlign: 'center' }}>
                <p>{t('registry.desc')}</p>
                <a href="#" className="info-link" onClick={(e) => e.preventDefault()}>
                    {t('registry.link')}
                </a>
            </div>
        </InfoPage>
    );
};

export default Registry;
