import { useMutation, useQueryClient } from '@tanstack/react-query';
import api from '../lib/axios';

const updateUser = async (data: unknown) => {
  const response = await api.put('/user/me', data);
  return response.data;
};

export function useUpdateUser() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['user'] });
    },
  });
}
