import React, { useEffect, useState } from 'react';
import './App.css';
import EventFeed from './EventFeed';
import EventForm from './EventForm';
import UserProfile from './UserProfile';

function App() {
  const [events, setEvents] = useState([]);
  const API_URL = 'https://eventjson.onrender.com/events';import React, { useEffect, useState } from 'react';
import './App.css';
import EventFeed from './EventFeed';
import EventForm from './EventForm';
import UserProfile from './UserProfile';

function App() {
  const [events, setEvents] = useState([]);
  const [isLoading, setIsLoading] = useState(true); // State to track loading status
  const API_URL = 'https://eventjson.onrender.com/events';

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(API_URL);
        const data = await response.json();
  
        // Filter events
        const filteredEvents = data.filter(event => {
          const eventDate = new Date(event.date);
          const currentDate = new Date();
          return eventDate > currentDate;
        });
  
        setEvents(filteredEvents);
        setIsLoading(false); // Data is loaded, set loading status to false
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
  
    fetchData();
  }, []);

  const [user, setUser] = useState({
    name: 'SRINATH',
    email: 'srinath9954@gmail.com',
    bio: 'Computer Science Engineer'
  });

  const profilechange = async (name, email, bio) => {
    const newuser = { name: name, email: email, bio: bio };
    setUser(newuser);
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
      if (updatedEvent.attendees.includes(user.name)) {
        alert(`${user.name} is already registered for this event.`);
      } else {
        updatedEvent.attendees.push(user.name);
      }
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
    const newEvent = { id: events.length + 1, title: title, date: date, location: location, attendees: [user.name] };
    setEvents([...events, newEvent]);
    // Clear form fields (if needed)
    const postoption = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newEvent)
    };

    await fetch(API_URL, postoption);
  };

  return (
    <div className="App">
      <h1>GatherHub</h1>
      <div className="container">
        <div className="left-panel">
          <UserProfile user={user} profilechange={profilechange} />
          <EventForm onCreateEvent={handleCreateEvent} handleSubmit={handleSubmit} />
        </div>
        <div className="right-panel">
          {isLoading ? ( // Check if loading, display loading message or spinner
             <div class="hourglassBackground">
             <div class="hourglassContainer">
               <div class="hourglassCurves"></div>
               <div class="hourglassCapTop"></div>
               <div class="hourglassGlassTop"></div>
               <div class="hourglassSand"></div>
               <div class="hourglassSandStream"></div>
               <div class="hourglassCapBottom"></div>
               <div class="hourglassGlass"></div>
             </div>
           </div>
          ) : (
            <EventFeed events={events} handleAck={handleAck} />
          )}
        </div>
      </div>
    </div>
  );
}

export default App;


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(API_URL);
        const data = await response.json();
  
        // Filter events
        const filteredEvents = data.filter(event => {
          const eventDate = new Date(event.date);
          const currentDate = new Date();
          return eventDate > currentDate;
        });
  
        setEvents(filteredEvents);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
  
    fetchData();
  }, []);

  const [user, setUser] = useState({
    name: 'SRINATH',
    email: 'srinath9954@gmail.com',
    bio: 'Computer Science Engineer'
  });
  const profilechange = async (name, email, bio) => {
    const newuser={name:name, email:email, bio:bio};
    setUser(newuser);

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
      if(updatedEvent.attendees.includes(user.name)){
        alert(`${user.name} is already registered for this event.`);
      }
      else{
      
      updatedEvent.attendees.push(user.name);
      }
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
    const newEvent = { id: events.length + 1, title: title, date: date, location: location,attendees:[user.name] };
    setEvents([...events, newEvent]);
    // Clear form fields (if needed)
    const postoption = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newEvent)
    };

    await fetch(API_URL, postoption);
  };

  return (
    <div className="App">
      <h1>GatherHub</h1>
      <div className="container">
        <div className="left-panel">
          <UserProfile user={user} 
          profilechange={profilechange}/>
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
