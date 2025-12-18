import { useEffect, useState } from "react";
import API from "../services/api.js";


function Events() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await API.get("/events");
        setEvents(res.data);
      } catch (err) {
        setError("Failed to load events");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  if (loading) {
    return <h3>Loading events...</h3>;
  }

  if (error) {
    return <h3>{error}</h3>;
  }

  return (
    <div style={{ padding: "20px" }}>
      <h1>Events</h1>

      {events.length === 0 ? (
        <p>No events available</p>
      ) : (
        <ul>
          {events.map((event) => (
            <li key={event._id}>
              <h3>{event.title}</h3>
              <p>{event.description}</p>
              <p>
                <b>Location:</b> {event.location}
              </p>
              <p>
                <b>Date:</b> {event.dateTime}
              </p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Events;
