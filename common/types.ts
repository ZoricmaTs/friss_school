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

export const PatternZod = z.object({
  id: z.string(),
  title: z.string(),
  price: z.number(),
  salePrice: z.number(),
  image: z.optional(z.string()),
  level: z.number(),
});

export const MapZod = z.object({
  coordinates: z.tuple([z.number(), z.number()]),
  address: z.optional(z.string()),
});

export const SocialsZod = z.object({
  treads: z.string(),
  instagram: z.string(),
  whatsapp: z.string(),
  facebook: z.string(),
});

export const ContactZod = z.object({
  phone: z.string(),
  schedule: z.string(),
  socials: SocialsZod,
});

export const DataRootZod = z.object({
  accordions: z.array(AccordionZod),
  header: z.object({
    title: z.string(),
    description: z.string(),
  }),
  courses: z.array(CourseZod),
  patterns: z.array(PatternZod),
  reviews: z.array(ReviewZod),
  runningLines: z.array(RunningLineZod),
  map: MapZod,
  contacts: ContactZod,
});

export type AccordionType = z.infer<typeof AccordionZod>;

export type CourseType = z.infer<typeof CourseZod>;

export type DataRootType = z.infer<typeof DataRootZod>;

export type PatternType = z.infer<typeof PatternZod>;

export type ReviewType = z.infer<typeof ReviewZod>;

export type RunningLineType = z.infer<typeof RunningLineZod>;
