import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import apiClient from './apiClient';

const getCartApi = () => 
  apiClient
    .get('/customer/cart/list') 
    .then(res => res.data);

const addToCartApi = payload =>
  apiClient
    .post('/customer/add/cart', payload)
    .then(res => res.data);

const updateCartApi = payload =>
  apiClient
    .post('/customer/cart/update', payload)
    .then(res => res.data);

const removeFromCartApi = payload =>
  apiClient
    .post('/customer/cart/remove', payload)
    .then(res => res.data);

export const useCart = () => {
  return useQuery({
    queryKey: ['cart'],
    queryFn: getCartApi,
    staleTime: 1000 * 60 * 5, 
  });
};

export const useAddToCart = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: addToCartApi,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cart'] });
    },
  });
};

export const useUpdateCart = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateCartApi,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cart'] });
    },
  });
};

export const useRemoveFromCart = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: removeFromCartApi,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cart'] });
    },
  });
};