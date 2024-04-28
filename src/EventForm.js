// src/components/EventForm.js

import React, { useState } from 'react';
import './EventForm.css';

const EventForm = ({onCreateEvent,handleSubmit}) => {
    const [title, setTitle] = useState('');
  const [date, setDate] = useState('');
  const [location, setLocation] = useState('');
  const handleFormSubmit = (event) => {
    event.preventDefault(); // Prevent the default form submission behavior
    handleSubmit(title, date, location);
  };
  return (
    <div className="event-form">
      <h2>Create New Event</h2>
      <form onSubmit={handleFormSubmit}>
        <div className="form-group">
          <label>Title:</label>
          <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required />
        </div>
        <div className="form-group">
          <label>Date:</label>
          <input type="date" value={date} onChange={(e) => setDate(e.target.value)} required />
        </div>
        <div className="form-group">
          <label>Location:</label>
          <input type="text" value={location} onChange={(e) => setLocation(e.target.value)} required />
        </div>
        <button className="button" type="submit">Create Event</button>
      </form>
    </div>
  );
}

export default EventForm;
