import Booking from "../models/Booking.js";
import Event from "../models/Event.js";
export const bookEvent = async (req, res) => {
    try {
        const {eventId}=req.body;
        const event = await Event.findById(eventId);
if (!event) {
    return res.status(404).json({
        message: "Event not found"
    });
}
if (event.availableSeats <= 0) {
    return res.status(400).json({
        message: "No seats available",
    });
}
const existingBooking = await Booking.findOne({
    user: req.user._id,
    event: eventId,
});
if (existingBooking) {

    if (existingBooking.status === "Booked") {
        return res.status(400).json({
            message: "You have already booked this event"
        });
    }

    existingBooking.status = "Booked";
    existingBooking.bookingDate = new Date();

    event.availableSeats--;

    await existingBooking.save();
    await event.save();

    return res.status(200).json({
        message: "Event booked successfully",
        booking: existingBooking
    });
}
    } 
    catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Server Error"
        });
    }
};
export const getMyBookings = async (req, res) => {
    try {
   const bookings=await Booking.find({
    user: req.user._id
}).populate("event");
return res.status(200).json(bookings);
    }
     catch (error) {
        console.error(error);

        res.status(500).json({
            message: "Server Error"
        });
    }
};
export const cancelBooking = async (req, res) => {
    try {
const booking = await Booking.findById(req.params.id);
if (!booking) {
    return res.status(404).json({
        message: "Booking not found"
    });
}
if (booking.user.toString() !== req.user._id.toString()) {
    return res.status(401).json({
        message: "Not authorized"
    });
}
if (booking.status === "Cancelled") {
    return res.status(400).json({
        message: "Booking already cancelled"
    });
}
const event = await Event.findById(booking.event);
event.availableSeats++;
booking.status = "Cancelled";
await event.save();
await booking.save();
return res.status(200).json({
    message: "Booking cancelled successfully"
});
    }
     catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Server Error"
        });
    }
};

