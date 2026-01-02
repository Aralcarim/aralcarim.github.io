import React from 'react';
import { useTranslation } from 'react-i18next';
import InfoPage from './InfoPage';

const Travel = () => {
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
            title={t('travel.title')}
            imagePlaceholder="✈️"
        >
            {/* Airports - 2 Columns */}
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
                    {t('travel.airports.title')}
                </h3>
                <div style={twoColumnStyle}>
                    <div>
                        <h4 style={{
                            fontFamily: "'Playfair Display', serif",
                            color: 'var(--color-gold)',
                            marginBottom: '10px',
                            fontSize: '1.2rem'
                        }}>
                            ✈️ {t('travel.airports.pescara.name')}
                        </h4>
                        <p style={{ color: '#666', lineHeight: '1.6', marginBottom: '8px', fontSize: '0.95rem' }}>
                            {t('travel.airports.pescara.desc')}
                        </p>
                        <p style={{
                            color: '#999',
                            fontWeight: '500',
                            fontSize: '0.9rem',
                            margin: 0
                        }}>
                            {t('travel.airports.pescara.drive')}
                        </p>
                    </div>

                    <div>
                        <h4 style={{
                            fontFamily: "'Playfair Display', serif",
                            color: 'var(--color-gold)',
                            marginBottom: '10px',
                            fontSize: '1.2rem'
                        }}>
                            ✈️ {t('travel.airports.bari.name')}
                        </h4>
                        <p style={{ color: '#666', lineHeight: '1.6', marginBottom: '8px', fontSize: '0.95rem' }}>
                            {t('travel.airports.bari.desc')}
                        </p>
                        <p style={{
                            color: '#999',
                            fontWeight: '500',
                            fontSize: '0.9rem',
                            margin: 0
                        }}>
                            {t('travel.airports.bari.drive')}
                        </p>
                    </div>
                </div>
            </div>

            {/* Getting to Apricena - 3 Columns */}
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
                    {t('travel.toCity.title')}
                </h3>
                <p style={{ color: '#666', marginBottom: '8px', fontStyle: 'italic', maxWidth: '700px' }}>
                    {t('travel.toCity.desc')}
                </p>
                <div style={threeColumnStyle}>
                    <div>
                        <h4 style={{
                            fontFamily: "'Playfair Display', serif",
                            color: 'var(--color-lilac)',
                            marginBottom: '8px',
                            fontSize: '1.1rem'
                        }}>
                            🚗 {t('travel.toCity.rental')}
                        </h4>
                        <p style={{ color: '#666', lineHeight: '1.6', margin: 0, fontSize: '0.9rem' }}>
                            {t('travel.toCity.rentalDesc')}
                        </p>
                    </div>

                    <div>
                        <h4 style={{
                            fontFamily: "'Playfair Display', serif",
                            color: 'var(--color-peach)',
                            marginBottom: '8px',
                            fontSize: '1.1rem'
                        }}>
                            🚐 {t('travel.toCity.shuttle')}
                        </h4>
                        <p style={{ color: '#666', lineHeight: '1.6', margin: 0, fontSize: '0.9rem' }}>
                            {t('travel.toCity.shuttleDesc')}
                        </p>
                    </div>

                    <div>
                        <h4 style={{
                            fontFamily: "'Playfair Display', serif",
                            color: 'var(--color-pink)',
                            marginBottom: '8px',
                            fontSize: '1.1rem'
                        }}>
                            🚂 {t('travel.toCity.train')}
                        </h4>
                        <p style={{ color: '#666', lineHeight: '1.6', margin: 0, fontSize: '0.9rem' }}>
                            {t('travel.toCity.trainDesc')}
                        </p>
                    </div>
                </div>
            </div>

            {/* Getting to Venue - 2 Columns */}
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
                    {t('travel.toVenue.title')}
                </h3>
                <p style={{ color: '#666', marginBottom: '8px', fontStyle: 'italic', maxWidth: '700px' }}>
                    {t('travel.toVenue.desc')}
                </p>
                <div style={twoColumnStyle}>
                    <div>
                        <h4 style={{
                            fontFamily: "'Playfair Display', serif",
                            color: 'var(--color-primary)',
                            marginBottom: '10px',
                            fontSize: '1.1rem'
                        }}>
                            📍 {t('travel.toVenue.fromApricena')}
                        </h4>
                        <p style={{ color: '#666', lineHeight: '1.6', margin: 0, fontSize: '0.95rem' }}>
                            {t('travel.toVenue.fromApricenaDesc')}
                        </p>
                    </div>

                    <div>
                        <h4 style={{
                            fontFamily: "'Playfair Display', serif",
                            color: 'var(--color-primary)',
                            marginBottom: '10px',
                            fontSize: '1.1rem'
                        }}>
                            🅿️ {t('travel.toVenue.parking')}
                        </h4>
                        <p style={{ color: '#666', lineHeight: '1.6', margin: 0, fontSize: '0.95rem' }}>
                            {t('travel.toVenue.parkingDesc')}
                        </p>
                    </div>
                </div>
            </div>

            {/* Where to Stay - 2 Columns */}
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
                    {t('travel.hotels.title')}
                </h3>
                <div style={twoColumnStyle}>
                    <div>
                        <h4 style={{
                            fontFamily: "'Playfair Display', serif",
                            color: 'var(--color-primary)',
                            marginBottom: '12px',
                            fontSize: '1.2rem'
                        }}>
                            🏨 {t('travel.hotels.hotel.name')}
                        </h4>
                        <p style={{ color: '#666', lineHeight: '1.6', marginBottom: '10px', fontSize: '0.95rem' }}>
                            {t('travel.hotels.hotel.desc')}
                        </p>
                        <p style={{
                            color: '#999',
                            fontSize: '0.85rem',
                            fontStyle: 'italic',
                            margin: 0
                        }}>
                            {t('travel.hotels.hotel.examples')}
                        </p>
                    </div>

                    <div>
                        <h4 style={{
                            fontFamily: "'Playfair Display', serif",
                            color: 'var(--color-primary)',
                            marginBottom: '12px',
                            fontSize: '1.2rem'
                        }}>
                            🏡 {t('travel.hotels.bnb.name')}
                        </h4>
                        <p style={{ color: '#666', lineHeight: '1.6', marginBottom: '10px', fontSize: '0.95rem' }}>
                            {t('travel.hotels.bnb.desc')}
                        </p>
                        <p style={{
                            color: '#999',
                            fontSize: '0.85rem',
                            fontStyle: 'italic',
                            margin: 0
                        }}>
                            {t('travel.hotels.bnb.examples')}
                        </p>
                    </div>
                </div>
            </div>
        </InfoPage>
    );
};

export default Travel;
