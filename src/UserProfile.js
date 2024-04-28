// src/components/UserProfile.js

import React, { useState } from 'react';
import './UserProfile.css';

const UserProfile = ({ user }) => {
  const [editing, setEditing] = useState(false);
  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [bio, setBio] = useState(user.bio);

  const handleSave = () => {
    // Save updated profile information (e.g., update backend)
    console.log('Updated profile:', { name, email, bio });
    setEditing(false);
  };

  return (
    <div className="user-profile">
      <h2>User Profile</h2>
      {editing ? (
        <div>
          <div>
            <label>Name:</label>
            <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
          </div>
          <div>
            <label>Email:</label>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          </div>
          <div>
            <label>Bio:</label>
            <textarea value={bio} onChange={(e) => setBio(e.target.value)} />
          </div>
          <button className="button" onClick={handleSave}>Save</button>
        </div>
      ) : (
        <div>
          <p><strong>Name:</strong> {user.name}</p>
          <p><strong>Email:</strong> {user.email}</p>
          <p><strong>Bio:</strong> {user.bio}</p>
          <button className="button" onClick={() => setEditing(true)}>Edit</button>
        </div>
      )}
    </div>
  );
}

export default UserProfile;
