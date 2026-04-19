import { Link } from 'react-router-dom';
import { useApp } from '../context/AppContext.jsx';
import { usePosts } from '../hooks/usePosts.js';

function getPostCategory(id) {
  const categoryMap = [
    'BSIT',
    'BA English Language',
    'BA Psychology',
    'BA Social Science',
    'Public Administration',
    'Mathematics',
  ];
  return categoryMap[id % categoryMap.length];
}

function getApiEventTitle(category, id) {
  const titleMap = {
    BSIT: 'Information Technology Skills Workshop',
    'BA English Language': 'English Language Writing Workshop',
    'BA Psychology': 'Psychology Student Wellness Talk',
    'BA Social Science': 'Social Science Research Forum',
    'Public Administration': 'Public Administration Service Seminar',
    Mathematics: 'Mathematics Problem Solving Session',
  };

  return `${titleMap[category]} ${id}`;
}

export default function Dashboard() {
  const { events, currentUser } = useApp();
  const { posts } = usePosts();
  const apiEvents = posts.map((post) => {
    const category = getPostCategory(post.id);

    return {
      id: `api-${post.id}`,
      title: getApiEventTitle(category, post.id),
      category,
      status: post.id % 2 === 0 ? 'open' : 'closed',
    };
  });
  const dashboardEvents = [...events, ...apiEvents];
  const openEvents = dashboardEvents.filter(
    (event) => event.status === 'open',
  ).length;
  const closedEvents = dashboardEvents.length - openEvents;

  return (
    <main className="page-shell">
      <section className="page-heading">
        <span className="eyebrow"><h1>Dashboard</h1></span>
        <h1>Dashboard</h1>
        <p>
          Welcome, {currentUser}. Manage ISPSC Tagudin Campus events for CAS
          programs and activities.
        </p>
      </section>

      <section className="stats-grid" aria-label="Dashboard statistics">
        <article>
          <span>Total Campus Events</span>
          <strong>{dashboardEvents.length}</strong>
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
            The Events page supports CAS-wide activities and program events for
            English Language, Psychology, Social Science, Public Administration,
            Information Technology, and Mathematics.
          </p>
          <Link className="primary-button" to="/events">
            Manage Events
          </Link>
        </div>

        <div className="agenda-list">
          {dashboardEvents.map((event) => (
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
