import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import api from "../services/api";

function EventDetails() {
    const { id } = useParams();

    const [event, setEvent] = useState(null);
    const [message, setMessage] = useState("");

    useEffect(() => {
        const fetchEvent = async () => {
            try {
                const response = await api.get(`/events/${id}`);
                setEvent(response.data);
            } catch (error) {
                console.error(error);
                setMessage("Failed to load event");
            }
        };

        fetchEvent();
    }, [id]);

    const handleBooking = async () => {
        try {
            const response = await api.post("/bookings", {
                eventId: id
            });

            setMessage(response.data.message);

            // Refresh event so availableSeats updates
            const eventResponse = await api.get(`/events/${id}`);
            setEvent(eventResponse.data);
        } catch (error) {
            setMessage(
                error.response?.data?.message || "Booking failed"
            );
        }
    };

    if (!event) {
        return <p>{message || "Loading event..."}</p>;
    }

    return (
        <div>
            <Link to="/">← Back to Events</Link>
            <h1>{event.title}</h1>
            <p>{event.description}</p>
            <p>Date: {new Date(event.date).toLocaleDateString()}</p>
            <p>Location: {event.location}</p>
            <p>Total Seats: {event.totalSeats}</p>
            <p>Available Seats: {event.availableSeats}</p>
            <button
                onClick={handleBooking}
                disabled={event.availableSeats === 0}
            >
                {event.availableSeats === 0 ? "Sold Out" : "Book Event"}
            </button>

            <p>{message}</p>
        </div>
    );
}
export default EventDetails;

