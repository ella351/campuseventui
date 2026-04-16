import { Link } from 'react-router-dom';
import { useApp } from '../context/AppContext.jsx';

export default function Dashboard() {
  const { events } = useApp();
  const openEvents = events.filter((event) => event.status === 'open').length;
  const closedEvents = events.length - openEvents;

  return (
    <main className="page-shell">
      <section className="page-heading">
        <span className="eyebrow">Protected Area</span>
        <h1>Dashboard</h1>
        <p>
          Manage your locally added campus events and monitor event readiness.
        </p>
      </section>

      <section className="stats-grid" aria-label="Dashboard statistics">
        <article>
          <span>Total Campus Events</span>
          <strong>{events.length}</strong>
        </article>
        <article>
          <span>Open Events</span>
          <strong>{openEvents}</strong>
        </article>
        <article>
          <span>Closed Events</span>
          <strong>{closedEvents}</strong>
        </article>
      </section>

      <section className="dashboard-layout">
        <div>
          <h2>Event Operations</h2>
          <p>
            The Events page supports adding, deleting, toggling status, search,
            category filtering, and API-loaded listings.
          </p>
          <Link className="primary-button" to="/events">
            Manage Events
          </Link>
        </div>

        <div className="agenda-list">
          {events.map((event) => (
            <article key={event.id}>
              <span className={`badge ${event.status}`}>{event.status}</span>
              <h3>{event.title}</h3>
              <p>{event.category}</p>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
