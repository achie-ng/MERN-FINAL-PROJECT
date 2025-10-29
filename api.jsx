import axios from 'axios'


const BASE = import.meta.env.VITE_API_BASE || 'http://localhost:4000';
const api = axios.create({ baseURL: `${BASE}/api` });


export const getAppointments = () => api.get('/appointments').then(r => r.data);
export const createAppointment = (payload) => api.post('/appointments', payload).then(r => r.data);
export const updateAppointment = (id, payload) => api.put(`/appointments/${id}`, payload).then(r => r.data);
export const deleteAppointment = (id) => api.delete(`/appointments/${id}`).then(r => r.data);


export default api;