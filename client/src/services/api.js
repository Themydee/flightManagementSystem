import axios from 'axios';

const API_BASE_URL = 'https://flight-management-system-ten.vercel.app/api';

// Create Axios instance
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Attach token automatically if present
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

// Auth endpoints
export const authAPI = {
  login: (credentials) => api.post('/auth/login', credentials),
};

// Flights endpoints
export const flightsAPI = {
  // Get all flights
  getAll: () => api.get('/flights'),

  // Create a new flight
  create: (flightData) =>
    api.post('/flights/add', {
      flightNumber: flightData.flightNumber,
      origin: flightData.origin,
      destination: flightData.destination,
      departureTime: flightData.departureTime,
      arrivalTime: flightData.arrivalTime,
      availableSeats: flightData.availableSeats,
    }),

  // Update a flight by id
  update: (id, flightData) =>
    api.put(`/flights/${id}`, {
      flightNumber: flightData.flightNumber,
      origin: flightData.origin,
      destination: flightData.destination,
      departureTime: flightData.departureTime,
      arrivalTime: flightData.arrivalTime,
      availableSeats: flightData.availableSeats,
    }),

  // Delete a flight by id
  delete: (id) => api.delete(`/flights/delete/${id}`),
};

export default api;
