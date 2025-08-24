import { z } from 'zod';

export const loginSchema = z.object({
  email: z.email({ message: 'Invalid email format' }),
  password: z.string().min(6, { message: 'More character' }),
});

export type LoginFormValues = z.infer<typeof loginSchema>;
