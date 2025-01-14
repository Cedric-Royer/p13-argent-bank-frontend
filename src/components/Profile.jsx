import React, { useState } from 'react';
import { useFetchUserProfileQuery } from '../redux/authApi';
import AccountList from './AccountList';

const Profile = () => {
  const { data, error, isLoading } = useFetchUserProfileQuery();
  const [isEditing, setIsEditing] = useState(false);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');

  console.log('User Data:', data);
  console.log('Error:', error);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  const handleEditClick = () => {
    setFirstName(data.body.firstName);
    setLastName(data.body.lastName);
    setIsEditing(true);
  };

  const handleCancelClick = () => {
    setIsEditing(false);
  };

  return (
    <main className="main bg-dark">
      {data && data.body ? (
        <div className='header'>
          <div className="profile-header">
            <span>Welcome back</span>
            <br/>
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
                  <button className="save-button">Save</button>
                  <button className="cancel-button" onClick={handleCancelClick}>Cancel</button>
                </div>
              </div>
            ) : (
              <span>{data.body.firstName} {data.body.lastName}!</span>
            )}
          </div>
          {!isEditing && (
            <button className="edit-button" onClick={handleEditClick}>Edit Name</button>
          )}
        </div>
      ) : (
        <p>No user data found.</p>
      )}
      <AccountList />
    </main>
  );
};

export default Profile;
