import { useMutation } from '@tanstack/react-query';
import { loginUser } from '../api/loginApi';
import { LoginFormValues } from '../schema/loginSchema';

export const useLogin = () => {
  return useMutation({
    mutationFn: (data: LoginFormValues) => loginUser(data),
  });
};
