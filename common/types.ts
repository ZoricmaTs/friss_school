import {z} from 'zod';

export const ReviewZod = z.object({
  id: z.string(),
  name: z.string(),
  date: z.string(),
  text: z.string(),
});

export const RunningLineZod = z.object({
  id: z.string(),
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

export const AccordionZod = z.object({
  id: z.string(),
  question: z.string(),
  answer: z.string(),
});

export const DataRootZod = z.object({
  accordions: z.array(AccordionZod),
  header: z.object({
    title: z.string(),
    description: z.string(),
  }),
  courses: z.array(CourseZod),
  reviews: z.array(ReviewZod),
  runningLines: z.array(ReviewZod),
});

export type AccordionType = z.infer<typeof AccordionZod>;

export type CourseType = z.infer<typeof CourseZod>;

export type DataRootType = z.infer<typeof DataRootZod>;

export type ReviewType = z.infer<typeof ReviewZod>;

export type RunningLineType = z.infer<typeof RunningLineZod>;
