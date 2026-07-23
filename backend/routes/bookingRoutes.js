import express from "express";
import { bookEvent,getMyBookings,cancelBooking } from "../controllers/bookingController.js";
import  protect  from "../middleware/authMiddleware.js";
const router=express.Router();
router.post("/", protect, bookEvent);
router.get("/my-bookings", protect, getMyBookings);
router.delete("/:id", protect, cancelBooking);
export default router;