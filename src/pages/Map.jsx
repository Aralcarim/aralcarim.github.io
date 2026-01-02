import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import InfoPage from './InfoPage';

// Fix default marker icon issue with webpack/vite
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png',
    iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
});

// Custom marker icons by category
const createIcon = (color) => {
    const svgIcon = L.divIcon({
        className: 'custom-marker',
        html: `
            <svg width="32" height="42" viewBox="0 0 32 42" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M16 0C7.163 0 0 7.163 0 16C0 28 16 42 16 42C16 42 32 28 32 16C32 7.163 24.837 0 16 0Z" fill="${color}"/>
                <circle cx="16" cy="16" r="6" fill="white"/>
            </svg>
        `,
        iconSize: [32, 42],
        iconAnchor: [16, 42],
        popupAnchor: [0, -42],
    });
    return svgIcon;
};

const COLORS = {
    venue: '#D4AF37',      // gold
    hotel: '#FFC0CB',      // pink
    restaurant: '#DDA0DD', // plum
    beach: '#87CEEB',      // sky blue
    town: '#9370DB',       // purple
    nature: '#90EE90',     // light green
    culture: '#FFB6C1',    // light pink
};

// 15 placeholder markers across Apulia
const MARKERS = [
    // Venues (Gold)
    { id: 1, name: 'Ceremony Venue', category: 'venue', lat: 41.8, lng: 15.6, desc: 'Wedding ceremony location' },
    { id: 2, name: 'Reception Venue', category: 'venue', lat: 41.82, lng: 15.58, desc: 'Wedding reception location' },

    // Hotels (Pink)
    { id: 3, name: 'Hotel Option 1', category: 'hotel', lat: 41.85, lng: 15.55, desc: 'Luxury hotel near venue' },
    { id: 4, name: 'Hotel Option 2', category: 'hotel', lat: 41.78, lng: 15.62, desc: 'Boutique hotel in town' },
    { id: 5, name: 'Agriturismo Stay', category: 'hotel', lat: 41.88, lng: 15.5, desc: 'Countryside farm stay' },

    // Restaurants (Plum)
    { id: 6, name: 'Restaurant 1', category: 'restaurant', lat: 41.75, lng: 15.65, desc: 'Traditional trattoria' },
    { id: 7, name: 'Restaurant 2', category: 'restaurant', lat: 41.83, lng: 15.45, desc: 'Seafood restaurant' },

    // Beaches (Sky Blue)
    { id: 8, name: 'Beach 1', category: 'beach', lat: 41.9, lng: 15.4, desc: 'Sandy beach with facilities' },
    { id: 9, name: 'Beach 2', category: 'beach', lat: 41.7, lng: 15.7, desc: 'Scenic coastal spot' },
    { id: 10, name: 'Beach 3', category: 'beach', lat: 41.95, lng: 15.35, desc: 'Hidden cove' },

    // Towns (Purple)
    { id: 11, name: 'Hill Town 1', category: 'town', lat: 41.65, lng: 15.8, desc: 'Historic hilltop village' },
    { id: 12, name: 'Hill Town 2', category: 'town', lat: 41.6, lng: 15.75, desc: 'Medieval town center' },

    // Nature & Culture
    { id: 13, name: 'Nature Spot 1', category: 'nature', lat: 41.5, lng: 15.6, desc: 'Hiking trail' },
    { id: 14, name: 'Cultural Site 1', category: 'culture', lat: 41.55, lng: 15.5, desc: 'Historic landmark' },
    { id: 15, name: 'Viewpoint 1', category: 'nature', lat: 41.7, lng: 15.4, desc: 'Panoramic viewpoint' },
];

const CATEGORIES = [
    { key: 'venue', label: 'Venues', color: COLORS.venue },
    { key: 'hotel', label: 'Hotels', color: COLORS.hotel },
    { key: 'restaurant', label: 'Restaurants', color: COLORS.restaurant },
    { key: 'beach', label: 'Beaches', color: COLORS.beach },
    { key: 'town', label: 'Towns', color: COLORS.town },
    { key: 'nature', label: 'Nature', color: COLORS.nature },
    { key: 'culture', label: 'Culture', color: COLORS.culture },
];

const Map = () => {
    const { t } = useTranslation();
    const [activeCategories, setActiveCategories] = useState(
        CATEGORIES.map(c => c.key)
    );

    const toggleCategory = (categoryKey) => {
        setActiveCategories(prev =>
            prev.includes(categoryKey)
                ? prev.filter(k => k !== categoryKey)
                : [...prev, categoryKey]
        );
    };

    const filteredMarkers = MARKERS.filter(m =>
        activeCategories.includes(m.category)
    );

    const mapStyle = {
        height: '600px',
        width: '100%',
        borderRadius: '12px',
        boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
        zIndex: 1,
    };

    const filterContainerStyle = {
        display: 'flex',
        flexWrap: 'wrap',
        gap: '10px',
        marginBottom: '20px',
        padding: '20px',
        background: 'white',
        borderRadius: '12px',
        boxShadow: '0 2px 10px rgba(0,0,0,0.08)',
    };

    const filterButtonStyle = (category, isActive) => ({
        padding: '8px 16px',
        border: '2px solid',
        borderColor: category.color,
        borderRadius: '20px',
        background: isActive ? category.color : 'white',
        color: isActive ? 'white' : category.color,
        cursor: 'pointer',
        transition: 'all 0.2s',
        fontWeight: '500',
        fontSize: '0.9rem',
    });

    return (
        <InfoPage
            title={t('map.title')}
            imagePlaceholder="🗺️"
        >
            <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
                <p style={{ color: '#666', marginBottom: '30px', fontSize: '1.05rem' }}>
                    {t('map.desc')}
                </p>

                {/* Category Filters */}
                <div style={filterContainerStyle}>
                    {CATEGORIES.map(category => (
                        <button
                            key={category.key}
                            onClick={() => toggleCategory(category.key)}
                            style={filterButtonStyle(
                                category,
                                activeCategories.includes(category.key)
                            )}
                        >
                            {t(`map.categories.${category.key}`)}
                        </button>
                    ))}
                </div>

                {/* Map */}
                <MapContainer
                    center={[41.7, 15.6]}
                    zoom={9}
                    style={mapStyle}
                >
                    <TileLayer
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    {filteredMarkers.map(marker => (
                        <Marker
                            key={marker.id}
                            position={[marker.lat, marker.lng]}
                            icon={createIcon(COLORS[marker.category])}
                        >
                            <Popup>
                                <div style={{
                                    fontFamily: "'Montserrat', sans-serif",
                                    minWidth: '150px',
                                }}>
                                    <strong style={{
                                        color: COLORS[marker.category],
                                        fontSize: '1rem',
                                    }}>
                                        {marker.name}
                                    </strong>
                                    <p style={{ margin: '5px 0 0 0', fontSize: '0.9rem' }}>
                                        {marker.desc}
                                    </p>
                                </div>
                            </Popup>
                        </Marker>
                    ))}
                </MapContainer>

                <p style={{
                    marginTop: '20px',
                    color: '#999',
                    fontSize: '0.85rem',
                    fontStyle: 'italic',
                    textAlign: 'center',
                }}>
                    {t('map.hint')}
                </p>
            </div>
        </InfoPage>
    );
};

export default Map;
