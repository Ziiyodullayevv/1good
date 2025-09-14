import { z } from 'zod';

export const registerSchema = z.object({
  email: z.email({ message: 'Invalid email format' }),
  firstName: z.string().min(1),
  lastName: z.string().min(1),
  password: z.string().min(6),
  role: z.enum(['freelancer', 'client'], { message: 'Rol tanlang' }),
});

export type RegisterFormValues = z.infer<typeof registerSchema>;
