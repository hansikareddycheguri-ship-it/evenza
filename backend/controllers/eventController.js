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
        if(totalSeats<=0){
            return res.status(400).json({
                message:"Total seats must be greater than 0"
            });
        }
        if(new Date(date) <=new Date()){
            return res.status(400).json({
                message:"Event date must be in the future"
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

        // 1. Get search/filter values from URL
        const { search, location } = req.query;

        // 2. Create MongoDB filter
        const filter = {};

        // 3. Search by event title
        if (search) {
            filter.title = {
                $regex: search,
                $options: "i"
            };
        }

        // 4. Filter by location
        if (location) {
            filter.location = {
                $regex: location,
                $options: "i"
            };
        }
         if (req.query.upcoming === "true") {
    filter.date = {
        $gte: new Date()
    };
}
        // 5. Pagination
        const page = Math.max(Number(req.query.page) || 1, 1);
        const limit = 10;
        const skip = (page - 1) * limit;

        // 6. Fetch only the required events
        const events = await Event.find(filter)
            .populate("organizer", "name email")
            .sort({ date: 1 })
            .skip(skip)
            .limit(limit);

        // 7. Count matching events and total Pages
        const totalEvents = await Event.countDocuments(filter);
        const totalPages=Math.ceil(totalEvents/limit);
        // 8. Send result
        return res.status(200).json({
            currentPage: page,
            totalPages,
            totalEvents,
            events
        });

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