CREATE TABLE "flights" (
	"id" serial PRIMARY KEY NOT NULL,
	"flight_number" varchar(10) NOT NULL,
	"origin" varchar(100) NOT NULL,
	"destination" varchar(100) NOT NULL,
	"departure_time" timestamp NOT NULL,
	"arrival_time" timestamp NOT NULL,
	"available_seats" integer NOT NULL
);
