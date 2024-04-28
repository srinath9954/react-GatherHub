// src/components/EventFeed.js

import React, { useState } from 'react';
import './EventFeed.css';

const EventFeed = ({events,user,handleAck}) => {
  

  const [selectedEvent, setSelectedEvent] = useState(null);


  const openEventDetails = (event) => {
    setSelectedEvent(event);
  };

  const closeEventDetails = () => {
    setSelectedEvent(null);
  };

  return (
    <div className="event-feed">
      <h2>Upcoming Events</h2>
      <ul>
        {events.map(event => (
          <li key={event.id}>
            <div>
              <strong>{event.title}</strong>
              <p>Date: {event.date}</p>
              <p>Location: {event.location}</p>
              <p>Attendees: {event.attendees.join(', ')}</p>
              <div>
                <button className="button" onClick={() => handleAck(event.id)}>Acknowledge</button>
                <button className="button" onClick={() => openEventDetails(event)}>Details</button>
              </div>
            </div>
          </li>
        ))}
      </ul>

      {/* Event details modal */}
      {selectedEvent && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={closeEventDetails}>&times;</span>
            <h2>{selectedEvent.title}</h2>
            <p>Date: {selectedEvent.date}</p>
            <p>Location: {selectedEvent.location}</p>
            <p>Attendees: {selectedEvent.attendees.join(', ')}</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default EventFeed;
