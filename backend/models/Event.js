import mongoose from "mongoose";

const eventSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: [true, "Title is required"],
            trim: true,
        },

        description: {
            type: String,
            required: [true, "Description is required"],
        },

        date: {
            type: Date,
            required: [true, "Date is required"],
        },

        location: {
            type: String,
            required: [true, "Location is required"],
            trim: true,
        },

        totalSeats: {
            type: Number,
            required: [true, "Total seats are required"],
            min: 1,
        },

        availableSeats: {
            type: Number,
            required: true,
        },

        organizer: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
    },
    {
        timestamps: true,
    }
);

const Event = mongoose.model("Event", eventSchema);

export default Event;