import React from 'react';
import { useTranslation } from 'react-i18next';
import InfoPage from './InfoPage';

const ThingsToDo = () => {
    const { t } = useTranslation();

    const threeColumnStyle = {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
        gap: '25px',
        marginBottom: '60px'
    };

    return (
        <InfoPage
            title={t('things_to_do.title')}
            imagePlaceholder="🍦"
        >
            {/* Beaches & Coastline - 3 Columns */}
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
                    {t('things_to_do.beaches.title')}
                </h3>
                <p style={{ color: '#666', marginBottom: '20px', fontStyle: 'italic', maxWidth: '700px' }}>
                    {t('things_to_do.beaches.desc')}
                </p>
                <div style={threeColumnStyle}>
                    <div>
                        <h4 style={{
                            fontFamily: "'Playfair Display', serif",
                            color: 'var(--color-lilac)',
                            marginBottom: '8px',
                            fontSize: '1.1rem'
                        }}>
                            🏖️ {t('things_to_do.beaches.rodi.title')}
                        </h4>
                        <p style={{ color: '#666', lineHeight: '1.6', margin: 0, fontSize: '0.9rem' }}>
                            {t('things_to_do.beaches.rodi.desc')}
                        </p>
                    </div>

                    <div>
                        <h4 style={{
                            fontFamily: "'Playfair Display', serif",
                            color: 'var(--color-peach)',
                            marginBottom: '8px',
                            fontSize: '1.1rem'
                        }}>
                            ⛱️ {t('things_to_do.beaches.vieste.title')}
                        </h4>
                        <p style={{ color: '#666', lineHeight: '1.6', margin: 0, fontSize: '0.9rem' }}>
                            {t('things_to_do.beaches.vieste.desc')}
                        </p>
                    </div>

                    <div>
                        <h4 style={{
                            fontFamily: "'Playfair Display', serif",
                            color: 'var(--color-pink)',
                            marginBottom: '8px',
                            fontSize: '1.1rem'
                        }}>
                            🌊 {t('things_to_do.beaches.peschici.title')}
                        </h4>
                        <p style={{ color: '#666', lineHeight: '1.6', margin: 0, fontSize: '0.9rem' }}>
                            {t('things_to_do.beaches.peschici.desc')}
                        </p>
                    </div>
                </div>
            </div>

            {/* Hill Towns & Culture - 3 Columns */}
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
                    {t('things_to_do.towns.title')}
                </h3>
                <p style={{ color: '#666', marginBottom: '20px', fontStyle: 'italic', maxWidth: '700px' }}>
                    {t('things_to_do.towns.desc')}
                </p>
                <div style={threeColumnStyle}>
                    <div>
                        <h4 style={{
                            fontFamily: "'Playfair Display', serif",
                            color: 'var(--color-gold)',
                            marginBottom: '10px',
                            fontSize: '1.2rem'
                        }}>
                            🏘️ {t('things_to_do.towns.alberobello.title')}
                        </h4>
                        <p style={{ color: '#666', lineHeight: '1.6', marginBottom: '8px', fontSize: '0.95rem' }}>
                            {t('things_to_do.towns.alberobello.desc')}
                        </p>
                        <p style={{
                            color: '#999',
                            fontWeight: '500',
                            fontSize: '0.85rem',
                            margin: 0,
                            fontStyle: 'italic'
                        }}>
                            {t('things_to_do.towns.alberobello.tip')}
                        </p>
                    </div>

                    <div>
                        <h4 style={{
                            fontFamily: "'Playfair Display', serif",
                            color: 'var(--color-gold)',
                            marginBottom: '10px',
                            fontSize: '1.2rem'
                        }}>
                            🏛️ {t('things_to_do.towns.ostuni.title')}
                        </h4>
                        <p style={{ color: '#666', lineHeight: '1.6', marginBottom: '8px', fontSize: '0.95rem' }}>
                            {t('things_to_do.towns.ostuni.desc')}
                        </p>
                        <p style={{
                            color: '#999',
                            fontWeight: '500',
                            fontSize: '0.85rem',
                            margin: 0,
                            fontStyle: 'italic'
                        }}>
                            {t('things_to_do.towns.ostuni.tip')}
                        </p>
                    </div>

                    <div>
                        <h4 style={{
                            fontFamily: "'Playfair Display', serif",
                            color: 'var(--color-gold)',
                            marginBottom: '10px',
                            fontSize: '1.2rem'
                        }}>
                            ⛪ {t('things_to_do.towns.polignano.title')}
                        </h4>
                        <p style={{ color: '#666', lineHeight: '1.6', margin: 0, fontSize: '0.95rem' }}>
                            {t('things_to_do.towns.polignano.desc')}
                        </p>
                    </div>
                </div>
            </div>

            {/* Nature & Outdoors - 3 Columns */}
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
                    {t('things_to_do.nature.title')}
                </h3>
                <p style={{ color: '#666', marginBottom: '20px', fontStyle: 'italic', maxWidth: '700px' }}>
                    {t('things_to_do.nature.desc')}
                </p>
                <div style={threeColumnStyle}>
                    <div>
                        <h4 style={{
                            fontFamily: "'Playfair Display', serif",
                            color: 'var(--color-lilac)',
                            marginBottom: '8px',
                            fontSize: '1.1rem'
                        }}>
                            🌲 {t('things_to_do.nature.forest.title')}
                        </h4>
                        <p style={{ color: '#666', lineHeight: '1.6', margin: 0, fontSize: '0.9rem' }}>
                            {t('things_to_do.nature.forest.desc')}
                        </p>
                    </div>

                    <div>
                        <h4 style={{
                            fontFamily: "'Playfair Display', serif",
                            color: 'var(--color-peach)',
                            marginBottom: '8px',
                            fontSize: '1.1rem'
                        }}>
                            🕳️ {t('things_to_do.nature.caves.title')}
                        </h4>
                        <p style={{ color: '#666', lineHeight: '1.6', margin: 0, fontSize: '0.9rem' }}>
                            {t('things_to_do.nature.caves.desc')}
                        </p>
                    </div>

                    <div>
                        <h4 style={{
                            fontFamily: "'Playfair Display', serif",
                            color: 'var(--color-pink)',
                            marginBottom: '8px',
                            fontSize: '1.1rem'
                        }}>
                            🏝️ {t('things_to_do.nature.tremiti.title')}
                        </h4>
                        <p style={{ color: '#666', lineHeight: '1.6', margin: 0, fontSize: '0.9rem' }}>
                            {t('things_to_do.nature.tremiti.desc')}
                        </p>
                    </div>
                </div>
            </div>

            {/* Food & Wine Experiences - 3 Columns */}
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
                    {t('things_to_do.food.title')}
                </h3>
                <p style={{ color: '#666', marginBottom: '20px', fontStyle: 'italic', maxWidth: '700px' }}>
                    {t('things_to_do.food.desc')}
                </p>
                <div style={threeColumnStyle}>
                    <div>
                        <h4 style={{
                            fontFamily: "'Playfair Display', serif",
                            color: 'var(--color-primary)',
                            marginBottom: '8px',
                            fontSize: '1.1rem'
                        }}>
                            🍷 {t('things_to_do.food.wine.title')}
                        </h4>
                        <p style={{ color: '#666', lineHeight: '1.6', margin: 0, fontSize: '0.9rem' }}>
                            {t('things_to_do.food.wine.desc')}
                        </p>
                    </div>

                    <div>
                        <h4 style={{
                            fontFamily: "'Playfair Display', serif",
                            color: 'var(--color-primary)',
                            marginBottom: '8px',
                            fontSize: '1.1rem'
                        }}>
                            🫒 {t('things_to_do.food.oil.title')}
                        </h4>
                        <p style={{ color: '#666', lineHeight: '1.6', margin: 0, fontSize: '0.9rem' }}>
                            {t('things_to_do.food.oil.desc')}
                        </p>
                    </div>

                    <div>
                        <h4 style={{
                            fontFamily: "'Playfair Display', serif",
                            color: 'var(--color-primary)',
                            marginBottom: '8px',
                            fontSize: '1.1rem'
                        }}>
                            🧀 {t('things_to_do.food.cheese.title')}
                        </h4>
                        <p style={{ color: '#666', lineHeight: '1.6', margin: 0, fontSize: '0.9rem' }}>
                            {t('things_to_do.food.cheese.desc')}
                        </p>
                    </div>
                </div>
            </div>
        </InfoPage>
    );
};

export default ThingsToDo;
