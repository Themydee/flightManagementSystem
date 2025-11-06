import axios from 'axios';

const API_BASE_URL = 'https://flightmanagementsystem.onrender.com/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export const authAPI = {
  login: (credentials) => api.post('/auth/login', credentials),
};

export const flightsAPI = {
  getAll: () => api.get('/flights'),

  create: (flightData) =>
    api.post('/flights/add', {
      flightNumber: flightData.flightNumber,
      origin: flightData.origin,
      destination: flightData.destination,
      departureTime: flightData.departureTime,
      arrivalTime: flightData.arrivalTime,
      availableSeats: flightData.availableSeats,
    }),

  update: (id, flightData) =>
    api.put(`/flights/${id}`, {
      flightNumber: flightData.flightNumber,
      origin: flightData.origin,
      destination: flightData.destination,
      departureTime: flightData.departureTime,
      arrivalTime: flightData.arrivalTime,
      availableSeats: flightData.availableSeats,
    }),

  delete: (id) => api.delete(`/flights/delete/${id}`),
};

export default api;
