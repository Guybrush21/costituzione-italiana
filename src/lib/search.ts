/**
 * Search utilities for the Italian Constitution
 */

export interface SearchItem {
  numero: number | string;
  tipo: 'articolo' | 'disposizione';
  titolo: string;
  descrizione: string;
  contenuto: string;
  url: string;
}

/**
 * Generate the URL for an article or disposition
 */
export function getSearchItemUrl(numero: number | string, tipo: 'articolo' | 'disposizione'): string {
  if (tipo === 'disposizione') {
    return `/disposizione/${String(numero).toLowerCase()}`;
  }
  return `/articolo/${numero}`;
}
