import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext.jsx';

export default function Login() {
  const { isLoggedIn, login, logout, currentUser } = useApp();
  const navigate = useNavigate();
  const location = useLocation();
  const destination = location.state?.from?.pathname || '/dashboard';
  const [credentials, setCredentials] = useState({
    username: '',
    password: '',
  });
  const [error, setError] = useState('');

  useEffect(() => {
    if (isLoggedIn) {
      navigate('/dashboard', { replace: true });
    }
  }, [isLoggedIn, navigate]);

  function handleLogin(event) {
    event.preventDefault();
    const isValid = login(credentials.username, credentials.password);

    if (isValid) {
      navigate(destination, { replace: true });
      return;
    }

    setError('Invalid login. Use Ella Estrella and ella123456.');
  }

  return (
    <main className="page-shell login-page">
      <section className="login-panel">
        <span className="eyebrow">Student Access</span>
        <h1>Login</h1>
        <p>
          Sign in as Ella Estrella to unlock the protected Dashboard page.
        </p>

        <form onSubmit={handleLogin}>
          <label>
            Student name
            <input
              value={credentials.username}
              onChange={(event) =>
                setCredentials((currentCredentials) => ({
                  ...currentCredentials,
                  username: event.target.value,
                }))
              }
              placeholder="Ella Estrella"
              autoComplete="username"
            />
          </label>
          <label>
            Password
            <input
              value={credentials.password}
              onChange={(event) =>
                setCredentials((currentCredentials) => ({
                  ...currentCredentials,
                  password: event.target.value,
                }))
              }
              placeholder="ella123456"
              type="password"
              autoComplete="current-password"
            />
          </label>
          {error && <p className="inline-error">{error}</p>}
          <button className="primary-button" type="submit">
            Login
          </button>
        </form>

        {isLoggedIn && (
          <button className="secondary-button" type="button" onClick={logout}>
            Logout {currentUser}
          </button>
        )}
      </section>
    </main>
  );
}
