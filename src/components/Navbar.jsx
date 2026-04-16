import { NavLink } from 'react-router-dom';
import { useApp } from '../context/AppContext.jsx';

export default function Navbar() {
  const { isLoggedIn, logout, theme, toggleTheme } = useApp();

  return (
    <header className="site-header">
      <nav className="navbar" aria-label="Main navigation">
        <NavLink to="/" className="brand">
          <span className="brand-mark">CE</span>
          <span>CampusEventUI</span>
        </NavLink>

        <div className="nav-links">
          <NavLink to="/">Home</NavLink>
          <NavLink to="/events">Events</NavLink>
          <NavLink to="/dashboard">Dashboard</NavLink>
          <NavLink to="/login">Login</NavLink>
        </div>

        <div className="nav-actions">
          <button
            className="icon-button"
            type="button"
            onClick={toggleTheme}
            title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
            aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
          >
            {theme === 'dark' ? 'L' : 'D'}
          </button>
          {isLoggedIn && (
            <button className="ghost-button" type="button" onClick={logout}>
              Logout
            </button>
          )}
        </div>
      </nav>
    </header>
  );
}
