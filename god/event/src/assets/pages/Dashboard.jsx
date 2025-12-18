import { useEffect, useState } from "react";
import API from "../../Services/api";

function Dashboard() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    API.get("/events")
      .then((res) => setEvents(res.data.events))
      .catch(() => alert("Failed to load events"));
  }, []);

  const joinEvent = async (id) => {
    try {
      await API.post(`/events/${id}/rsvp`);
      alert("Joined event");
    } catch {
      alert("RSVP failed");
    }
  };

  return (
    <div>
      <h2>All Events</h2>

      {events.map((event) => (
        <div key={event._id} style={{ border: "1px solid #ccc", margin: 10 }}>
          <h3>{event.title}</h3>
          <p>{event.description}</p>
          <p>Location: {event.location}</p>
          <p>Capacity: {event.capacity}</p>

          <button onClick={() => joinEvent(event._id)}>Join</button>
        </div>
      ))}
    </div>
  );
}

export default Dashboard;
