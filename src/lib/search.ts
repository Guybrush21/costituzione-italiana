/**
 * Search utilities for the Italian Constitution
 */

// Re-export getArticlePath for backward compatibility
export { getArticlePath as getSearchItemUrl } from "../data/structure";

export interface SearchItem {
  numero: number | string;
  tipo: "articolo" | "disposizione";
  titolo: string;
  descrizione: string;
  contenuto: string;
  url: string;
}

/**
 * Extend Window interface for search index
 */
declare global {
  interface Window {
    __SEARCH_INDEX__: SearchItem[];
  }
}
