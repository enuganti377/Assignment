import { useEffect, useState } from "react";
import API from "../../Services/api";

function MyEvents() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    API.get("/events/my")
      .then((res) => setEvents(res.data.events))
      .catch(() => alert("Failed to load"));
  }, []);

  return (
    <div>
      <h2>My Events</h2>

      {events.map((event) => (
        <div key={event._id}>
          <p>{event.title}</p>
        </div>
      ))}
    </div>
  );
}

export default MyEvents;
