import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './Home.css';
import type { Project } from '@eriq/shared';

export function Home() {
  const [projects, setProjects] = useState<Project[]>([]);

  useEffect(() => {
    fetch('/api/projects')
      .then((r) => r.json())
      .then(setProjects)
      .catch(() => setProjects([]));
  }, []);

  return (
    <div className="page-home">
      <h1>ERIQ</h1>
      <p className="tagline">Emotional Resonance Intelligence Quotient — measure whether your brand, campaign, or experience delivers the emotional impact you intended.</p>
      <Link to="/new" className="btn btn-primary">New assessment</Link>

      {projects.length > 0 && (
        <section className="project-list">
          <h2>Recent projects</h2>
          <ul>
            {projects.map((p) => (
              <li key={p.id}>
                <Link to={`/project/${p.id}`}>
                  <span className="name">{p.name}</span>
                  {p.result && (
                    <span className="score" data-band={p.result.interpretation.band}>
                      {p.result.eriqScore}
                    </span>
                  )}
                </Link>
              </li>
            ))}
          </ul>
        </section>
      )}
    </div>
  );
}
