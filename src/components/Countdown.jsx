import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

const Countdown = () => {
    const { t } = useTranslation();
    const calculateTimeLeft = () => {
        // Target Date: June 13, 2026
        const difference = +new Date('2026-06-13') - +new Date();
        let timeLeft = {};

        if (difference > 0) {
            timeLeft = {
                days: Math.floor(difference / (1000 * 60 * 60 * 24)),
                hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
                minutes: Math.floor((difference / 1000 / 60) % 60),
                seconds: Math.floor((difference / 1000) % 60),
            };
        }
        return timeLeft;
    };

    const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

    useEffect(() => {
        const timer = setTimeout(() => {
            setTimeLeft(calculateTimeLeft());
        }, 1000);

        return () => clearTimeout(timer);
    });

    const timerComponents = [];

    Object.keys(timeLeft).forEach((interval) => {
        if (!timeLeft[interval] && timeLeft[interval] !== 0) {
            return;
        }

        timerComponents.push(
            <div key={interval} style={{
                margin: '0 15px',
                textAlign: 'center',
                minWidth: '70px'
            }}>
                <span style={{
                    display: 'block',
                    fontSize: '2.5rem',
                    fontWeight: 700,
                    color: 'var(--color-gold)'
                }}>
                    {timeLeft[interval]}
                </span>
                <span style={{
                    fontSize: '0.8rem',
                    textTransform: 'uppercase',
                    letterSpacing: '2px',
                    color: '#666'
                }}>
                    {t(`home.countdown.${interval}`)}
                </span>
            </div>
        );
    });

    return (
        <div style={{
            display: 'flex',
            justifyContent: 'center',
            flexWrap: 'wrap',
            marginTop: '40px',
            background: 'rgba(255,255,255,0.8)',
            padding: '20px',
            borderRadius: '8px',
            boxShadow: '0 5px 15px rgba(0,0,0,0.05)'
        }}>
            {timerComponents.length ? timerComponents : <span>Best Wishes!</span>}
        </div>
    );
};

export default Countdown;
