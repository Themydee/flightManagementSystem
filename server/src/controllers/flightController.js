import { db } from '../db.js';
import { flights } from '../db/schema.js';
import { eq } from "drizzle-orm";

// Add Flight
export const addFlight = async (req, res) => {
  try {
    const { flightNumber, origin, destination, departureTime, arrivalTime, availableSeats } = req.body;

    // Validate input
    if (!flightNumber || !origin || !destination || !departureTime || !arrivalTime || availableSeats == null) {
      return res.status(400).json({ error: "All fields are required" });
    }

    // Insert into DB
    const newFlight = await db
      .insert(flights)
      .values({
        flightNumber,
        origin,
        destination,
        departureTime: new Date(departureTime),
        arrivalTime: new Date(arrivalTime),
        availableSeats: parseInt(availableSeats, 10),
      })
      .returning();

    res.status(201).json(newFlight);
  } catch (err) {
    console.error('Add flight error:', err);
    res.status(500).json({ error: "Failed to add flight" });
  }
};

// Get all flights
export const getAllFlights = async (req, res) => {
  try {
    const allFlights = await db.select().from(flights);
    res.json(allFlights);
  } catch (err) {
    console.error('Get flights error:', err);
    res.status(500).json({ error: 'Failed to fetch flights' });
  }
};

// Update flight
export const updateFlight = async (req, res) => {
  try {
    const { id } = req.params;
    const { flightNumber, origin, destination, departureTime, arrivalTime, availableSeats } = req.body;

    if (!flightNumber || !origin || !destination || !departureTime || !arrivalTime || availableSeats == null) {
      return res.status(400).json({ error: "All fields are required" });
    }

   await db.update(flights)
  .set({
    flightNumber: flightNumber,
    origin,
    destination,
    departureTime: new Date(departureTime),
    arrivalTime: new Date(arrivalTime),
    availableSeats: parseInt(availableSeats, 10),
  })
  .where(eq(flights.id, Number(id)));


    res.json({ message: "Flight updated successfully" });
  } catch (err) {
    console.error("Update flight error:", err);
    res.status(500).json({ error: "Failed to update flight" });
  }
};
// Delete flight
export const deleteFlight = async (req, res) => {
  try {
    const { id } = req.params;

    // Ensure ID is valid
    const flightId = Number(id);
    if (isNaN(flightId)) {
      return res.status(400).json({ error: 'Invalid flight ID' });
    }

    // Perform deletion
    await db.delete(flights).where(eq(flights.id, flightId));

    res.json({ message: 'Flight deleted successfully' });
  } catch (err) {
    console.error('Delete flight error:', err);
    res.status(500).json({ error: 'Failed to delete flight' });
  }
};