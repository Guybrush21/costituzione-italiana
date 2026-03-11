#!/usr/bin/env node

/**
 * Parse costituzione.md and generate individual article files
 * for the Astro content collection
 */

import { readFileSync, writeFileSync, mkdirSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');
const CONTENT_DIR = join(ROOT, 'src/content/articoli');

// Ensure output directory exists
mkdirSync(CONTENT_DIR, { recursive: true });

// Read the constitution markdown
const content = readFileSync(join(ROOT, 'costituzione.md'), 'utf-8');

// Structure mapping
const structure = {
  currentParte: null,
  currentTitolo: null,
  currentSezione: null,
};

// Parse the document
const lines = content.split('\n');
let articles = [];
let currentArticle = null;
let currentContent = [];

// Section names for display
const parteNames = {
  'I': 'Diritti e Doveri dei Cittadini',
  'II': 'Ordinamento della Repubblica',
};

const titoloNames = {};
const sezioneNames = {};

for (let i = 0; i < lines.length; i++) {
  const line = lines[i];
  
  // Match Parts: ## PARTE I - ... or ## PRINCIPÎ FONDAMENTALI
  if (line.startsWith('## ')) {
    const parteMatch = line.match(/^## PARTE (I+) - (.+)$/);
    if (parteMatch) {
      structure.currentParte = parteMatch[1];
      parteNames[parteMatch[1]] = parteMatch[2].trim();
      structure.currentTitolo = null;
      structure.currentSezione = null;
    } else if (line.includes('PRINCIPÎ FONDAMENTALI')) {
      structure.currentParte = null;
      structure.currentTitolo = null;
      structure.currentSezione = 'principi-fondamentali';
    } else if (line.includes('DISPOSIZIONI TRANSITORIE E FINALI')) {
      structure.currentParte = null;
      structure.currentTitolo = null;
      structure.currentSezione = 'disposizioni-transitorie';
    }
    continue;
  }
  
  // Match Titles: ### TITOLO I - ...
  if (line.startsWith('### ')) {
    const titoloMatch = line.match(/^### TITOLO (I+V?|V?I*) - (.+)$/);
    if (titoloMatch) {
      const titoloNum = titoloMatch[1];
      structure.currentTitolo = titoloNum;
      titoloNames[`${structure.currentParte}-${titoloNum}`] = titoloMatch[2].trim();
      structure.currentSezione = null;
    }
    continue;
  }
  
  // Match Sections: #### Sezione I - ... or #### SEZIONE I - ...
  if (line.startsWith('#### ')) {
    const sezioneMatch = line.match(/^#### [Ss]ezione (I+V?|V?I*)[.\s-]+(.+)$/i);
    if (sezioneMatch) {
      const sezioneNum = sezioneMatch[1];
      structure.currentSezione = sezioneNum;
      sezioneNames[`${structure.currentParte}-${structure.currentTitolo}-${sezioneNum}`] = sezioneMatch[2].trim().replace(/\.$/, '');
    }
    continue;
  }
  
  // Match Articles: ##### Art. 1. or ##### I. (for transitional dispositions)
  if (line.startsWith('##### ')) {
    // Save previous article if exists
    if (currentArticle) {
      currentArticle.contenuto = currentContent.join('\n').trim();
      articles.push(currentArticle);
      currentContent = [];
    }
    
    // Check for numbered article
    const artMatch = line.match(/^##### Art\. (\d+)\.?$/);
    if (artMatch) {
      const numero = parseInt(artMatch[1], 10);
      currentArticle = {
        numero,
        tipo: 'articolo',
        slug: String(numero),
        titolo: `Art. ${numero}`,
        parte: structure.currentParte,
        titolo_sezione: structure.currentTitolo,
        sezione: structure.currentSezione,
        abrogato: false,
      };
      continue;
    }
    
    // Check for transitional disposition (Roman numerals)
    const dispMatch = line.match(/^##### (X{0,3}(?:IX|IV|V?I{0,3}))\.?$/);
    if (dispMatch) {
      const romanNum = dispMatch[1];
      currentArticle = {
        numero: romanNum,
        tipo: 'disposizione',
        slug: `disp-${romanNum.toLowerCase()}`,
        titolo: `Disposizione ${romanNum}`,
        parte: null,
        titolo_sezione: null,
        sezione: 'disposizioni-transitorie',
        abrogato: false,
      };
      continue;
    }
  }
  
  // Collect article content
  if (currentArticle) {
    // Check if article is abrogated
    if (line.includes('(abrogato)')) {
      currentArticle.abrogato = true;
    }
    currentContent.push(line);
  }
}

// Don't forget the last article
if (currentArticle) {
  currentArticle.contenuto = currentContent.join('\n').trim();
  articles.push(currentArticle);
}

console.log(`Found ${articles.length} articles/dispositions`);

// Generate files
for (const article of articles) {
  const filename = article.tipo === 'articolo' 
    ? `${String(article.numero).padStart(3, '0')}.md`
    : `${article.slug}.md`;
  
  // Generate a short description (first sentence or first 150 chars)
  let descrizione = article.contenuto
    .replace(/\n+/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
  
  // Get first sentence or truncate
  const firstSentence = descrizione.match(/^[^.!?]+[.!?]/);
  if (firstSentence && firstSentence[0].length <= 200) {
    descrizione = firstSentence[0];
  } else if (descrizione.length > 150) {
    descrizione = descrizione.substring(0, 147) + '...';
  }
  
  // Build frontmatter
  const frontmatter = {
    numero: article.numero,
    tipo: article.tipo,
    titolo: article.titolo,
    parte: article.parte,
    titolo_sezione: article.titolo_sezione,
    sezione: article.sezione,
    abrogato: article.abrogato,
    descrizione: descrizione,
  };
  
  // Convert to YAML
  const yaml = Object.entries(frontmatter)
    .map(([key, value]) => {
      if (value === null) return `${key}: null`;
      if (typeof value === 'boolean') return `${key}: ${value}`;
      if (typeof value === 'number') return `${key}: ${value}`;
      // Escape quotes in strings
      const escaped = String(value).replace(/"/g, '\\"');
      return `${key}: "${escaped}"`;
    })
    .join('\n');
  
  const fileContent = `---
${yaml}
---

${article.contenuto}
`;

  writeFileSync(join(CONTENT_DIR, filename), fileContent);
  console.log(`  Created: ${filename}`);
}

// Also output structure data
const structureData = {
  parti: parteNames,
  titoli: titoloNames,
  sezioni: sezioneNames,
};

console.log('\nStructure data:');
console.log(JSON.stringify(structureData, null, 2));

// Write structure to a JSON file for reference
writeFileSync(
  join(ROOT, 'src/data/structure.json'),
  JSON.stringify(structureData, null, 2)
);
console.log('\nWrote structure.json');
