import { NavLink } from 'react-router-dom';
import { useApp } from '../context/AppContext.jsx';

export default function Navbar() {
  const { isLoggedIn, logout, theme, toggleTheme, currentUser } = useApp();

  return (
    <header className="site-header">
      <nav className="navbar" aria-label="Main navigation">
        {isLoggedIn ? (
          <NavLink to="/dashboard" className="brand">
            <span className="brand-mark">EE</span>
            <span>{currentUser || 'Ella Estrella'}</span>
          </NavLink>
        ) : (
          <span className="brand brand-placeholder" aria-hidden="true" />
        )}

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
            {theme === 'dark' ? (
              <svg
                aria-hidden="true"
                className="theme-icon"
                viewBox="0 0 24 24"
              >
                <circle cx="12" cy="12" r="4" />
                <path d="M12 2v3M12 19v3M4.93 4.93l2.12 2.12M16.95 16.95l2.12 2.12M2 12h3M19 12h3M4.93 19.07l2.12-2.12M16.95 7.05l2.12-2.12" />
              </svg>
            ) : (
              <svg
                aria-hidden="true"
                className="theme-icon"
                viewBox="0 0 24 24"
              >
                <path d="M21 14.5A8.5 8.5 0 0 1 9.5 3a7 7 0 1 0 11.5 11.5Z" />
              </svg>
            )}
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
