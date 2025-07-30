import api from '@/lib/axios';
import { LoginFormValues } from '../schema/loginSchema';

export const loginUser = async (data: LoginFormValues) => {
  const response = await api.post('auth/login', data);
  return response.data;
};
