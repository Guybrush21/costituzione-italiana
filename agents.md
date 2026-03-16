# Agents

Instructions for AI coding agents working on this codebase.

## Project Overview

Italian Constitution website built with Astro. Presents all 139 articles and 18 transitional dispositions of the Costituzione della Repubblica Italiana.

- **UI and content language**: Italian (all user-facing text must be in Italian)
- **Primary color**: Savoy Blue (`#4B61D1`)
- **Styling**: Tailwind CSS

## Build & Development

```bash
npm install              # Install dependencies
npm run dev              # Start dev server at localhost:4321
npm run build            # Build production site to ./dist/
npm run preview          # Preview production build locally
```

### Content Generation

```bash
node scripts/parse-constitution.js
```

Regenerates article markdown files from `costituzione.md`. Run this if the source constitution text is updated.

## Architecture

### Tech Stack

- Astro 5 (static site generation)
- Tailwind CSS
- No JS framework (vanilla JS for client interactivity)

### Directory Structure

```
src/
├── components/     # Reusable .astro components
├── content/        # Content collection (articoli/)
├── data/           # Structure data (structure.ts)
├── layouts/        # Page layouts (ArticleLayout.astro)
├── lib/            # Utilities (search)
├── pages/          # Routes and pages
└── styles/         # Global CSS
```

### Content Collection

157 markdown files in `src/content/articoli/`:

- Articles: `001.md` to `139.md`
- Transitional dispositions: `disp-i.md` to `disp-xviii.md`

Schema defined in `src/content.config.ts`.

### Frontmatter Schema

```yaml
numero: number | string       # Article number or Roman numeral for dispositions
tipo: "articolo" | "disposizione"
titolo: string                # Display title (e.g., "Art. 1")
parte: string | null          # Part number (Roman: "I" or "II")
titolo_sezione: string | null # Title within Part (Roman numeral)
sezione: string | null        # Section identifier
abrogato: boolean             # true if article has been repealed
descrizione: string           # Short description for SEO
```

## Conventions

### Language

- ALL user-facing text must be in Italian
- Code comments can be in English

### Styling

- Use Tailwind utility classes
- Design tokens:
  - Primary: Savoy Blue `#4B61D1`
  - Typography: Crimson Text (serif) for article content, Inter (sans-serif) for UI
- Dark mode: `data-theme="dark"` attribute on `<html>`, respects `prefers-color-scheme`

### Components

- `Layout.astro`: Base wrapper (includes Header, Footer, SearchModal)
- `ArticleLayout.astro`: Article page layout with breadcrumbs and prev/next navigation
- Props interfaces defined in component frontmatter

### Structure Data

`src/data/structure.ts` defines the constitution hierarchy:

```
Principî Fondamentali (Art. 1-12)
Parte I - Diritti e Doveri dei Cittadini (Art. 13-54)
  └── Titoli I-IV
Parte II - Ordinamento della Repubblica (Art. 55-139)
  └── Titoli I-VI (some with Sezioni)
Disposizioni Transitorie e Finali (I-XVIII)
```

Helper functions:
- `getArticleContext(articleNumber)` - Get part/title/section for an article
- `getAdjacentArticles(numero)` - Get prev/next article info
- `getArticlePath(numero, tipo)` - Generate URL path

### Routing

| Route | Description |
|-------|-------------|
| `/articolo/[numero]` | Individual articles (1-139) |
| `/disposizione/[numero]` | Transitional dispositions (i-xviii, lowercase) |
| `/parte/1`, `/parte/2` | Part overview pages |
| `/principi-fondamentali` | Fundamental Principles (Art. 1-12) |
| `/disposizioni-transitorie` | Transitional dispositions overview |
| `/testo-completo` | Full text (print-friendly) |

## Important Notes

- **Roman numerals**: Used for Parts (I, II), Titles (I-VI), and Dispositions (I-XVIII)
- **Repealed articles**: Set `abrogato: true` in frontmatter; displayed with reduced opacity and italic styling
- **Content updates**: Edit `costituzione.md`, then run the parse script to regenerate article files
