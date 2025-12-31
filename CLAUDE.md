# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

```bash
npm run dev      # Start Vite dev server (default: http://localhost:5173)
npm run build    # Production build to dist/
npm run preview  # Preview production build locally
npm run lint     # Run ESLint
```

## Project Overview

Wedding website for Vaclav and Cinzia. Built as a React SPA with full internationalization support for English, German, and Italian.

**Tech Stack:**
- React 19.2.0 with Vite 7.2.4 (no TypeScript)
- React Router DOM 7.11.0 for routing
- i18next + react-i18next for translations
- Framer Motion 12.23.26 for page transitions

## Architecture

### Routing & Animation Pattern

Routes use Framer Motion's `AnimatePresence` with `mode="wait"` for smooth page transitions. The routing pattern is:

1. Wrap routes in `<AnimatePresence mode="wait">`
2. Use `location` as key on `<Routes>`: `<Routes location={location} key={location.pathname}>`
3. Individual page components use motion variants (initial, animate, exit)

When adding new pages, follow the pattern in `src/pages/` for consistent animations.

### Internationalization (i18n)

**Configuration:** `src/i18n.js`

**Supported Languages:** English (en), German (de), Italian (it) - with browser language detection and English fallback.

**Translation Files:** `src/locales/{en,de,it}.json`

When adding translatable content:
1. Add keys to all three locale JSON files organized by page/section (e.g., `nav.home`, `events.ceremony`)
2. Use the hook in components: `const { t } = useTranslation();`
3. Reference translations: `{t('key.path')}`

### Directory Structure

```
src/
├── components/       # Reusable components (Countdown, DisclaimerModal, LanguageSwitcher)
├── layout/          # Layout components (Footer, Layout, Navbar, TopBar)
├── pages/           # Route components (one per page)
├── locales/         # Translation JSON files
├── i18n.js          # i18next configuration
├── App.jsx          # Main app with routes and AnimatePresence
└── main.jsx         # Entry point
```

### Styling Conventions

- CSS variables defined in `src/index.css` for theming (gold: `#D4AF37`, pink: `#FFC0CB`)
- Google Fonts: Montserrat (body), Playfair Display (headings)
- Inline styles with CSS variables preferred over separate CSS files
- Responsive design with mobile-first approach

### Static Assets

Images and static files go in `public/assets/`. Reference them with absolute paths from public root: `/assets/filename.jpg`
