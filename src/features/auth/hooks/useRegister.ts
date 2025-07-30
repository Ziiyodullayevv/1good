import { useMutation } from '@tanstack/react-query';
import { registerUser } from '../api/registerApi';
import { RegisterFormValues } from '../schema/registerSchema';

export const useRegister = () => {
  return useMutation({
    mutationFn: (data: RegisterFormValues) => registerUser(data),
  });
};
