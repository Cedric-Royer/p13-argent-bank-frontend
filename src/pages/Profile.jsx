import { useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useFetchUserProfileQuery } from '../redux/profileApi';
import { setProfile } from "../redux/profileSlice";
import AccountList from '../components/Account/AccountList';
import UserProfileHeader from '../components/UserProfileHeader/UserProfileHeader';

const Profile = () => {
  const navigate = useNavigate();
  const isConnected = useSelector((state) => state.auth.isConnected); 
  const wasLoggedOut = useSelector((state) => state.auth.wasLoggedOut);
  const dispatch = useDispatch()

  useEffect(() => {
    if (!isConnected) {
      navigate(wasLoggedOut ? "/" : "/login", { replace: true });
    }
  }, [isConnected, navigate, wasLoggedOut]);
  
  const { data, error, isLoading } = useFetchUserProfileQuery();

  useEffect(() => {
    if (data?.body) {
      dispatch(setProfile(data.body));
    }
  }, [data, dispatch]);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error.error || error.status}</p>;
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
