import React, { useEffect, useState } from 'react';
import './App.css';
import EventFeed from './EventFeed';
import EventForm from './EventForm';
import UserProfile from './UserProfile';

function App() {
  const [events, setEvents] = useState([]);
  const API_URL = 'http://localhost:3003/events';

  useEffect(() => {
    const getItem = async () => {
      try {
        const response = await fetch(API_URL);
        const newItem = await response.json();
        setEvents(newItem);
      } catch (e) {
        console.log("error");
      }
    };

    (async () => await getItem())();
  }, []);

  const user = {
    name: 'SRINATH',
    email: 'srinath9954@gmail.com',
    bio: 'Computer Science Engineer'
  };
  
  const handleCreateEvent = (eventData) => {
    // Handle event creation (e.g., send data to backend)
    console.log('Event created:', eventData);
  };
  const handleAck = async (eventId) => {
    try {
      const updatedEvent = events.find(event => event.id === eventId);
      if (!updatedEvent) {
        console.error('Event not found');
        return;
      }
      
      updatedEvent.attendees.push(user.name); // Add user's name to attendees list
  
      const patchOption = {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ attendees: updatedEvent.attendees })
      };
  
      const response = await fetch(`${API_URL}/${eventId}`, patchOption);
      if (!response.ok) {
        console.error('Failed to update event attendees');
        return;
      }
  
      // Update state with the updated event
      const updatedEvents = events.map(event =>
        event.id === eventId ? updatedEvent : event
      );
      setEvents(updatedEvents);
  
      console.log('Event attendees updated successfully');
    } catch (error) {
      console.error('Error updating event attendees:', error);
    }
  };
  
  const handleSubmit = async (title, date, location) => {
    // Validate form inputs
    if (!title || !date || !location) {
      alert('Please fill out all fields.');
      return;
    }
    
    // Call callback function to create event
    console.log('Submitting form:', { title, date, location });
    const newEvent = { id: events.length + 1, title: title, date: date, location: location,attendees:user.name };
    setEvents([...events, newEvent]);
    // Clear form fields (if needed)
    const postoption = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newEvent)
    };

    const result = await fetch(API_URL, postoption);
  };

  return (
    <div className="App">
      <h1>GatherHub</h1>
      <div className="container">
        <div className="left-panel">
          <UserProfile user={user} />
          <EventForm onCreateEvent={handleCreateEvent} handleSubmit={handleSubmit} />
        </div>
        <div className="right-panel">
          <EventFeed events={events} 
          handleAck={handleAck}/>
        </div>
      </div>
    </div>
  );
}

export default App;
