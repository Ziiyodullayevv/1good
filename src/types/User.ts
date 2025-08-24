// src/types/User.ts
export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  avatarUrl: string;
  title: string;
  bio: string;
  hourlyRate: string;
  role: 'freelancer' | 'client';
  skills: string[];
  location: string;
}
