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
          Sign in to unlock the Dashboard page.
        </p>

        <form autoComplete="off" onSubmit={handleLogin}>
          <label>
            Student name
            <input
              name="campus-student-name"
              value={credentials.username}
              onChange={(event) =>
                setCredentials((currentCredentials) => ({
                  ...currentCredentials,
                  username: event.target.value,
                }))
              }
              autoComplete="off"
              required
            />
          </label>
          <label>
            Password
            <input
              name="campus-student-password"
              value={credentials.password}
              onChange={(event) =>
                setCredentials((currentCredentials) => ({
                  ...currentCredentials,
                  password: event.target.value,
                }))
              }
              type="password"
              autoComplete="new-password"
              required
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
