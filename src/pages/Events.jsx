import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '../context/AppContext.jsx';
import { usePosts } from '../hooks/usePosts.js';

const categories = [
  'All',
  'CAS',
  'BA English Language',
  'BA Psychology',
  'BA Social Science',
  'Public Administration',
  'BSIT',
  'Mathematics',
];

function formatEventDate(date) {
  if (!date) {
    return 'Date to be announced';
  }

  return new Date(`${date}T00:00:00`).toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });
}

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

function getPostDate(id) {
  const day = String(4 + (id % 24)).padStart(2, '0');
  return `2026-06-${day}`;
}

function getPostTime(id) {
  const times = ['08:00 AM', '10:00 AM', '01:00 PM', '03:00 PM'];
  return times[id % times.length];
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

function getApiEventBody(category) {
  return `A ${category} event for student learning, participation, and academic development.`;
}

export default function Events() {
  const { events, dispatch } = useApp();
  const { posts, loading, refreshing, error, lastUpdated, updateNotice } =
    usePosts();
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('All');
  const [form, setForm] = useState({
    title: '',
    body: '',
    category: 'CAS',
    date: '',
    time: '',
  });

  const apiEvents = useMemo(
    () =>
      posts.map((post) => ({
        id: String(post.id),
        category: getPostCategory(post.id),
        date: getPostDate(post.id),
        time: getPostTime(post.id),
        title: getApiEventTitle(getPostCategory(post.id), post.id),
        body: getApiEventBody(getPostCategory(post.id)),
        status: post.id % 2 === 0 ? 'open' : 'closed',
        source: 'api',
      })),
    [posts],
  );

  const allEvents = useMemo(() => [...events, ...apiEvents], [apiEvents, events]);

  const visibleEvents = useMemo(() => {
    return allEvents.filter((event) => {
      const matchesSearch = `${event.title} ${event.body} ${event.date} ${event.time}`
        .toLowerCase()
        .includes(query.toLowerCase());
      const matchesCategory =
        category === 'All' || event.category === category;

      return matchesSearch && matchesCategory;
    });
  }, [allEvents, category, query]);

  function handleSubmit(event) {
    event.preventDefault();

    if (!form.title.trim() || !form.body.trim()) {
      return;
    }

    dispatch({
      type: 'ADD_EVENT',
      payload: {
        title: form.title.trim(),
        body: form.body.trim(),
        category: form.category,
        date: form.date,
        time: form.time || 'To be announced',
      },
    });
    setForm({ title: '', body: '', category: 'CAS', date: '', time: '' });
  }

  return (
    <main className="page-shell">
      <section className="page-heading">
        <span className="eyebrow">College of Arts and Science</span>
        <h1>Campus Events</h1>
        <p>
          CAS events include all listed courses, while each program also has
          its own academic event connected to its field.
        </p>
      </section>

      <section className="controls-row" aria-label="Event controls">
        <label className="search-field">
          <span>Search events</span>
          <input
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search by title or detail"
          />
        </label>

        <label className="select-field">
          <span>Category</span>
          <select
            value={category}
            onChange={(event) => setCategory(event.target.value)}
          >
            {categories.map((categoryName) => (
              <option key={categoryName}>{categoryName}</option>
            ))}
          </select>
        </label>

        <div className="refresh-status">
          <strong>{refreshing ? 'Refreshing...' : 'Auto-refresh on'}</strong>
          <span>
            Last updated:{' '}
            {lastUpdated ? lastUpdated.toLocaleTimeString() : 'not yet loaded'}
          </span>
          {updateNotice && <em>Data Updated</em>}
        </div>
      </section>

      <section className="event-workspace">
        <form className="event-form" onSubmit={handleSubmit}>
          <h2>Add Event</h2>
          <input
            value={form.title}
            onChange={(event) =>
              setForm((currentForm) => ({
                ...currentForm,
                title: event.target.value,
              }))
            }
            placeholder="Event title"
            aria-label="Event title"
          />
          <textarea
            value={form.body}
            onChange={(event) =>
              setForm((currentForm) => ({
                ...currentForm,
                body: event.target.value,
              }))
            }
            placeholder="Event description"
            aria-label="Event description"
          />
          <select
            value={form.category}
            onChange={(event) =>
              setForm((currentForm) => ({
                ...currentForm,
                category: event.target.value,
              }))
            }
            aria-label="Event category"
          >
            {categories
              .filter((categoryName) => categoryName !== 'All')
              .map((categoryName) => (
                <option key={categoryName}>{categoryName}</option>
              ))}
          </select>
          <input
            type="date"
            value={form.date}
            onChange={(event) =>
              setForm((currentForm) => ({
                ...currentForm,
                date: event.target.value,
              }))
            }
            aria-label="Event date"
          />
          <input
            type="time"
            value={form.time}
            onChange={(event) =>
              setForm((currentForm) => ({
                ...currentForm,
                time: event.target.value,
              }))
            }
            aria-label="Event time"
          />
          <button className="primary-button" type="submit">
            Add Event
          </button>
        </form>

        <div className="events-column">
          {loading && <div className="status-panel">Loading events...</div>}
          {error && (
            <div className="status-panel error">
              Error loading API data: {error}
            </div>
          )}
          {!loading && visibleEvents.length === 0 && (
            <div className="status-panel">
              No events match the current search or category.
            </div>
          )}
          {visibleEvents.length > 0 && (
            <div className="event-grid">
              {visibleEvents.map((event) => (
                <article className="event-card" key={event.id}>
                  <div className="card-topline">
                    <span className={`badge ${event.status}`}>
                      {event.status}
                    </span>
                    <span className="tag">{event.category}</span>
                  </div>
                  <h2>{event.title}</h2>
                  <div className="event-schedule">
                    <span>{formatEventDate(event.date)}</span>
                    <span>{event.time || 'Time to be announced'}</span>
                  </div>
                  <p>{event.body}</p>
                  <div className="card-actions">
                    <Link className="small-button" to={`/events/${event.id}`}>
                      View Details
                    </Link>
                    {event.source === 'campus' && (
                      <>
                        <button
                          className="small-button"
                          type="button"
                          onClick={() =>
                            dispatch({
                              type: 'TOGGLE_EVENT_STATUS',
                              payload: event.id,
                            })
                          }
                        >
                          Toggle
                        </button>
                        <button
                          className="danger-button"
                          type="button"
                          onClick={() =>
                            dispatch({
                              type: 'DELETE_EVENT',
                              payload: event.id,
                            })
                          }
                        >
                          Delete
                        </button>
                      </>
                    )}
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
