import React, { useState } from 'react';
import { useFetchUserProfileQuery } from '../redux/authApi';

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
      <section className="account">
        <div className="account-content-wrapper">
          <h3 className="account-title">Argent Bank Checking (x8349)</h3>
          <p className="account-amount">$2,082.79</p>
          <p className="account-amount-description">Available Balance</p>
        </div>
        <div className="account-content-wrapper cta">
          <button className="transaction-button">View transactions</button>
        </div>
      </section>
      <section className="account">
        <div className="account-content-wrapper">
          <h3 className="account-title">Argent Bank Savings (x6712)</h3>
          <p className="account-amount">$10,928.42</p>
          <p className="account-amount-description">Available Balance</p>
        </div>
        <div className="account-content-wrapper cta">
          <button className="transaction-button">View transactions</button>
        </div>
      </section>
      <section className="account">
        <div className="account-content-wrapper">
          <h3 className="account-title">Argent Bank Credit Card (x8349)</h3>
          <p className="account-amount">$184.30</p>
          <p className="account-amount-description">Current Balance</p>
        </div>
        <div className="account-content-wrapper cta">
          <button className="transaction-button">View transactions</button>
        </div>
      </section>
    </main>
  );
};

export default Profile;
