/**
 * Constitution Structure Data
 * 
 * This file defines the hierarchical structure of the Italian Constitution
 * for navigation and display purposes.
 */

export interface Sezione {
  id: string;
  nome: string;
  articoli: number[]; // Article numbers in this section
}

export interface Titolo {
  id: string;
  numero: string; // Roman numeral
  nome: string;
  sezioni?: Sezione[];
  articoli: number[]; // Article numbers (direct children if no sections)
}

export interface Parte {
  id: string;
  numero: string; // Roman numeral
  nome: string;
  titoli: Titolo[];
}

export interface ConstitutionStructure {
  principiFondamentali: {
    nome: string;
    articoli: number[];
  };
  parti: Parte[];
  disposizioniTransitorie: {
    nome: string;
    disposizioni: string[]; // Roman numerals
  };
}

export const costituzioneStructure: ConstitutionStructure = {
  principiFondamentali: {
    nome: 'Principî Fondamentali',
    articoli: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
  },
  parti: [
    {
      id: 'parte-1',
      numero: 'I',
      nome: 'Diritti e Doveri dei Cittadini',
      titoli: [
        {
          id: 'parte-1-titolo-1',
          numero: 'I',
          nome: 'Rapporti Civili',
          articoli: [13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28],
        },
        {
          id: 'parte-1-titolo-2',
          numero: 'II',
          nome: 'Rapporti Etico-Sociali',
          articoli: [29, 30, 31, 32, 33, 34],
        },
        {
          id: 'parte-1-titolo-3',
          numero: 'III',
          nome: 'Rapporti Economici',
          articoli: [35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47],
        },
        {
          id: 'parte-1-titolo-4',
          numero: 'IV',
          nome: 'Rapporti Politici',
          articoli: [48, 49, 50, 51, 52, 53, 54],
        },
      ],
    },
    {
      id: 'parte-2',
      numero: 'II',
      nome: 'Ordinamento della Repubblica',
      titoli: [
        {
          id: 'parte-2-titolo-1',
          numero: 'I',
          nome: 'Il Parlamento',
          sezioni: [
            {
              id: 'parte-2-titolo-1-sezione-1',
              nome: 'Le Camere',
              articoli: [55, 56, 57, 58, 59, 60, 61, 62, 63, 64, 65, 66, 67, 68, 69],
            },
            {
              id: 'parte-2-titolo-1-sezione-2',
              nome: 'La formazione delle leggi',
              articoli: [70, 71, 72, 73, 74, 75, 76, 77, 78, 79, 80, 81, 82],
            },
          ],
          articoli: [55, 56, 57, 58, 59, 60, 61, 62, 63, 64, 65, 66, 67, 68, 69, 70, 71, 72, 73, 74, 75, 76, 77, 78, 79, 80, 81, 82],
        },
        {
          id: 'parte-2-titolo-2',
          numero: 'II',
          nome: 'Il Presidente della Repubblica',
          articoli: [83, 84, 85, 86, 87, 88, 89, 90, 91],
        },
        {
          id: 'parte-2-titolo-3',
          numero: 'III',
          nome: 'Il Governo',
          sezioni: [
            {
              id: 'parte-2-titolo-3-sezione-1',
              nome: 'Il Consiglio dei Ministri',
              articoli: [92, 93, 94, 95, 96],
            },
            {
              id: 'parte-2-titolo-3-sezione-2',
              nome: 'La Pubblica Amministrazione',
              articoli: [97, 98],
            },
            {
              id: 'parte-2-titolo-3-sezione-3',
              nome: 'Gli organi ausiliari',
              articoli: [99, 100],
            },
          ],
          articoli: [92, 93, 94, 95, 96, 97, 98, 99, 100],
        },
        {
          id: 'parte-2-titolo-4',
          numero: 'IV',
          nome: 'La Magistratura',
          sezioni: [
            {
              id: 'parte-2-titolo-4-sezione-1',
              nome: 'Ordinamento giurisdizionale',
              articoli: [101, 102, 103, 104, 105, 106, 107, 108, 109, 110],
            },
            {
              id: 'parte-2-titolo-4-sezione-2',
              nome: 'Norme sulla giurisdizione',
              articoli: [111, 112, 113],
            },
          ],
          articoli: [101, 102, 103, 104, 105, 106, 107, 108, 109, 110, 111, 112, 113],
        },
        {
          id: 'parte-2-titolo-5',
          numero: 'V',
          nome: 'Le Regioni, le Province, i Comuni',
          articoli: [114, 115, 116, 117, 118, 119, 120, 121, 122, 123, 124, 125, 126, 127, 128, 129, 130, 131, 132, 133],
        },
        {
          id: 'parte-2-titolo-6',
          numero: 'VI',
          nome: 'Garanzie Costituzionali',
          sezioni: [
            {
              id: 'parte-2-titolo-6-sezione-1',
              nome: 'La Corte costituzionale',
              articoli: [134, 135, 136, 137],
            },
            {
              id: 'parte-2-titolo-6-sezione-2',
              nome: 'Revisione della Costituzione - Leggi costituzionali',
              articoli: [138, 139],
            },
          ],
          articoli: [134, 135, 136, 137, 138, 139],
        },
      ],
    },
  ],
  disposizioniTransitorie: {
    nome: 'Disposizioni Transitorie e Finali',
    disposizioni: ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X', 'XI', 'XII', 'XIII', 'XIV', 'XV', 'XVI', 'XVII', 'XVIII'],
  },
};

