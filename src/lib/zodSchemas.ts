// lib/zodSchemas.ts
import { z } from 'zod';

export const portfolioSchema = z.object({
  title: z.string().min(4, 'Title is required'),
  description: z.string().min(60, 'Description is required'),
  imageURL: z.url('Must be a valid URL'),
  link: z.url('Must be a valid URL'),
  skills: z.array(z.string()).min(1, 'At least one skill is required'),
  user_id: z.string().optional(),
});

export const projectSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  budget: z.number().min(5, 'Budget must be greater than 5'),
  description: z.string().min(1, 'Description is required'),
  summary: z.string().min(1, 'Summary is required'),
  deadline: z.date({ error: 'Deadline is required' }),
  skillsRequired: z.array(z.string()).min(1, 'At least one skill is required'),
});

export type ProjectFormData = z.infer<typeof projectSchema>;
export type PortfolioFormData = z.infer<typeof portfolioSchema>;
