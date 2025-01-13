import React from "react";
import { useDispatch, useSelector } from "react-redux"; 
import { logout } from "../redux/authSlice"; 
import { useNavigate } from "react-router-dom";

const NavBar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const token = useSelector((state) => state.auth.token); 

  const handleLogout = (e) => {
    e.preventDefault(); 
    console.log("Déconnexion");
    dispatch(logout()); 
    navigate("/"); 
  };

  return (
    <nav className="main-nav">
      <a className="main-nav-logo" href="/">
        <img
          className="main-nav-logo-image"
          src="assets/img/argentBankLogo.png"
          alt="Argent Bank Logo"
        />
        <h1 className="sr-only">Argent Bank</h1>
      </a>
      <div>
        {token ? (
          <a className="main-nav-item" href="/" onClick={handleLogout}>
            <i className="fa fa-sign-out"></i>
            Sign Out
          </a>
        ) : (
          <a className="main-nav-item" href="/login">
            <i className="fa fa-user-circle"></i>
            Sign In
          </a>
        )}
      </div>
    </nav>
  );
};

export default NavBar;
