import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import './RecommendedSections.css';

const RecommendedSections = () => {
    const { t } = useTranslation();

    const sections = [
        {
            id: 'story',
            icon: '📖',
            label: t('nav.story', 'Our Story'),
            link: '/story'
        },
        {
            id: 'things-to-do',
            icon: '📍',
            label: t('nav.things_to_do', 'Things to Do'),
            link: '/things-to-do'
        },
        {
            id: 'rsvp',
            icon: '💌',
            label: t('nav.rsvp', 'RSVP'),
            link: '/rsvp'
        },
        {
            id: 'registry',
            icon: '🎁',
            label: t('nav.registry', 'Registry'),
            link: '/registry'
        }
    ];

    return (
        <div className="recommended-sections">
            <div className="recommended-grid">
                {sections.map((section) => (
                    <Link key={section.id} to={section.link} className="recommended-item">
                        <div className="recommended-icon">
                            {section.icon}
                        </div>
                        <span className="recommended-label">{section.label}</span>
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default RecommendedSections;
