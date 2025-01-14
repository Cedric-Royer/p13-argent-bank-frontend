import React, { useState } from 'react';

const UserProfileHeader = ({ user }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [firstName, setFirstName] = useState(user.firstName || '');
  const [lastName, setLastName] = useState(user.lastName || '');

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleCancelClick = () => {
    setIsEditing(false);
  };

  const handleSaveClick = () => {
    console.log('The name has changed:', firstName, lastName);
    setIsEditing(false);
  };

  return (
    <div className="header">
      <div className="profile-header">
        <span>Welcome back</span>
        <br />
        {isEditing ? (
          <div className="edit-profile">
            <div className="edit-profile-inputs">
              <input
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                placeholder="First Name"
                className="input-field"
              />
              <input
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                placeholder="Last Name"
                className="input-field"
              />
            </div>
            <div className="edit-profile-buttons">
              <button className="save-button" onClick={handleSaveClick}>
                Save
              </button>
              <button className="cancel-button" onClick={handleCancelClick}>
                Cancel
              </button>
            </div>
          </div>
        ) : (
          <span>
            {user.firstName} {user.lastName}!
          </span>
        )}
      </div>
      {!isEditing && (
        <button className="edit-button" onClick={handleEditClick}>
          Edit Name
        </button>
      )}
    </div>
  );
};

export default UserProfileHeader;
