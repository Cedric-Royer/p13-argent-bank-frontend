import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { useFetchUserProfileQuery } from '../redux/authApi';
import AccountList from '../components/AccountList';
import UserProfileHeader from '../components/UserProfileHeader';

const Profile = () => {
  const isConnected = useSelector((state) => state.auth.isConnected); 

  if (!isConnected) {
    return <Navigate to="/login" replace />; 
  }

  const { data, error, isLoading } = useFetchUserProfileQuery();

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  return (
    <main className="main bg-dark">
      {data && data.body ? (
        <UserProfileHeader user={data.body} />
      ) : (
        <p>No user data found.</p>
      )}
      <AccountList />
    </main>
  );
};

export default Profile;
