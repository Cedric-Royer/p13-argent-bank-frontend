import React, { useEffect } from "react";
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useFetchUserProfileQuery } from '../redux/authApi';
import AccountList from '../components/AccountList';
import UserProfileHeader from '../components/UserProfileHeader';

const Profile = () => {
  const navigate = useNavigate();
  const isConnected = useSelector((state) => state.auth.isConnected); 

  useEffect(() => {
    if (!isConnected) {
      navigate("/login", { replace: true });
    }
  }, [isConnected, navigate]);
  
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
