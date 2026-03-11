import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const articoli = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/articoli' }),
  schema: z.object({
    numero: z.union([z.number(), z.string()]), // number for articles, string (Roman) for dispositions
    tipo: z.enum(['articolo', 'disposizione']),
    titolo: z.string(),
    parte: z.string().nullable(),
    titolo_sezione: z.string().nullable(), // Titolo within Parte
    sezione: z.string().nullable(), // Sezione within Titolo
    abrogato: z.boolean(),
    descrizione: z.string(),
  }),
});

export const collections = { articoli };
