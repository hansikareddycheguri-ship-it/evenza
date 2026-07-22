import express from "express";
import { createEvent,getAllEvents,getEventById,updateEvent,deleteEvent,getMyEvents} from "../controllers/eventController.js";
import protect from "../middleware/authMiddleware.js";

const router = express.Router();
router.post("/", protect, createEvent);

router.get("/my-events", protect, getMyEvents);

router.get("/", getAllEvents);

router.get("/:id", getEventById);

router.put("/:id", protect, updateEvent);

router.delete("/:id", protect, deleteEvent);
export default router;