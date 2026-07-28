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

                console.log("EVENT RESPONSE:", response.data);

                if (Array.isArray(response.data)) {
                    setEvents(response.data);
                } else {
                    setEvents(response.data.events || []);
                }
            } catch (error) {
                console.error("EVENT FETCH ERROR:", error);
                setError("Failed to load events");
            } finally {
                setLoading(false);
            }
        };

        fetchEvents();
    }, []);

    if (loading) {
        return <p>Loading events...</p>;
    }

    if (error) {
        return <p>{error}</p>;
    }

    return (
        <div>
            <h1>Evenza</h1>
            <h2>Upcoming Events</h2>

            {events.length === 0 ? (
                <p>No events available.</p>
            ) : (
                events.map((event) => (
                    <div key={event._id}>
                        <h3>{event.title}</h3>

                        <p>{event.description}</p>

                        <p>
                            Date: {new Date(event.date).toLocaleDateString()}
                        </p>

                        <p>Location: {event.location}</p>

                        <p>Available Seats: {event.availableSeats}</p>

                        <Link to={`/events/${event._id}`}>
                            View Event
                        </Link>

                        <hr />
                    </div>
                ))
            )}
        </div>
    );
}
export default Home;
