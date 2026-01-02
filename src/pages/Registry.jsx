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
            <div style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '30px',
                padding: '40px 20px',
                textAlign: 'center'
            }}>
                <div style={{
                    fontSize: '4rem',
                    filter: 'drop-shadow(0 4px 10px rgba(212, 175, 55, 0.4))',
                    animation: 'float 3s ease-in-out infinite'
                }}>
                    💝
                </div>

                <div style={{
                    maxWidth: '500px',
                    background: 'linear-gradient(135deg, #fff 0%, #fef9f0 100%)',
                    padding: '40px',
                    borderRadius: '16px',
                    boxShadow: '0 10px 40px rgba(212, 175, 55, 0.15)',
                    border: '2px solid rgba(212, 175, 55, 0.2)'
                }}>
                    <h3 style={{
                        fontFamily: 'var(--font-heading)',
                        color: 'var(--color-primary)',
                        fontSize: '1.8rem',
                        marginBottom: '20px',
                        fontWeight: 'normal'
                    }}>
                        Honeymoon Fund
                    </h3>

                    <p style={{
                        color: '#666',
                        fontSize: '1.05rem',
                        lineHeight: '1.7',
                        marginBottom: '25px'
                    }}>
                        Your presence is the greatest gift. If you wish to honor us with something more, a contribution towards our honeymoon adventures would mean the world.
                    </p>

                    <a
                        href="#"
                        onClick={(e) => e.preventDefault()}
                        style={{
                            display: 'inline-block',
                            padding: '14px 32px',
                            background: 'linear-gradient(135deg, var(--color-gold) 0%, #c9a227 100%)',
                            color: '#fff',
                            textDecoration: 'none',
                            borderRadius: '30px',
                            fontWeight: '600',
                            fontSize: '1.1rem',
                            boxShadow: '0 4px 15px rgba(212, 175, 55, 0.4)',
                            transition: 'all 0.3s ease'
                        }}
                        onMouseOver={(e) => {
                            e.target.style.transform = 'translateY(-2px)';
                            e.target.style.boxShadow = '0 6px 20px rgba(212, 175, 55, 0.5)';
                        }}
                        onMouseOut={(e) => {
                            e.target.style.transform = 'translateY(0)';
                            e.target.style.boxShadow = '0 4px 15px rgba(212, 175, 55, 0.4)';
                        }}
                    >
                        {t('registry.link')} ✨
                    </a>
                </div>

                <p style={{
                    color: 'var(--color-gold)',
                    fontSize: '0.9rem',
                    letterSpacing: '1px',
                    textTransform: 'uppercase',
                    marginTop: '10px'
                }}>
                    ♡ With gratitude ♡
                </p>
            </div>
        </InfoPage>
    );
};

export default Registry;
