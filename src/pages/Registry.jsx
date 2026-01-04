import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import InfoPage from './InfoPage';

const Registry = () => {
    const { t } = useTranslation();
    const [revealedInfo, setRevealedInfo] = useState({});

    // SVG Flag components
    const flagIcons = {
        eu: (
            <svg className="registry-flag-icon" viewBox="0 0 90 60" title="European Union">
                <rect width="90" height="60" fill="#003399"/>
                <defs>
                    <polygon id="eu-star" points="0,-3 0.7,-0.9 2.9,-0.9 1.1,0.4 1.8,2.6 0,1.3 -1.8,2.6 -1.1,0.4 -2.9,-0.9 -0.7,-0.9"/>
                </defs>
                <g fill="#FFCC00" transform="translate(45, 30)">
                    <use href="#eu-star" transform="rotate(0) translate(0, -18)"/>
                    <use href="#eu-star" transform="rotate(30) translate(0, -18) rotate(-30)"/>
                    <use href="#eu-star" transform="rotate(60) translate(0, -18) rotate(-60)"/>
                    <use href="#eu-star" transform="rotate(90) translate(0, -18) rotate(-90)"/>
                    <use href="#eu-star" transform="rotate(120) translate(0, -18) rotate(-120)"/>
                    <use href="#eu-star" transform="rotate(150) translate(0, -18) rotate(-150)"/>
                    <use href="#eu-star" transform="rotate(180) translate(0, -18) rotate(-180)"/>
                    <use href="#eu-star" transform="rotate(210) translate(0, -18) rotate(-210)"/>
                    <use href="#eu-star" transform="rotate(240) translate(0, -18) rotate(-240)"/>
                    <use href="#eu-star" transform="rotate(270) translate(0, -18) rotate(-270)"/>
                    <use href="#eu-star" transform="rotate(300) translate(0, -18) rotate(-300)"/>
                    <use href="#eu-star" transform="rotate(330) translate(0, -18) rotate(-330)"/>
                </g>
            </svg>
        ),
        uk: (
            <svg className="registry-flag-icon" viewBox="0 0 60 30" title="United Kingdom">
                <clipPath id="uk-clip-registry"><rect width="60" height="30"/></clipPath>
                <g clipPath="url(#uk-clip-registry)">
                    <rect width="60" height="30" fill="#012169"/>
                    <path d="M0 0l60 30M60 0L0 30" stroke="#fff" strokeWidth="6"/>
                    <path d="M0 0l60 30M60 0L0 30" stroke="#C8102E" strokeWidth="4"/>
                    <path d="M30 0v30M0 15h60" stroke="#fff" strokeWidth="10"/>
                    <path d="M30 0v30M0 15h60" stroke="#C8102E" strokeWidth="6"/>
                </g>
            </svg>
        )
    };

    // Bank information - base64 encoded to prevent scraping
    // To encode: btoa("your-bank-info-here")
    const bankData = {
        eu: {
            iban: 'RVlVMDIwMDAwMDAwMDAwMDAwMDAw', // Placeholder: EU00...
            bic: 'RVlVQklDMFhYWA==', // Placeholder: EUYBIC1XXX
            bank: 'RXUgQmFuayBOYW1l' // Placeholder: Eu Bank Name
        },
        uk: {
            account: 'VWsgQWNjb3VudCBOdW1iZXI=', // Placeholder: Uk Account Number
            sort: 'MDAtMDAtMDA=', // Placeholder: 00-00-00
            bank: 'VWsgQmFuayBOYW1l' // Placeholder: Uk Bank Name
        }
    };

    const revealInfo = (region, type) => {
        const key = `${region}_${type}`;
        try {
            const decoded = atob(bankData[region][type]);
            setRevealedInfo(prev => ({ ...prev, [key]: decoded }));
        } catch (e) {
            console.error('Failed to decode bank info');
        }
    };

    const copyToClipboard = (text) => {
        navigator.clipboard.writeText(text);
    };

    const BankDetail = ({ label, value, revealed, revealLabel, region, type }) => {
        if (revealed) {
            return (
                <div className="registry-bank-detail">
                    <span className="registry-bank-label">{label}:</span>
                    <div className="registry-bank-value-container">
                        <span className="registry-bank-value">{value}</span>
                        <button
                            className="registry-copy-btn"
                            onClick={() => copyToClipboard(value)}
                            aria-label="Copy to clipboard"
                        >
                            <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                                <path d="M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 16H8V7h11v14z"/>
                            </svg>
                        </button>
                    </div>
                </div>
            );
        }
        return (
            <button
                className="registry-reveal-btn"
                onClick={() => revealInfo(region, type)}
            >
                {revealLabel}
            </button>
        );
    };

    return (
        <InfoPage
            title={t('registry.title')}
            description={t('registry.presence_text')}
            imagePlaceholder="💝"
        >
            <div className="registry-container">
                {/* Divider */}
                <div className="registry-divider">
                    <div className="registry-divider-line"></div>
                    <span className="registry-divider-text">✦</span>
                    <div className="registry-divider-line"></div>
                </div>

                {/* Honeymoon Fund Section */}
                <div className="registry-honeymoon-section">
                    <div className="registry-honeymoon-header">
                        <span className="registry-honeymoon-icon">✈️</span>
                        <h3 className="registry-honeymoon-title">{t('registry.honeymoon_title')}</h3>
                    </div>
                    <p className="registry-honeymoon-text">{t('registry.honeymoon_text')}</p>

                    {/* Bank Information */}
                    <div className="registry-banking-section">
                        {/* EU Bank */}
                        <div className="registry-bank-card">
                            <div className="registry-bank-header">
                                {flagIcons.eu}
                                <h4 className="registry-bank-title">{t('registry.eu_bank')}</h4>
                            </div>
                            <div className="registry-bank-details">
                                <BankDetail
                                    label={t('registry.iban')}
                                    value={revealedInfo.eu_iban}
                                    revealed={revealedInfo.eu_iban}
                                    revealLabel={t('registry.reveal_details')}
                                    region="eu"
                                    type="iban"
                                />
                                <BankDetail
                                    label={t('registry.bic')}
                                    value={revealedInfo.eu_bic}
                                    revealed={revealedInfo.eu_bic}
                                    revealLabel={t('registry.reveal_details')}
                                    region="eu"
                                    type="bic"
                                />
                                {revealedInfo.eu_bank && (
                                    <p className="registry-bank-name">{revealedInfo.eu_bank}</p>
                                )}
                            </div>
                        </div>

                        {/* UK Bank */}
                        <div className="registry-bank-card">
                            <div className="registry-bank-header">
                                {flagIcons.uk}
                                <h4 className="registry-bank-title">{t('registry.uk_bank')}</h4>
                            </div>
                            <div className="registry-bank-details">
                                <BankDetail
                                    label={t('registry.account_number')}
                                    value={revealedInfo.uk_account}
                                    revealed={revealedInfo.uk_account}
                                    revealLabel={t('registry.reveal_details')}
                                    region="uk"
                                    type="account"
                                />
                                <BankDetail
                                    label={t('registry.sort_code')}
                                    value={revealedInfo.uk_sort}
                                    revealed={revealedInfo.uk_sort}
                                    revealLabel={t('registry.reveal_details')}
                                    region="uk"
                                    type="sort"
                                />
                                {revealedInfo.uk_bank && (
                                    <p className="registry-bank-name">{revealedInfo.uk_bank}</p>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Thank You Message */}
                    <div className="registry-thankyou">
                        <p className="registry-thankyou-text">{t('registry.thankyou')}</p>
                        <span className="registry-thankyou-heart">♡</span>
                    </div>
                </div>
            </div>
        </InfoPage>
    );
};

export default Registry;
