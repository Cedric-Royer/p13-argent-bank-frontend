import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const NotFound = () => {
  const isConnected = useSelector((state) => state.auth.isConnected);
  const navigate = useNavigate();

  useEffect(() => {
    if (isConnected) {
      navigate("/profile", { replace: true });
    }
  }, [isConnected, navigate]);

  if (isConnected) return null;

  return (
    <main className="main bg-dark">
      <section className="not-found">
        <h1>404</h1>
        <p>The page you're looking for doesn't exist.</p>
        <button onClick={() => navigate("/")} className="btn">
          Go to Home
        </button>
      </section>
    </main>
  );
};

export default NotFound;
