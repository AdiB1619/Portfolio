import axiosClient from './axiosClient';

export const getSkills = (params = {}) =>
  axiosClient.get('/skills', { params }).then((r) => r.data.data?.skills ?? []);

export const createSkill = (data) =>
  axiosClient.post('/skills', data).then((r) => r.data.data);

export const updateSkill = (id, data) =>
  axiosClient.put(`/skills/${id}`, data).then((r) => r.data.data);

export const deleteSkill = (id) =>
  axiosClient.delete(`/skills/${id}`).then((r) => r.data.data);