/**
 * Get the section info for a given article number
 */
export function getArticleContext(articleNumber: number): {
  parte?: Parte;
  titolo?: Titolo;
  sezione?: Sezione;
} | null {
  // Check principi fondamentali
  if (costituzioneStructure.principiFondamentali.articoli.includes(articleNumber)) {
    return {};
  }

  // Check each parte
  for (const parte of costituzioneStructure.parti) {
    for (const titolo of parte.titoli) {
      if (titolo.articoli.includes(articleNumber)) {
        // Check if it's in a sezione
        if (titolo.sezioni) {
          for (const sezione of titolo.sezioni) {
            if (sezione.articoli.includes(articleNumber)) {
              return { parte, titolo, sezione };
            }
          }
        }
        return { parte, titolo };
      }
    }
  }

  return null;
}

/**
 * Get previous and next article numbers
 */
export function getAdjacentArticles(currentNumber: number | string): {
  prev: { numero: number | string; tipo: 'articolo' | 'disposizione' } | null;
  next: { numero: number | string; tipo: 'articolo' | 'disposizione' } | null;
} {
  const disposizioni = costituzioneStructure.disposizioniTransitorie.disposizioni;
  
  // If it's a disposition
  if (typeof currentNumber === 'string') {
    const idx = disposizioni.indexOf(currentNumber);
    return {
      prev: idx === 0 
        ? { numero: 139, tipo: 'articolo' }
        : { numero: disposizioni[idx - 1], tipo: 'disposizione' },
      next: idx === disposizioni.length - 1 
        ? null 
        : { numero: disposizioni[idx + 1], tipo: 'disposizione' },
    };
  }

  // If it's a regular article
  const num = currentNumber as number;
  return {
    prev: num === 1 ? null : { numero: num - 1, tipo: 'articolo' },
    next: num === 139 
      ? { numero: 'I', tipo: 'disposizione' }
      : { numero: num + 1, tipo: 'articolo' },
  };
}

/**
 * Convert article number to URL path
 */
export function getArticlePath(numero: number | string, tipo: 'articolo' | 'disposizione'): string {
  if (tipo === 'disposizione') {
    return `/disposizione/${String(numero).toLowerCase()}`;
  }
  return `/articolo/${numero}`;
}
