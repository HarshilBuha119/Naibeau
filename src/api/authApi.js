import { useMutation } from '@tanstack/react-query';
import apiClient from './apiClient';

const loginOtpApi = payload =>
  apiClient.post('/auth/customer/login', payload).then(r => r.data);

const registerOtpApi = payload =>
  apiClient.post('/auth/register/customer', payload).then(r => r.data);

const verifyOtpApi = payload =>
  apiClient.post('/auth/verify-otp', payload).then(r => r.data);


export const useLoginOtp = () =>
  useMutation({ mutationFn: loginOtpApi });

export const useRegisterOtp = () =>
  useMutation({ mutationFn: registerOtpApi });

export const useVerifyOtp = () =>
  useMutation({ mutationFn: verifyOtpApi });
