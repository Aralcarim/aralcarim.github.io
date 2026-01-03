# Website Launch Checklist

Items that need to be updated with real information before the site goes live.

## High Priority (Personal Data)

| # | Task | Location |
|---|------|----------|
| 1 | **Update Vaclav's contact details** (Instagram, email, phone numbers) | `src/pages/Contact.jsx:15-19` |
| 2 | **Update Cinzia's contact details** (Instagram, email, phone) | `src/pages/Contact.jsx:23-26` |
| 3 | **Update bank information** (EU & UK IBAN, BIC, account numbers) | `src/pages/Registry.jsx` |
| 4 | **Add wedding hashtag** (currently empty in all languages) | `src/locales/*.json:420` |

## Medium Priority (Content)

| # | Task | Location |
|---|------|----------|
| 5 | **Update map markers** with real venue/hotel/restaurant coordinates | `src/pages/Map.jsx:46-70` |
| 6 | **Add profile images** (vaclav.jpg, cinzia.jpg) or fix paths to existing -profile.png files | `src/pages/Contact.jsx` |
| 7 | **Update Story timeline** with real images or remove placeholder divs | `src/pages/Story.jsx:48` |
| 8 | **Update hotel recommendations** with specific names | `src/locales/*.json:240,245` |
| 9 | **Update restaurant recommendations** with specific places | `src/locales/*.json:385` |

## Low Priority (Polish)

| # | Task | Location |
|---|------|----------|
| 10 | **Remove RSVP demo notice** once form is connected to backend | `src/locales/*.json:107` |

---

## How to Update Contact Information

Contact info in `Contact.jsx` is base64 encoded to prevent scraping. To encode new values:

```javascript
// In browser console:
btoa("your@email.com")      // Returns base64 string for email
btoa("+1234567890")         // Returns base64 string for phone
```

Replace the encoded strings in the contact data objects.

---

## Current Placeholder Values

### Contact Page (`src/pages/Contact.jsx`)

**Vaclav:**
- Instagram: `https://instagram.com/vaclav` (placeholder)
- Email: `dmFjbGF2QGV4YW1wbGUuY29t` (fake@email.com)
- Phone 1: `KzEyMzQ1Njc4OTA=` (+1234567890)
- Phone 2: `Kzk4NzY1NDMyMTA=` (+9876543210)

**Cinzia:**
- Instagram: `https://instagram.com/cinzia` (placeholder)
- Email: `Y2luemlhQGV4YW1wbGUuY29t` (fake@email.com)
- Phone: `KzA5ODc2NTQzMjE=` (+0987654321)

### Hashtag (`src/locales/*.json`)

Currently empty: `"hashtag": ""`

### Registry Bank Info

All EU and UK bank transfer details are placeholders.

### Map Markers

15 fake locations across categories (Venues, Hotels, Restaurants, Beaches, Towns, Nature, Culture).
