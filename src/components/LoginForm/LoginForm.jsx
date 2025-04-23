import './LoginForm.css';

const LoginForm = ({
  username,
  password,
  rememberMe,
  onUsernameChange,
  onPasswordChange,
  onRememberMeChange,
  onSubmit,
  isLoading,
  error, 
}) => {

    return (
        <form onSubmit={onSubmit}>
          <div className="input-wrapper">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={onUsernameChange}
              required
            />
          </div>
          <div className="input-wrapper">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={onPasswordChange}
              required
            />
          </div>
          <div className="input-remember">
            <input
              type="checkbox"
              id="remember-me"
              checked={rememberMe}
              onChange={onRememberMeChange}
            />
            <label htmlFor="remember-me">Remember me</label>
          </div>
          <button type="submit" className="sign-in-button" disabled={isLoading}>
            {isLoading ? "Signing In..." : "Sign In"}
          </button>
          {error && <p className="error">{error}</p>}
        </form>
    );
} 

export default LoginForm;
