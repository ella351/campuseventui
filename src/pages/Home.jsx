export default function Home() {
  return (
    <main className="home-page">
      <section className="hero">
        <div className="hero-content">
          <span className="eyebrow">College Of Arts and Science</span>
          <h1>CAS Campus Events</h1>
          <p>
            Welcome, students of the College Of Arts and Science at ISPSC
            Tagudin Campus. This event hub highlights the academic,
            cultural, leadership, research, and student development activities
            of CAS.
          </p>
        </div>
        <div className="hero-panel" aria-label="Campus event preview">
          <div className="mini-calendar">
            <span>CAS</span>
            <strong>26</strong>
          </div>
          <div>
            <h2>College Of Arts and Science Week</h2>
            <p>
              College Of Arts and Science Week includes exhibits, research
              presentations, quiz bees, seminars, and student showcases.
            </p>
          </div>
        </div>
      </section>

      <section className="feature-band" aria-label="CAS programs">
        <article>
          <strong>Languages and Society</strong>
          <span>
            Bachelor of Arts in English Language and Bachelor of Arts in Social
            Science
          </span>
        </article>
        <article>
          <strong>People and Public Service</strong>
          <span>
            Bachelor of Arts in Psychology and Bachelor of Public
            Administration
          </span>
        </article>
        <article>
          <strong>Technology and Mathematics</strong>
          <span>
            Bachelor of Science in Information Technology and Bachelor of
            Science in Mathematics
          </span>
        </article>
      </section>
    </main>
  );
}
