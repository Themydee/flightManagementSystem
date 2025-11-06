import express from "express";
import { getAllFlights, addFlight, updateFlight, deleteFlight } from "../controllers/flightController.js";
import { verifyAdmin } from "../middleware/auth.js";

const router = express.Router();

router.get("/", verifyAdmin, getAllFlights);
router.post("/add", verifyAdmin, addFlight);
router.put("/:id", verifyAdmin, updateFlight);
router.delete("/delete/:id", verifyAdmin, deleteFlight);

export default router;
