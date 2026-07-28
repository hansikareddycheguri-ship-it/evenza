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
            if (!window.confirm("Are you sure you want to cancel this booking?")) {
    return;
}
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
       return (
    <div className="text-center mt-5">
        <div className="spinner-border text-primary"></div>
    </div>
);
    }

   return (
    <div className="container py-5">
          <Link
    to="/"
    className="btn btn-outline-secondary mb-4"
>
    ← Back to Events
</Link>

           <h1 className="text-center fw-bold mb-5">
    🎟️ My Bookings
</h1>

            {message && <p>{message}</p>}

            {bookings.length === 0 ? (
               <div className="alert alert-info text-center">
    You haven't booked any events yet.
</div>
            ) : (
                bookings.map((booking) => (
                    <div key={booking._id} className="card shadow-sm border-0 mb-4">
    <div className="card-body">

        <h4 className="fw-bold">
            🎉 {booking.event.title}
        </h4>

        <p className="text-muted">
            {booking.event.description}
        </p>

        <p>
            📅 {new Date(booking.event.date).toLocaleDateString()}
        </p>

        <p>
            📍 {booking.event.location}
        </p>

    {booking.status === "Booked" ? (
    <button
        onClick={() => handleCancel(booking._id)}
        className="btn btn-danger"
    >
        Cancel Booking
    </button>
) : (
    <button
        className="btn btn-secondary"
        disabled
    >
        Cancelled
    </button>
)}
    </div>
</div>
                ))
            )}
        </div>
    );
}

export default MyBookings;