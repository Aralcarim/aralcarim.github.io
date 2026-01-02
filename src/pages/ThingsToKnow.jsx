import React from 'react';
import { useTranslation } from 'react-i18next';
import InfoPage from './InfoPage';

const ThingsToKnow = () => {
    const { t } = useTranslation();

    const twoColumnStyle = {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
        gap: '30px',
        marginBottom: '60px'
    };

    const threeColumnStyle = {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
        gap: '25px',
        marginBottom: '60px'
    };

    return (
        <InfoPage
            title={t('things_to_know.title')}
            imagePlaceholder="💡"
        >
            {/* Money Matters - 2 Columns */}
            <div style={{ marginBottom: '60px' }}>
                <h3 style={{
                    fontFamily: "'Playfair Display', serif",
                    color: 'var(--color-primary)',
                    marginBottom: '4px',
                    fontSize: '1.8rem',
                    fontWeight: '600',
                    letterSpacing: '0.3px',
                    textShadow: '0 1px 2px rgba(0,0,0,0.1)'
                }}>
                    {t('things_to_know.money.title')}
                </h3>
                <p style={{ color: '#666', marginBottom: '20px', fontStyle: 'italic', maxWidth: '700px' }}>
                    {t('things_to_know.money.desc')}
                </p>
                <div style={twoColumnStyle}>
                    <div>
                        <h4 style={{
                            fontFamily: "'Playfair Display', serif",
                            color: 'var(--color-gold)',
                            marginBottom: '10px',
                            fontSize: '1.2rem'
                        }}>
                            💶 {t('things_to_know.money.currency.title')}
                        </h4>
                        <p style={{ color: '#666', lineHeight: '1.6', marginBottom: '8px', fontSize: '0.95rem' }}>
                            {t('things_to_know.money.currency.desc')}
                        </p>
                        <p style={{
                            color: '#999',
                            fontWeight: '500',
                            fontSize: '0.9rem',
                            margin: 0,
                            fontStyle: 'italic'
                        }}>
                            {t('things_to_know.money.currency.tip')}
                        </p>
                    </div>

                    <div>
                        <h4 style={{
                            fontFamily: "'Playfair Display', serif",
                            color: 'var(--color-gold)',
                            marginBottom: '10px',
                            fontSize: '1.2rem'
                        }}>
                            🤝 {t('things_to_know.money.tipping.title')}
                        </h4>
                        <p style={{ color: '#666', lineHeight: '1.6', marginBottom: '8px', fontSize: '0.95rem' }}>
                            {t('things_to_know.money.tipping.desc')}
                        </p>
                        <p style={{
                            color: '#999',
                            fontWeight: '500',
                            fontSize: '0.9rem',
                            margin: 0,
                            fontStyle: 'italic'
                        }}>
                            {t('things_to_know.money.tipping.amount')}
                        </p>
                    </div>
                </div>
            </div>

            {/* Weather & What to Pack - 3 Columns */}
            <div style={{ marginBottom: '60px' }}>
                <h3 style={{
                    fontFamily: "'Playfair Display', serif",
                    color: 'var(--color-primary)',
                    marginBottom: '4px',
                    fontSize: '1.8rem',
                    fontWeight: '600',
                    letterSpacing: '0.3px',
                    textShadow: '0 1px 2px rgba(0,0,0,0.1)'
                }}>
                    {t('things_to_know.weather.title')}
                </h3>
                <p style={{ color: '#666', marginBottom: '20px', fontStyle: 'italic', maxWidth: '700px' }}>
                    {t('things_to_know.weather.desc')}
                </p>
                <div style={threeColumnStyle}>
                    <div>
                        <h4 style={{
                            fontFamily: "'Playfair Display', serif",
                            color: 'var(--color-lilac)',
                            marginBottom: '8px',
                            fontSize: '1.1rem'
                        }}>
                            ☀️ {t('things_to_know.weather.june.title')}
                        </h4>
                        <p style={{ color: '#666', lineHeight: '1.6', margin: 0, fontSize: '0.9rem' }}>
                            {t('things_to_know.weather.june.desc')}
                        </p>
                    </div>

                    <div>
                        <h4 style={{
                            fontFamily: "'Playfair Display', serif",
                            color: 'var(--color-peach)',
                            marginBottom: '8px',
                            fontSize: '1.1rem'
                        }}>
                            👗 {t('things_to_know.weather.attire.title')}
                        </h4>
                        <p style={{ color: '#666', lineHeight: '1.6', margin: 0, fontSize: '0.9rem' }}>
                            {t('things_to_know.weather.attire.desc')}
                        </p>
                    </div>

                    <div>
                        <h4 style={{
                            fontFamily: "'Playfair Display', serif",
                            color: 'var(--color-pink)',
                            marginBottom: '8px',
                            fontSize: '1.1rem'
                        }}>
                            👟 {t('things_to_know.weather.footwear.title')}
                        </h4>
                        <p style={{ color: '#666', lineHeight: '1.6', margin: 0, fontSize: '0.9rem' }}>
                            {t('things_to_know.weather.footwear.desc')}
                        </p>
                    </div>
                </div>
            </div>

            {/* Italian Customs - 2 Columns */}
            <div style={{ marginBottom: '60px' }}>
                <h3 style={{
                    fontFamily: "'Playfair Display', serif",
                    color: 'var(--color-primary)',
                    marginBottom: '4px',
                    fontSize: '1.8rem',
                    fontWeight: '600',
                    letterSpacing: '0.3px',
                    textShadow: '0 1px 2px rgba(0,0,0,0.1)'
                }}>
                    {t('things_to_know.customs.title')}
                </h3>
                <p style={{ color: '#666', marginBottom: '20px', fontStyle: 'italic', maxWidth: '700px' }}>
                    {t('things_to_know.customs.desc')}
                </p>
                <div style={twoColumnStyle}>
                    <div>
                        <h4 style={{
                            fontFamily: "'Playfair Display', serif",
                            color: 'var(--color-primary)',
                            marginBottom: '10px',
                            fontSize: '1.2rem'
                        }}>
                            🌅 {t('things_to_know.customs.riposo.title')}
                        </h4>
                        <p style={{ color: '#666', lineHeight: '1.6', marginBottom: '8px', fontSize: '0.95rem' }}>
                            {t('things_to_know.customs.riposo.desc')}
                        </p>
                        <p style={{
                            color: '#999',
                            fontWeight: '500',
                            fontSize: '0.9rem',
                            margin: 0,
                            fontStyle: 'italic'
                        }}>
                            {t('things_to_know.customs.riposo.hours')}
                        </p>
                    </div>

                    <div>
                        <h4 style={{
                            fontFamily: "'Playfair Display', serif",
                            color: 'var(--color-primary)',
                            marginBottom: '10px',
                            fontSize: '1.2rem'
                        }}>
                            🍽️ {t('things_to_know.customs.dining.title')}
                        </h4>
                        <p style={{ color: '#666', lineHeight: '1.6', marginBottom: '8px', fontSize: '0.95rem' }}>
                            {t('things_to_know.customs.dining.desc')}
                        </p>
                        <p style={{
                            color: '#999',
                            fontWeight: '500',
                            fontSize: '0.9rem',
                            margin: 0,
                            fontStyle: 'italic'
                        }}>
                            {t('things_to_know.customs.dining.reservations')}
                        </p>
                    </div>
                </div>
            </div>

            {/* Local Essentials - 3 Columns */}
            <div style={{ marginBottom: '60px' }}>
                <h3 style={{
                    fontFamily: "'Playfair Display', serif",
                    color: 'var(--color-primary)',
                    marginBottom: '4px',
                    fontSize: '1.8rem',
                    fontWeight: '600',
                    letterSpacing: '0.3px',
                    textShadow: '0 1px 2px rgba(0,0,0,0.1)'
                }}>
                    {t('things_to_know.essentials.title')}
                </h3>
                <div style={threeColumnStyle}>
                    <div>
                        <h4 style={{
                            fontFamily: "'Playfair Display', serif",
                            color: 'var(--color-lilac)',
                            marginBottom: '8px',
                            fontSize: '1.1rem'
                        }}>
                            🗣️ {t('things_to_know.essentials.language.title')}
                        </h4>
                        <p style={{ color: '#666', lineHeight: '1.6', margin: 0, fontSize: '0.9rem' }}>
                            {t('things_to_know.essentials.language.desc')}
                        </p>
                    </div>

                    <div>
                        <h4 style={{
                            fontFamily: "'Playfair Display', serif",
                            color: 'var(--color-peach)',
                            marginBottom: '8px',
                            fontSize: '1.1rem'
                        }}>
                            💧 {t('things_to_know.essentials.water.title')}
                        </h4>
                        <p style={{ color: '#666', lineHeight: '1.6', margin: 0, fontSize: '0.9rem' }}>
                            {t('things_to_know.essentials.water.desc')}
                        </p>
                    </div>

                    <div>
                        <h4 style={{
                            fontFamily: "'Playfair Display', serif",
                            color: 'var(--color-pink)',
                            marginBottom: '8px',
                            fontSize: '1.1rem'
                        }}>
                            🏖️ {t('things_to_know.essentials.beaches.title')}
                        </h4>
                        <p style={{ color: '#666', lineHeight: '1.6', margin: 0, fontSize: '0.9rem' }}>
                            {t('things_to_know.essentials.beaches.desc')}
                        </p>
                    </div>
                </div>
            </div>

            {/* Food & Drink - 2 Columns */}
            <div>
                <h3 style={{
                    fontFamily: "'Playfair Display', serif",
                    color: 'var(--color-primary)',
                    marginBottom: '4px',
                    fontSize: '1.8rem',
                    fontWeight: '600',
                    letterSpacing: '0.3px',
                    textShadow: '0 1px 2px rgba(0,0,0,0.1)'
                }}>
                    {t('things_to_know.food.title')}
                </h3>
                <p style={{ color: '#666', marginBottom: '20px', fontStyle: 'italic', maxWidth: '700px' }}>
                    {t('things_to_know.food.desc')}
                </p>
                <div style={twoColumnStyle}>
                    <div>
                        <h4 style={{
                            fontFamily: "'Playfair Display', serif",
                            color: 'var(--color-primary)',
                            marginBottom: '10px',
                            fontSize: '1.2rem'
                        }}>
                            🍝 {t('things_to_know.food.specialties.title')}
                        </h4>
                        <p style={{ color: '#666', lineHeight: '1.6', marginBottom: '8px', fontSize: '0.95rem' }}>
                            {t('things_to_know.food.specialties.desc')}
                        </p>
                        <p style={{
                            color: '#999',
                            fontSize: '0.85rem',
                            fontStyle: 'italic',
                            margin: 0
                        }}>
                            {t('things_to_know.food.specialties.examples')}
                        </p>
                    </div>

                    <div>
                        <h4 style={{
                            fontFamily: "'Playfair Display', serif",
                            color: 'var(--color-primary)',
                            marginBottom: '10px',
                            fontSize: '1.2rem'
                        }}>
                            🍷 {t('things_to_know.food.wine.title')}
                        </h4>
                        <p style={{ color: '#666', lineHeight: '1.6', marginBottom: '8px', fontSize: '0.95rem' }}>
                            {t('things_to_know.food.wine.desc')}
                        </p>
                        <p style={{
                            color: '#999',
                            fontSize: '0.85rem',
                            fontStyle: 'italic',
                            margin: 0
                        }}>
                            {t('things_to_know.food.wine.note')}
                        </p>
                    </div>
                </div>
            </div>
        </InfoPage>
    );
};

export default ThingsToKnow;
