import React from 'react';
import { useFetchUserProfileQuery } from '../redux/authApi';
import AccountList from '../components/AccountList';
import UserProfileHeader from '../components/UserProfileHeader';

const Profile = () => {
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
