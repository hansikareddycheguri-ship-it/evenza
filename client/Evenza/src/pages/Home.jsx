import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../services/api";

function Home() {
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const response = await api.get("/events");

                if (Array.isArray(response.data)) {
                    setEvents(response.data);
                } else {
                    setEvents(response.data.events || []);
                }
            } catch (error) {
                setError("Failed to load events");
            } finally {
                setLoading(false);
            }
        };

        fetchEvents();
    }, []);

    if (loading) {
        return (
            <div className="text-center mt-5">
                <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
                <p className="mt-3">Loading events...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="alert alert-danger mt-4">
                {error}
            </div>
        );
    }

    return (
        <div className="container py-5">
            <h1 className="text-center fw-bold mb-3">
                🎉 Evenza
            </h1>

            <p className="text-center text-muted mb-5">
                Discover and book exciting events around you.
            </p>

            {events.length === 0 ? (
                <div className="alert alert-info text-center">
    No events are available at the moment.
</div>
            ) : (
                <div className="row">
                    {events.map((event) => (
                        <div
                            key={event._id}
                            className="col-md-6 col-lg-4 mb-4"
                        >
                            <div className="card h-100 shadow border-0">
                                <div className="card-body">
                                    <h4 className="card-title fw-bold">
                                        🎉 {event.title}
                                    </h4>

                                    <p className="card-text text-muted">
                                        {event.description}
                                    </p>

                                    <p>
                                        📅 <strong>Date:</strong>{" "}
                                        {new Date(event.date).toLocaleDateString()}
                                    </p>

                                    <p>
                                        📍 <strong>Location:</strong> {event.location}
                                    </p>

                                    <p>
                                        👥 <strong>Available Seats:</strong>{" "}
                                        {event.availableSeats}
                                    </p>
                                </div>

                                <div className="card-footer bg-white border-0">
                                    <Link
                                        to={`/events/${event._id}`}
                                        className="btn btn-primary rounded-pill w-100"
                                    >
                                        View Details
                                    </Link>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default Home;