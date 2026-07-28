import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../services/api";

function MyBookings() {
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [message, setMessage] = useState("");

    const fetchBookings = async () => {
        try {
            const response = await api.get("/bookings/my-bookings");

            setBookings(response.data);
        } catch (error) {
            console.error(error);

            setMessage(
                error.response?.data?.message ||
                "Failed to load bookings"
            );
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchBookings();
    }, []);

    const handleCancel = async (bookingId) => {
        try {
            const response = await api.delete(
                `/bookings/${bookingId}`
            );

            setMessage(response.data.message);

            // Fetch bookings again so status updates immediately
            await fetchBookings();

        } catch (error) {
            setMessage(
                error.response?.data?.message ||
                "Cancellation failed"
            );
        }
    };

    if (loading) {
        return <p>Loading bookings...</p>;
    }

    return (
        <div>
            <Link to="/">← Back to Events</Link>

            <h1>My Bookings</h1>

            {message && <p>{message}</p>}

            {bookings.length === 0 ? (
                <p>You have no bookings.</p>
            ) : (
                bookings.map((booking) => (
                    <div key={booking._id}>

                        <h2>
                            {booking.event?.title || "Event unavailable"}
                        </h2>

                        <p>
                            Date:{" "}
                            {booking.event?.date
                                ? new Date(
                                    booking.event.date
                                ).toLocaleDateString()
                                : "N/A"}
                        </p>

                        <p>
                            Location:{" "}
                            {booking.event?.location || "N/A"}
                        </p>

                        <p>Status: {booking.status}</p>

                        {booking.status === "Booked" && (
                            <button
                                onClick={() =>
                                    handleCancel(booking._id)
                                }
                            >
                                Cancel Booking
                            </button>
                        )}

                        <hr />
                    </div>
                ))
            )}
        </div>
    );
}

export default MyBookings;