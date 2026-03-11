# Costituzione Italiana - Astro Website Plan

## Overview

A clean, official/institutional website presenting the Italian Constitution with:
- Savoy blue (#4B61D1) as the primary accent color
- Individual pages for each article (139 articles + 18 transitional dispositions)
- Full navigation, search, dark mode, and print support

---

## 1. Project Structure

```
src/
├── components/
│   ├── Layout.astro              # Base layout with head, nav, footer
│   ├── Header.astro              # Site header with logo, nav, dark mode toggle
│   ├── Footer.astro              # Site footer with credits
│   ├── TableOfContents.astro     # Collapsible TOC sidebar
│   ├── ArticleNav.astro          # Previous/Next article navigation
│   ├── SearchModal.astro         # Search modal component
│   ├── DarkModeToggle.astro      # Dark/light mode switch
│   └── PrintButton.astro         # Print-friendly button
├── layouts/
│   └── ArticleLayout.astro       # Layout for individual articles
├── pages/
│   ├── index.astro               # Homepage with intro + TOC
│   ├── principi-fondamentali.astro    # Overview of fundamental principles
│   ├── articolo/
│   │   └── [numero].astro        # Dynamic route for each article
│   ├── parte/
│   │   ├── 1.astro               # Part I overview
│   │   └── 2.astro               # Part II overview
│   ├── disposizioni-transitorie.astro  # Transitional provisions overview
│   ├── search.astro              # Search results page
│   └── stampa.astro              # Full print-friendly version
├── content/
│   └── articoli/                 # Content collection for articles
│       ├── 001.md                # Article 1
│       ├── 002.md                # Article 2
│       └── ...                   # (all 139 + 18 disposizioni)
├── data/
│   └── structure.ts              # Constitution structure (parts, titles, sections)
├── styles/
│   └── global.css                # Global styles, CSS variables, print styles
└── lib/
    └── search.ts                 # Search index utilities
```

---

## 2. Pages to Create

| Page | URL | Description |
|------|-----|-------------|
| Homepage | `/` | Introduction, structure overview, quick access to parts |
| Article pages | `/articolo/1` to `/articolo/139` | Individual article pages |
| Transitional | `/disposizione/I` to `/disposizione/XVIII` | Transitional provisions (Roman numerals) |
| Part I | `/parte/1` | Rights and Duties overview |
| Part II | `/parte/2` | Organization of the Republic overview |
| Principles | `/principi-fondamentali` | Articles 1-12 grouped |
| Full text | `/testo-completo` | Print-friendly full constitution |
| Search | `/ricerca` | Search results page |

**Total: ~165 pages** (139 articles + 18 dispositions + 8 structural pages)

---

## 3. Content Collection Strategy

Parse `costituzione.md` and create individual markdown files for each article with frontmatter:

```yaml
---
numero: 1
titolo: "Art. 1"
sezione: "principi-fondamentali"
parte: null
descrizione: "L'Italia è una Repubblica democratica, fondata sul lavoro."
---
```

This enables:
- Type-safe querying with Astro Content Collections
- Easy article navigation (previous/next)
- Search indexing
- Filtering by part/title/section

---

## 4. Key Features Implementation

### 4.1 Search Functionality
- Generate a JSON search index at build time (`src/lib/search.ts`)
- Client-side search with Fuse.js (fuzzy matching)
- Search modal accessible via keyboard shortcut (Cmd/Ctrl+K)
- Highlight matching terms in results

### 4.2 Dark Mode
- CSS variables for colors
- Toggle stored in localStorage
- Respect `prefers-color-scheme` by default
- Smooth transition between modes

### 4.3 Article Navigation
- Previous/Next buttons on each article page
- Breadcrumb showing: Home > Parte I > Titolo I > Art. 13
- "Back to section" link

### 4.4 Table of Contents
- Collapsible sidebar on desktop
- Mobile: hamburger menu
- Current article highlighted
- Expandable sections (Parts > Titles > Articles)

### 4.5 Print-Friendly
- `/testo-completo` page with all articles
- Print button that opens print dialog
- Print-specific CSS: hide nav, optimize typography
- Page breaks between major sections

---

## 5. Design System

### Colors
```css
:root {
  --savoy-blue: #4B61D1;
  --savoy-blue-light: #6B7FE0;
  --savoy-blue-dark: #3A4FB0;
  --text-primary: #1a1a1a;
  --text-secondary: #4a4a4a;
  --bg-primary: #ffffff;
  --bg-secondary: #f5f5f5;
}

[data-theme="dark"] {
  --text-primary: #f0f0f0;
  --text-secondary: #a0a0a0;
  --bg-primary: #121212;
  --bg-secondary: #1e1e1e;
}
```

### Typography
- Headings: Serif font (e.g., Crimson Text, Lora)
- Body: Sans-serif (e.g., Inter, Open Sans)
- Article numbers: Savoy blue accent

---

## 6. Implementation Tasks

| # | Task | Priority | Status |
|---|------|----------|--------|
| 1 | Parse `costituzione.md` into content collection | High | Pending |
| 2 | Create `structure.ts` data file | High | Pending |
| 3 | Build base Layout + Header + Footer | High | Pending |
| 4 | Create global CSS with design system | High | Pending |
| 5 | Build Table of Contents component | High | Pending |
| 6 | Create ArticleLayout + dynamic article route | High | Pending |
| 7 | Build Homepage | High | Pending |
| 8 | Implement ArticleNav (prev/next) | Medium | Pending |
| 9 | Add dark mode toggle | Medium | Pending |
| 10 | Implement search index generation | Medium | Pending |
| 11 | Build SearchModal component | Medium | Pending |
| 12 | Create section overview pages (Parts, Titles) | Medium | Pending |
| 13 | Add print styles + full text page | Low | Pending |
| 14 | Mobile responsive testing | Low | Pending |

---

## 7. Dependencies

```json
{
  "dependencies": {
    "fuse.js": "^7.0.0"
  },
  "devDependencies": {
    "@astrojs/sitemap": "^3.0.0"
  }
}
```

---

## Notes

- UI Language: Italian
- Fonts: Google Fonts (Crimson Text for headings, Inter for body)
- Primary Color: Savoy Blue (#4B61D1)
