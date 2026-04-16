import { useEffect, useMemo, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useApp } from '../context/AppContext.jsx';

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

          setApiEvent({
            id: data.id,
            title: data.title,
            body: data.body,
            category: courseCategories[data.id % courseCategories.length],
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
        <Link className="text-link" to="/events">
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
            </dl>
          </>
        )}
      </section>
    </main>
  );
}
