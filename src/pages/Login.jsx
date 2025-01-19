import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux"; 
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login as loginAction } from "../redux/authSlice";
import { useLoginMutation } from "../redux/authApi";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState(null);
  const token = useSelector((state) => state.auth.token); 
  const dispatch = useDispatch(); 
  const [login, { isLoading }] = useLoginMutation();
  const isConnected = useSelector((state) => state.auth.isConnected);
  const navigate = useNavigate();

  useEffect(() => {
    if (isConnected) {
      navigate("/profile", { replace: true });
    }
  }, [isConnected, navigate]);

  if (isConnected) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      const response = await login({ email: username, password }).unwrap();
      const token = response.body.token;

      dispatch(loginAction({ token, rememberMe }));

      navigate("/profile");
    } catch (error) {
      setError("Login failed. Please check your username and password.");
      console.error("Login error:", error);
    }
  };

  return (
      <main className="main bg-dark">
        <section className="sign-in-content">
          <i className="fa fa-user-circle sign-in-icon"></i>
          <h1>Sign In</h1>
          <form onSubmit={handleSubmit}>
            <div className="input-wrapper">
              <label htmlFor="username">Username</label>
              <input
                type="text"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
            <div className="input-wrapper">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <div className="input-remember">
              <input
                type="checkbox"
                id="remember-me"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
              />
              <label htmlFor="remember-me">Remember me</label>
            </div>
            <button type="submit" className="sign-in-button" disabled={isLoading}>
              {isLoading ? "Signing In..." : "Sign In"}
            </button>
          </form>
          {error && <p className="error">{error}</p>}
        </section>
      </main>
  );
};

export default Login;
