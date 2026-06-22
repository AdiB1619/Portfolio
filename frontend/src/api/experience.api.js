import axiosClient from './axiosClient';

export const getExperience = () =>
  axiosClient.get('/experience').then((r) => r.data.data?.experience ?? []);

export const createExperience = (data) =>
  axiosClient.post('/experience', data).then((r) => r.data.data);

export const updateExperience = (id, data) =>
  axiosClient.put(`/experience/${id}`, data).then((r) => r.data.data);

export const deleteExperience = (id) =>
  axiosClient.delete(`/experience/${id}`).then((r) => r.data.data);
