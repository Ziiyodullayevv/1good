import { useQuery } from '@tanstack/react-query';
import api from '../lib/axios';

const fetchUser = async () => {
  const response = await api.get('/user/me');
  return response.data;
};

export function useUser() {
  return useQuery({
    queryKey: ['user'],
    queryFn: fetchUser,
    staleTime: 1000 * 60 * 5, // 5 daqiqa — cache'da saqlash
    retry: 1, // xatolik bo‘lsa, 1 marta qayta urinadi
  });
}
