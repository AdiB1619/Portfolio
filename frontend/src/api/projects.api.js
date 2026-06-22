import axiosClient from './axiosClient';

export const getProjects = (params = {}) =>
  axiosClient.get('/projects', { params }).then((r) => r.data.data?.projects ?? []);

export const getProjectById = (id) =>
  axiosClient.get(`/projects/${id}`).then((r) => r.data.data);

export const createProject = (data) =>
  axiosClient.post('/projects', data).then((r) => r.data.data);

export const updateProject = (id, data) =>
  axiosClient.put(`/projects/${id}`, data).then((r) => r.data.data);

export const deleteProject = (id) =>
  axiosClient.delete(`/projects/${id}`).then((r) => r.data.data);
