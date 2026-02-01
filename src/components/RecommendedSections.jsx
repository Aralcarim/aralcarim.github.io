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
            id: 'run-of-show',
            icon: '🥂',
            label: t('nav.run_of_show', 'Run of Show'),
            link: '/run-of-show'
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
