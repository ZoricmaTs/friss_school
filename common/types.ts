import {z} from 'zod';

export const ReviewZod = z.object({
  id: z.string(),
  name: z.string(),
  date: z.string(),
  text: z.string(),
});

export const CourseZod = z.object({
  id: z.string(),
  title: z.string(),
  description: z.string(),
  duration: z.string(),
  preview: z.string(),
  price: z.string(),
  image: z.string(),
});

export const DataRootZod = z.object({
  header: z.object({
    title: z.string(),
    description: z.string(),
  }),
  courses: z.array(CourseZod),
  reviews: z.array(ReviewZod)
});

export type CourseType = z.infer<typeof CourseZod>;

export type DataRootType = z.infer<typeof DataRootZod>;

export type ReviewType = z.infer<typeof ReviewZod>;