import { pgTable, serial, varchar, integer, timestamp } from "drizzle-orm/pg-core";

export const flights = pgTable("flights", {
  id: serial("id").primaryKey(),
  flightNumber: varchar("flight_number", { length: 10 }).notNull(),
  origin: varchar("origin", { length: 100 }).notNull(),
  destination: varchar("destination", { length: 100 }).notNull(),
  departureTime: timestamp("departure_time").notNull(),
  arrivalTime: timestamp("arrival_time").notNull(),
  availableSeats: integer("available_seats").notNull(),
});
