import api from '@/lib/axios';
import { RegisterFormValues } from '../schema/registerSchema';

export const registerUser = async (data: RegisterFormValues) => {
  const response = await api.post('auth/register', data);
  return response.data;
};


