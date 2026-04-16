import { useLocation, useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext.jsx';

export default function Login() {
  const { isLoggedIn, login, logout } = useApp();
  const navigate = useNavigate();
  const location = useLocation();
  const destination = location.state?.from?.pathname || '/dashboard';

  function handleLogin(event) {
    event.preventDefault();
    login();
    navigate(destination, { replace: true });
  }

  return (
    <main className="page-shell login-page">
      <section className="login-panel">
        <span className="eyebrow">Student Access</span>
        <h1>Login</h1>
        <p>
          Use the simulated login button to unlock the protected Dashboard page.
        </p>

        <form onSubmit={handleLogin}>
          <label>
            Student name
            <input value="Lab Student" readOnly />
          </label>
          <label>
            Password
            <input value="campus-demo" type="password" readOnly />
          </label>
          <button className="primary-button" type="submit">
            {isLoggedIn ? 'Go to Dashboard' : 'Login'}
          </button>
        </form>

        {isLoggedIn && (
          <button className="secondary-button" type="button" onClick={logout}>
            Logout
          </button>
        )}
      </section>
    </main>
  );
}
