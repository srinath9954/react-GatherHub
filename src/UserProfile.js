
import React, { useState } from 'react';
import './UserProfile.css';

const UserProfile = ({ user,profilechange }) => {
  // State variables to manage edit mode and user input
  const [editing, setEditing] = useState(false);
  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [bio, setBio] = useState(user.bio);

  // Function to handle saving the updated profile
  const handleSave = () => {
    // Save updated profile information (e.g., update backend)
    console.log('Updated profile:', { name, email, bio });
    // Here you should send the updated profile information to the backend
    // and handle the response appropriately
    setEditing(false); // Switch back to view mode
    profilechange(name, email, bio);
  };

  return (
    <div className="user-profile">
      <h2>User Profile</h2>
      {editing ? (
        <div>
          <div>
            <label>Name:</label>
            {/* Input field for editing name */}
            <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
          </div>
          <div>
            <label>Email:</label>
            {/* Input field for editing email */}
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          </div>
          <div>
            <label>Bio:</label>
            {/* Textarea for editing bio */}
            <textarea value={bio} onChange={(e) => setBio(e.target.value)} />
          </div>
          {/* Button to save changes */}
          <button className="button" onClick={handleSave}>Save</button>
        </div>
      ) : (
        <div>
          {/* Display user profile information in view mode */}
          <p><strong>Name:</strong> {user.name}</p>
          <p><strong>Email:</strong> {user.email}</p>
          <p><strong>Bio:</strong> {user.bio}</p>
          {/* Button to switch to edit mode */}
          <button className="button" onClick={() => setEditing(true)}>Edit</button>
        </div>
      )}
    </div>
  );
}

export default UserProfile;
