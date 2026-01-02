import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import InfoPage from './InfoPage';

const Contact = () => {
    const { t } = useTranslation();
    const [revealedContact, setRevealedContact] = useState({});

    // Obfuscated contact data - base64 encoded to prevent scraping
    // Replace the encoded strings with your actual data:
    // To encode: btoa("your@email.com")
    const contactData = {
        vaclav: {
            name: t('contact.vaclav_name'),
            instagram: 'https://instagram.com/vaclav', // placeholder
            email: 'dmFjbGF2QGV4YW1wbGUuY29t', // placeholder
            phone: 'KzEyMzQ1Njc4OTA=', // placeholder: +1234567890
            phone2: 'Kzk4NzY1NDMyMTA=', // placeholder: +9876543210
            image: '/assets/vaclav.jpg' // placeholder image path
        },
        cinzia: {
            name: t('contact.cinzia_name'),
            instagram: 'https://instagram.com/cinzia', // placeholder
            email: 'Y2luemlhQGV4YW1wbGUuY29t', // placeholder
            phone: 'KzA5ODc2NTQzMjE=', // placeholder: +0987654321
            image: '/assets/cinzia.jpg' // placeholder image path
        }
    };

    const revealContact = (person, type) => {
        const key = `${person}_${type}`;
        try {
            const decoded = atob(contactData[person][type]);
            setRevealedContact(prev => ({ ...prev, [key]: decoded }));
        } catch (e) {
            console.error('Failed to decode contact info');
        }
    };

    const ContactButton = ({ revealed, value, type, person, onClick }) => {
        if (revealed) {
            const href = type === 'email' ? `mailto:${value}` : `tel:${value}`;
            return (
                <a href={href} className="contact-item-content contact-link">
                    {value}
                </a>
            );
        }
        return (
            <button
                className="reveal-button-inline"
                onClick={onClick}
                aria-label={t(`contact.reveal_${type}`, { name: contactData[person].name })}
            >
                {t('contact.reveal')}
            </button>
        );
    };

    const InstagramLink = ({ href }) => (
        <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="contact-item-content social-link-inline"
        >
            Instagram
        </a>
    );

    const ListRow = ({ person, data }) => {
        const emailKey = `${person}_email`;
        const phoneKey = `${person}_phone`;
        const phone2Key = `${person}_phone2`;
        const emailRevealed = revealedContact[emailKey];
        const phoneRevealed = revealedContact[phoneKey];
        const phone2Revealed = data.phone2 ? revealedContact[phone2Key] : null;

        return (
            <div className="contact-list-row">
                {/* Profile picture and name */}
                <div className="contact-header">
                    <img
                        src={data.image}
                        alt={data.name}
                        className="contact-profile-pic"
                        onError={(e) => {
                            e.target.style.display = 'none';
                            e.target.nextElementSibling.style.display = 'flex';
                        }}
                    />
                    <div className="contact-profile-fallback">
                        {data.name.charAt(0)}
                    </div>
                    <span className="contact-profile-name">{data.name}</span>
                </div>

                {/* Contact details - icons left, info right */}
                <div className="contact-details">
                    {/* Instagram */}
                    <div className="contact-detail-row">
                        <span className="contact-detail-icon">
                            <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                            </svg>
                        </span>
                        <InstagramLink href={data.instagram} />
                    </div>

                    {/* Email */}
                    <div className="contact-detail-row">
                        <span className="contact-detail-icon">
                            <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                                <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
                            </svg>
                        </span>
                        <ContactButton
                            revealed={emailRevealed}
                            value={emailRevealed}
                            type="email"
                            person={person}
                            onClick={() => revealContact(person, 'email')}
                        />
                    </div>

                    {/* Phone 1 */}
                    <div className="contact-detail-row">
                        <span className="contact-detail-icon">
                            <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                                <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" />
                            </svg>
                        </span>
                        <ContactButton
                            revealed={phoneRevealed}
                            value={phoneRevealed}
                            type="phone"
                            person={person}
                            onClick={() => revealContact(person, 'phone')}
                        />
                    </div>

                    {/* Phone 2 (Vaclav only) */}
                    {data.phone2 && (
                        <div className="contact-detail-row">
                            <span className="contact-detail-icon">
                                <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                                    <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" />
                                </svg>
                            </span>
                            <ContactButton
                                revealed={phone2Revealed}
                                value={phone2Revealed}
                                type="phone"
                                person={person}
                                onClick={() => revealContact(person, 'phone2')}
                            />
                        </div>
                    )}
                </div>
            </div>
        );
    };

    return (
        <InfoPage
            title={t('contact.title')}
            description={t('contact.desc')}
            imagePlaceholder="✉️"
        >
            <div className="contact-list">
                <ListRow person="vaclav" data={contactData.vaclav} />
                <ListRow person="cinzia" data={contactData.cinzia} />
            </div>

            <div className="wedding-hashtag">
                <span className="hashtag-icon">#</span>
                {t('contact.hashtag')}
            </div>
        </InfoPage>
    );
};

export default Contact;
