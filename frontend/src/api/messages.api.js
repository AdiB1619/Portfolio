import axiosClient from './axiosClient';

export const sendMessage = (data) =>
  axiosClient.post('/messages', data).then((r) => r.data.data);

export const getMessages = (params = {}) =>
  axiosClient.get('/messages', { params }).then((r) => r.data.data);

export const markMessageRead = (id, read) =>
  axiosClient.patch(`/messages/${id}/read`, { read }).then((r) => r.data.data);

export const deleteMessage = (id) =>
  axiosClient.delete(`/messages/${id}`).then((r) => r.data.data);
