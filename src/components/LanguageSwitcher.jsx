import React from 'react';
import { useTranslation } from 'react-i18next';

const LanguageSwitcher = () => {
    const { i18n } = useTranslation();

    const changeLanguage = (lng) => {
        i18n.changeLanguage(lng);
    };

    const styles = {
        button: {
            background: 'none',
            border: '1px solid transparent',
            cursor: 'pointer',
            padding: '5px 8px',
            fontSize: '0.9rem',
            fontFamily: 'var(--font-body)',
            color: 'var(--color-text)',
            transition: 'all 0.3s ease',
            opacity: 0.7
        },
        active: {
            opacity: 1,
            fontWeight: 'bold',
            borderBottom: '1px solid var(--color-gold)'
        },
        container: {
            display: 'flex',
            gap: '5px',
            marginLeft: '20px'
        }
    };

    return (
        <div style={styles.container} className="lang-switcher">
            <button
                onClick={() => changeLanguage('en')}
                style={{ ...styles.button, ...(i18n.language.startsWith('en') ? styles.active : {}) }}
            >
                EN
            </button>
            <button
                onClick={() => changeLanguage('de')}
                style={{ ...styles.button, ...(i18n.language.startsWith('de') ? styles.active : {}) }}
            >
                DE
            </button>
            <button
                onClick={() => changeLanguage('it')}
                style={{ ...styles.button, ...(i18n.language.startsWith('it') ? styles.active : {}) }}
            >
                IT
            </button>
            <button
                onClick={() => changeLanguage('fr')}
                style={{ ...styles.button, ...(i18n.language.startsWith('fr') ? styles.active : {}) }}
            >
                FR
            </button>
            <button
                onClick={() => changeLanguage('es')}
                style={{ ...styles.button, ...(i18n.language.startsWith('es') ? styles.active : {}) }}
            >
                ES
            </button>
        </div>
    );
};

export default LanguageSwitcher;
