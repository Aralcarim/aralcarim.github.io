// Configuration for external services
// Update the Google Script URL below after deploying the Apps Script

export const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbwgK4Ki389zpFMVNCgAjac6SSlSzARYm0jm2ct37Ppyjdv7WUM36iGD5eY-v2GYPt7c/exec';
export const WEDDING_PASSWORD = import.meta.env.VITE_WEDDING_PASSWORD;

// Bank Information (Plain Text exposed via Env Vars)
export const BANK_INFO = {
    eu: {
        iban: import.meta.env.VITE_EU_IBAN,
        bic: import.meta.env.VITE_EU_BIC,
        bank: import.meta.env.VITE_EU_BANK,
        name: import.meta.env.VITE_EU_NAME
    },
    uk: {
        account: import.meta.env.VITE_UK_ACCOUNT,
        sort: import.meta.env.VITE_UK_SORT,
        bank: import.meta.env.VITE_UK_BANK,
        name: import.meta.env.VITE_UK_NAME
    }
};
