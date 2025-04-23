import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux"; 
import { useNavigate } from "react-router-dom";
import { login as loginAction } from "../../redux/authSlice";
import { useLoginMutation } from "../../redux/authApi";
import { getUserAuthError } from "../../utils/authErrorHandler";
import LoginForm from "../../components/LoginForm/LoginForm";
import './Login.css';

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState(null);
  const dispatch = useDispatch(); 
  const [login, { isLoading }] = useLoginMutation();
  const isConnected = useSelector((state) => state.auth.isConnected);
  const navigate = useNavigate();

  useEffect(() => {
    if (isConnected) navigate("/profile", { replace: true });
  }, [isConnected, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      const response = await login({ email: username, password }).unwrap();
      dispatch(loginAction({ token: response.body.token, rememberMe }));
      navigate("/profile");
    } catch (error) {
      setError(getUserAuthError(error));
      console.error('Login error:', error);
    }
  };

  if (isConnected) return null;

  return (
    <main className="main bg-dark">
      <section className="sign-in-content">
        <i className="fa fa-user-circle sign-in-icon"></i>
        <h1>Sign In</h1>
        <LoginForm
          username={username}
          password={password}
          rememberMe={rememberMe}
          onUsernameChange={(e) => setUsername(e.target.value)}
          onPasswordChange={(e) => setPassword(e.target.value)}
          onRememberMeChange={(e) => setRememberMe(e.target.checked)}
          onSubmit={handleSubmit}
          isLoading={isLoading}
          error={error}
        />
      </section>
    </main>
  );
};

export default Login;
