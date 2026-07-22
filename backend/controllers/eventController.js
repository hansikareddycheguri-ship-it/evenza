import Event from "../models/Event.js";

export const createEvent = async (req, res) => {
    try {

        const {
            title,
            description,
            date,
            location,
            totalSeats
        } = req.body;

        if (
            !title ||
            !description ||
            !date ||
            !location ||
            !totalSeats
        ) {
            return res.status(400).json({
                message: "Please fill all the fields"
            });
        }

        const event = await Event.create({
            title,
            description,
            date,
            location,
            totalSeats,
            availableSeats: totalSeats,
            organizer: req.user._id,
        });

        return res.status(201).json({
            message: "Event created successfully",
            event,
        });

    } catch (error) {

        console.error(error);

        return res.status(500).json({
            message: "Internal Server Error",
        });

    }
};
export const getAllEvents = async (req, res) => {
    try {

        const events = await Event.find()
            .populate("organizer", "name email")
            .sort({ date: 1 });

        return res.status(200).json(events);

    } catch (error) {

        console.error(error);

        return res.status(500).json({
            message: "Internal Server Error"
        });

    }
};

export const getEventById = async (req, res) => {
    try {

        const event = await Event.findById(req.params.id)
            .populate("organizer", "name email");

        if (!event) {
            return res.status(404).json({
                message: "Event not found"
            });
        }

        return res.status(200).json(event);

    } catch (error) {

        console.error(error);

        return res.status(500).json({
            message: "Internal Server Error"
        });

    }
};
export const updateEvent = async (req, res) => {
    try {

        const event = await Event.findById(req.params.id);

        if (!event) {
            return res.status(404).json({
                message: "Event not found"
            });
        }

        // Authorization check
        if (event.organizer.toString() !== req.user._id.toString()) {
            return res.status(403).json({
                message: "You are not authorized to update this event"
            });
        }

       const {
    title,
    description,
    date,
    location,
    totalSeats
} = req.body;

const updatedEvent = await Event.findByIdAndUpdate(
    req.params.id,
    {
        title,
        description,
        date,
        location,
        totalSeats
    },
    {
        new: true,
        runValidators: true
    }
);
        

        return res.status(200).json({
            message: "Event updated successfully",
            event: updatedEvent,
        });

    } catch (error) {

        console.error(error);

        return res.status(500).json({
            message: "Internal Server Error"
        });

    }
};export const deleteEvent = async (req, res) => {
    try {

        const event = await Event.findById(req.params.id);

        if (!event) {
            return res.status(404).json({
                message: "Event not found"
            });
        }

        if (event.organizer.toString() !== req.user._id.toString()) {
            return res.status(403).json({
                message: "You are not authorized to delete this event"
            });
        }

        await event.deleteOne();

        return res.status(200).json({
            message: "Event deleted successfully"
        });

    } catch (error) {

        console.error(error);

        return res.status(500).json({
            message: "Internal Server Error"
        });

    }
};
export const getMyEvents = async (req, res) => {
    try {

        const events = await Event.find({
            organizer: req.user._id
        }).sort({ date: 1 });

        return res.status(200).json(events);

    } catch (error) {

        console.error(error);

        return res.status(500).json({
            message: "Internal Server Error"
        });

    }
};