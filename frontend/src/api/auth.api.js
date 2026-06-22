import axiosClient from './axiosClient';

export const login = (credentials) =>
  axiosClient.post('/auth/login', credentials).then((r) => r.data.data);

export const logout = () =>
  axiosClient.post('/auth/logout').then((r) => r.data.data);

export const getMe = () =>
  axiosClient.get('/auth/me').then((r) => r.data.data);
