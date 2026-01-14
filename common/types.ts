import {z} from 'zod';

export const ReviewZod = z.object({
    name: z.string(),
    date: z.string(),
    text: z.string(),
  });

export const DataRootZod = z.object({
  header: z.object({
    title: z.string(),
    description: z.string(),
  }),
  reviews: z.array(ReviewZod)
});

export type DataRootType = z.infer<typeof DataRootZod>;

export type ReviewType = z.infer<typeof ReviewZod>;