# ✈️ Flight Management System

## 🧭 Overview
The **Flight Management System** is a simple full-stack application that allows users to perform CRUD operations on flight records — including adding, viewing, updating, and deleting flight details.

---

## 🪜 How to Clone
1. Open your terminal.  
2. Run the following command:
   ```bash
   git clone https://github.com/yourusername/flight-management-system.git
   ```
3. Navigate into the project folder:
   ```bash
   cd flight-management-system
   ```

---

## 💻 Client Setup
1. Navigate to the client folder:
   ```bash
   cd client
   ```
2. Install dependencies:
   ```bash
   pnpm install
   ```
3. Start the development server:
   ```bash
   pnpm run dev
   ```
4. The client runs on [http://localhost:5173](http://localhost:5173)

---

## 🖥️ Server Setup
1. Navigate to the server folder:
   ```bash
   cd server
   ```
2. Install dependencies:
   ```bash
   pnpm install
   ```
3. Start the backend server:
   ```bash
   pnpm run dev
   ```
4. The server runs on [http://localhost:3000](http://localhost:3000)

---

## ⛁ Database Setup
1. Create a .env file inside the server with the directory:

   ```bash
    DATABASE_URL=postgresql://username:password@localhost:5432/flightdb
    PORT=5000

    ```

2. Run drizzle kit migrations:
   ```bash
    npx drizzle-kit generate
    npx drizzle-kit push

   ```
3. Start the database:
   ```bash
  psql -U postgres -p 5432
  connect to your flight_db and view your tables
   ```


## 🔄 CRUD Features
- **Create:** Add new flight records  
- **Read:** Fetch and display flight data  
- **Update:** Edit existing flight details  
- **Delete:** Remove flights from the database  

---

## 🚀 Run Locally
Make sure both the client and server are running simultaneously.

- **Client:** [http://localhost:5173](http://localhost:5173)  
- **Server:** [http://localhost:3000](http://localhost:3000)

---

## 🧰 Tech Stack
- **Frontend:** React + Vite + TailwindCSS  
- **Backend:** Node.js + Express  
- **Database:** Postgres + Drizzle ORM

---

## 📄 License
This project is open-source and available under the [MIT License](LICENSE).