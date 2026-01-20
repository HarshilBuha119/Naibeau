import { useQuery } from '@tanstack/react-query';
import apiClient from './apiClient';

const dashboardApi = () =>
  apiClient.get('/customer/dashboard?gender=female&distanceKm=30&latitude=22.9950258&longitude=72.6035339').then(res => res.data);

export const useDashboard = (options = {}) =>
  useQuery({
    queryKey: ['dashboard'],
    queryFn: dashboardApi,
    ...options,
  });
