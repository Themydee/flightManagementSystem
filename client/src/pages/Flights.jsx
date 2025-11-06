import React, { useState, useEffect } from 'react';
import { flightsAPI } from '../services/api';
import { Plane, Plus, Edit2, Trash2, X, Loader, Search } from 'lucide-react';
import { toast } from 'react-hot-toast';

const Flights = () => {
  const [flights, setFlights] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  // Modal states
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState('add'); // 'add' or 'edit'
  const [selectedFlight, setSelectedFlight] = useState(null);

  // Form state
  const [formData, setFormData] = useState({
    flightNumber: '',
    origin: '',
    destination: '',
    departureTime: '',
    arrivalTime: '',
    availableSeats: '',
  });

  // Fetch all flights
  const fetchFlights = async () => {
    try {
      setLoading(true);
      const response = await flightsAPI.getAll();
      setFlights(response.data || []);
    } catch (err) {
      console.error('Error fetching flights:', err);
      toast.error('Failed to load flights. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFlights();
  }, []);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleAdd = () => {
    setModalMode('add');
    setSelectedFlight(null);
    setFormData({
      flightNumber: '',
      origin: '',
      destination: '',
      departureTime: '',
      arrivalTime: '',
      availableSeats: '',
    });
    setIsModalOpen(true);
  };

  const handleEdit = (flight) => {
    setModalMode('edit');
    setSelectedFlight(flight);
    setFormData({
      flightNumber: flight.flightNumber || '',
      origin: flight.origin || '',
      destination: flight.destination || '',
      departureTime: flight.departureTime
        ? new Date(flight.departureTime).toISOString().slice(0, 16)
        : '',
      arrivalTime: flight.arrivalTime
        ? new Date(flight.arrivalTime).toISOString().slice(0, 16)
        : '',
      availableSeats: flight.availableSeats?.toString() || '',
    });
    setIsModalOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !formData.flightNumber.trim() ||
      !formData.origin.trim() ||
      !formData.destination.trim() ||
      !formData.departureTime ||
      !formData.arrivalTime ||
      !formData.availableSeats
    ) {
      toast.error('All fields are required.');
      return;
    }

    const flightData = {
      flightNumber: formData.flightNumber.trim(),
      origin: formData.origin.trim(),
      destination: formData.destination.trim(),
      departureTime: formData.departureTime,
      arrivalTime: formData.arrivalTime,
      availableSeats: parseInt(formData.availableSeats, 10),
    };

    try {
      if (modalMode === 'add') {
        await flightsAPI.create(flightData);
        toast.success('Flight added successfully!');
      } else {
        await flightsAPI.update(selectedFlight.id, flightData);
        toast.success('Flight updated successfully!');
      }

      setIsModalOpen(false);
      fetchFlights();
    } catch (err) {
      console.error('Error saving flight:', err);
      toast.error(err.response?.data?.error || 'Failed to save flight.');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this flight?')) return;
    try {
      await flightsAPI.delete(id);
      toast.success('Flight deleted successfully!');
      fetchFlights();
    } catch (err) {
      console.error('Error deleting flight:', err);
      toast.error('Failed to delete flight.');
    }
  };

  const filteredFlights = flights.filter(
    (flight) =>
      flight.origin?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      flight.destination?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      flight.flightNumber?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
            <Plane className="h-7 w-7 text-blue-600" />
            Flight Management
          </h1>
          <p className="text-sm text-gray-600 mt-1">Manage all flights, schedules, and availability</p>
        </div>
        <button
          onClick={handleAdd}
          className="flex items-center justify-center space-x-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-3 rounded-lg hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
        >
          <Plus className="h-5 w-5" />
          <span className="font-medium">Add New Flight</span>
        </button>
      </div>

      {/* Search */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search by flight number, origin, or destination..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
          />
        </div>
      </div>

      {/* Flights Table */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        {loading ? (
          <div className="flex items-center justify-center py-12">
            <Loader className="h-8 w-8 text-blue-600 animate-spin" />
          </div>
        ) : filteredFlights.length === 0 ? (
          <div className="text-center py-12">
            <Plane className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600 font-medium">No flights found</p>
            <p className="text-sm text-gray-500 mt-1">
              {searchTerm ? 'Try adjusting your search criteria' : 'Click "Add New Flight" to create your first flight'}
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Flight Number</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Origin</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Destination</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Departure</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Arrival</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Available Seats</th>
                  <th className="px-6 py-3 text-right text-xs font-semibold text-gray-700 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredFlights.map((flight) => (
                  <tr key={flight.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap font-semibold text-gray-900">{flight.flightNumber}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-gray-700">{flight.origin}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-gray-700">{flight.destination}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{new Date(flight.departureTime).toLocaleString()}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{new Date(flight.arrivalTime).toLocaleString()}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                        flight.availableSeats > 50
                          ? 'bg-green-100 text-green-800'
                          : flight.availableSeats > 20
                          ? 'bg-yellow-100 text-yellow-800'
                          : 'bg-red-100 text-red-800'
                      }`}>
                        {flight.availableSeats} seats
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex items-center justify-end space-x-2">
                        <button onClick={() => handleEdit(flight)} className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors" title="Edit">
                          <Edit2 className="h-4 w-4" />
                        </button>
                        <button onClick={() => handleDelete(flight.id)} className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors" title="Delete">
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Modal (unchanged) */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          {isModalOpen && (
  <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
    <div className="bg-white rounded-xl shadow-2xl w-full max-w-lg p-6 relative">
      {/* Close button */}
      <button
        onClick={() => setIsModalOpen(false)}
        className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
      >
        <X className="h-5 w-5" />
      </button>

      <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
        {modalMode === 'add' ? <Plus className="h-5 w-5 text-blue-600" /> : <Edit2 className="h-5 w-5 text-blue-600" />}
        {modalMode === 'add' ? 'Add New Flight' : 'Edit Flight'}
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Flight Number</label>
          <input
            type="text"
            name="flightNumber"
            value={formData.flightNumber}
            onChange={handleInputChange}
            className="w-full mt-1 border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Origin</label>
            <input
              type="text"
              name="origin"
              value={formData.origin}
              onChange={handleInputChange}
              className="w-full mt-1 border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Destination</label>
            <input
              type="text"
              name="destination"
              value={formData.destination}
              onChange={handleInputChange}
              className="w-full mt-1 border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Departure Time</label>
            <input
              type="datetime-local"
              name="departureTime"
              value={formData.departureTime}
              onChange={handleInputChange}
              className="w-full mt-1 border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Arrival Time</label>
            <input
              type="datetime-local"
              name="arrivalTime"
              value={formData.arrivalTime}
              onChange={handleInputChange}
              className="w-full mt-1 border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Available Seats</label>
          <input
            type="number"
            name="availableSeats"
            value={formData.availableSeats}
            onChange={handleInputChange}
            className="w-full mt-1 border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white font-semibold py-2.5 rounded-lg hover:bg-blue-700 transition-all duration-200"
        >
          {modalMode === 'add' ? 'Add Flight' : 'Save Changes'}
        </button>
      </form>
    </div>
  </div>
)}

        </div>
      )}
    </div>
  );
};

export default Flights;
