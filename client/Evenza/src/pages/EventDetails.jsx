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
    <div className="container py-5">
        <div className="card shadow-lg border-0">
    <div className="card-body p-5">
          <Link
    to="/"
    className="btn btn-outline-secondary mb-4"
>
    ← Back to Events
</Link>
            <h1 className="fw-bold mb-4">
    🎉 {event.title}
</h1>
           <p className="lead text-muted">
    {event.description}
</p>
       <div className="row mt-4">

    <div className="col-md-6 mb-3">
        <div className="border rounded p-3">
            <strong>📅 Date</strong>
            <br />
            {new Date(event.date).toLocaleDateString()}
        </div>
    </div>

    <div className="col-md-6 mb-3">
        <div className="border rounded p-3">
            <strong>📍 Location</strong>
            <br />
            {event.location}
        </div>
    </div>

    <div className="col-md-6 mb-3">
        <div className="border rounded p-3">
            <strong>👥 Total Seats</strong>
            <br />
            {event.totalSeats}
        </div>
    </div>

    <div className="col-md-6 mb-3">
        <div className="border rounded p-3">
            <strong>✅ Available Seats</strong>
            <br />
            {event.availableSeats}
        </div>
    </div>

</div>
          <button
    className="btn btn-success btn-lg mt-3"
    onClick={handleBooking}
>
    🎟️ Book Event
</button>
{message && (
    <div
        className={`alert ${
            message.toLowerCase().includes("success")
                ? "alert-success"
                : "alert-warning"
        } mt-3`}
    >
        {message}
    </div>
)}     
                </div>
          </div>
        </div>
    );
}
export default EventDetails;

