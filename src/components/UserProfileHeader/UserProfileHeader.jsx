import { useState } from 'react';
import { useUpdateUserProfileMutation, useFetchUserProfileQuery } from '../../redux/profileApi';
import PropTypes from 'prop-types';
import './UserProfileHeader.css';

const UserProfileHeader = ({ user }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [firstName, setFirstName] = useState(user.firstName || '');
  const [lastName, setLastName] = useState(user.lastName || '');
  const [updateUserProfile] = useUpdateUserProfileMutation();
  const { refetch } = useFetchUserProfileQuery();

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleCancelClick = () => {
    setIsEditing(false);
  };

  const handleSaveClick = async (event) => {
    event.preventDefault();
    try {
      await updateUserProfile({ firstName, lastName }).unwrap();
      refetch();
      setIsEditing(false);
    } catch (error) {
      console.error('Failed to update user profile:', error);
    }
  };

  return (
    <div className="header">
      <div className="profile-header">
        <span>Welcome back</span>
        <br />
        {isEditing ? (
          <div className="edit-profile">
            <form onSubmit={handleSaveClick}>
              <div className="edit-profile-inputs">
                <input
                  type="text"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  placeholder="First Name"
                  className="input-field"
                  id="firstName"
                  name="firstName"
                  required
                />
                <input
                  type="text"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  placeholder="Last Name"
                  className="input-field"
                  id="lastName"
                  name="lastName"
                  required
                />
              </div>              
              <div className="edit-profile-buttons">
                <button type="submit" className="save-button"> {/* Changement de role à type="submit" */}
                  Save
                </button>
                <button type="button" className="cancel-button" onClick={handleCancelClick}> {/* Ajout de type="button" */}
                  Cancel
                </button>
              </div>
            </form>
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

UserProfileHeader.propTypes = {
  user: PropTypes.shape({
    firstName: PropTypes.string.isRequired,
    lastName: PropTypes.string.isRequired,
  }).isRequired,
};

export default UserProfileHeader;