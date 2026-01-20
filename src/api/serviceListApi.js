import { useQuery } from '@tanstack/react-query';
import apiClient from './apiClient';

const fetchServices = async () => {
  const res = await apiClient.get('/customer/service/list?page=1&limit=100&gender=female&lat=23.1336694&long=72.5669654');
  return res.data.data.docs;
};

export const useServices = () =>
  useQuery({
    queryKey: ['services'],
    queryFn: fetchServices,
    staleTime: 1000 * 60 * 5, 
  });
