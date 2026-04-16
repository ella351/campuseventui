import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <main className="home-page">
      <section className="hero">
        <div className="hero-content">
          <span className="eyebrow">Final Lab Examination System</span>
          <h1>CampusEventUI</h1>
          <p>
            A React campus events hub with protected dashboard access, live API
            data, reducer-managed events, and a deployment-ready interface.
          </p>
          <div className="hero-actions">
            <Link className="primary-button" to="/events">
              Browse Events
            </Link>
            <Link className="secondary-button" to="/dashboard">
              Open Dashboard
            </Link>
          </div>
        </div>
        <div className="hero-panel" aria-label="Campus event preview">
          <div className="mini-calendar">
            <span>APR</span>
            <strong>21</strong>
          </div>
          <div>
            <h2>Campus Innovation Week</h2>
            <p>Talks, exhibits, and student showcases in one organized app.</p>
          </div>
        </div>
      </section>

      <section className="feature-band" aria-label="System highlights">
        <article>
          <strong>Routing</strong>
          <span>Home, Events, Details, Dashboard, Login</span>
        </article>
        <article>
          <strong>State</strong>
          <span>Context API with reducer actions</span>
        </article>
        <article>
          <strong>Realtime</strong>
          <span>Auto-refresh API data and last updated status</span>
        </article>
      </section>
    </main>
  );
}
