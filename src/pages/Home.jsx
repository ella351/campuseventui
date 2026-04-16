import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <main className="home-page">
      <section className="hero">
        <div className="hero-content">
          <span className="eyebrow">College of Arts and Sciences Events</span>
          <h1>ISPSC Tagudin Campus Event</h1>
          <p>
            Welcome, ISPSC Tagudin Campus students. Stay updated with BSIT and
            CAS activities such as exhibits, research conferences, quiz bees,
            capstone project presentations, and Java programming challenges.
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
            <span>CAS</span>
            <strong>IT</strong>
          </div>
          <div>
            <h2>BSIT Capstone Project Exhibit</h2>
            <p>
              A student showcase for practical systems, research outputs, and
              programming projects from ISPSC Tagudin Campus.
            </p>
          </div>
        </div>
      </section>

      <section className="feature-band" aria-label="CAS programs">
        <article>
          <strong>BSIT Events</strong>
          <span>Capstone project exhibit, Java programming, and IT showcases</span>
        </article>
        <article>
          <strong>CAS Programs</strong>
          <span>
            English Language, Psychology, Social Science, and Public
            Administration
          </span>
        </article>
        <article>
          <strong>More CAS Courses</strong>
          <span>Information Technology and Mathematics campus activities</span>
        </article>
      </section>
    </main>
  );
}
