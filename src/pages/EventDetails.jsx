import { useEffect, useMemo, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useApp } from '../context/AppContext.jsx';

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

export default function EventDetails() {
  const { id } = useParams();
  const { events } = useApp();
  const [apiEvent, setApiEvent] = useState(null);
  const [status, setStatus] = useState('idle');
  const [error, setError] = useState('');

  const campusEvent = useMemo(
    () => events.find((event) => String(event.id) === id),
    [events, id],
  );

  useEffect(() => {
    if (campusEvent || Number.isNaN(Number(id))) {
      return;
    }

    let ignore = false;

    async function loadEvent() {
      try {
        setStatus('loading');
        const response = await fetch(
          `https://jsonplaceholder.typicode.com/posts/${id}`,
        );

        if (!response.ok) {
          throw new Error(`Event ${id} was not found`);
        }

        const data = await response.json();

        if (!ignore) {
          const courseCategories = [
            'BSIT',
            'BA English Language',
            'BA Psychology',
            'BA Social Science',
            'Public Administration',
            'Mathematics',
          ];

          const category = courseCategories[data.id % courseCategories.length];

          setApiEvent({
            id: data.id,
            title: getApiEventTitle(category, data.id),
            body: getApiEventBody(category),
            category,
            date: getPostDate(data.id),
            time: getPostTime(data.id),
            status: data.id % 2 === 0 ? 'open' : 'closed',
          });
          setStatus('success');
        }
      } catch (requestError) {
        if (!ignore) {
          setError(requestError.message);
          setStatus('error');
        }
      }
    }

    loadEvent();

    return () => {
      ignore = true;
    };
  }, [campusEvent, id]);

  const event = campusEvent || apiEvent;

  return (
    <main className="page-shell">
      <section className="details-panel">
        <Link className="secondary-button back-button" to="/events">
          Back to events
        </Link>
        {status === 'loading' && <p>Loading event details...</p>}
        {error && <p className="inline-error">{error}</p>}
        {event && (
          <>
            <div className="card-topline">
              <span className={`badge ${event.status}`}>{event.status}</span>
              <span className="tag">{event.category}</span>
            </div>
            <h1>{event.title}</h1>
            <dl className="details-list">
              <div>
                <dt>Event ID</dt>
                <dd>{event.id}</dd>
              </div>
              <div>
                <dt>Event Title</dt>
                <dd>{event.title}</dd>
              </div>
              <div>
                <dt>Event Description</dt>
                <dd>{event.body}</dd>
              </div>
              <div>
                <dt>Event Date</dt>
                <dd>{formatEventDate(event.date)}</dd>
              </div>
              <div>
                <dt>Event Time</dt>
                <dd>{event.time || 'Time to be announced'}</dd>
              </div>
            </dl>
          </>
        )}
      </section>
    </main>
  );
}
