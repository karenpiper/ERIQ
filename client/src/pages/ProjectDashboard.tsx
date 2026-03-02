import { useParams, Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { calculateERIQ, getWeakestDimension } from '@eriq/shared';
import type { Project, ERIQResult } from '@eriq/shared';
import { ExportPDF } from '../components/ExportPDF';
import './ProjectDashboard.css';

export function ProjectDashboard() {
  const { id } = useParams<{ id: string }>();
  const [project, setProject] = useState<Project | null>(null);

  useEffect(() => {
    if (!id) return;
    fetch(`/api/projects/${id}`)
      .then((r) => r.json())
      .then(setProject)
      .catch(() => setProject(null));
  }, [id]);

  if (!project) {
    return (
      <div className="page-dashboard">
        <p>Loading…</p>
        <Link to="/">Back to projects</Link>
      </div>
    );
  }

  const result: ERIQResult = project.result ?? calculateERIQ(project.input);
  const weakest = getWeakestDimension(result);

  return (
    <div className="page-dashboard">
      <div className="dashboard-header">
        <Link to="/">← Projects</Link>
        <h1>{project.name}</h1>
        <p className="meta">
          {project.input.audienceSegment && `Audience: ${project.input.audienceSegment}`}
          {project.input.emotionalTarget && ` · Target: ${project.input.emotionalTarget}`}
        </p>
        <ExportPDF project={project} result={result} />
      </div>

      <div className="eriq-score-card" data-band={result.interpretation.band}>
        <div className="eriq-score-value">{result.eriqScore}</div>
        <div className="eriq-score-label">ERIQ Score</div>
        <p className="eriq-interpretation">
          <strong>{result.interpretation.label}</strong> — {result.interpretation.action}
        </p>
      </div>

      <section className="dimension-breakdown">
        <h2>Dimension breakdown</h2>
        <div className="dimension-cards">
          <div className="dim-card motive">
            <h3>MOTIVE (30%)</h3>
            <div className="dim-score">{result.motive.weighted.toFixed(1)} pts</div>
            <p>Avg sub-metric: {result.motive.average.toFixed(1)}/25</p>
            <ul>
              {Object.entries(result.motive.subMetrics).map(([key, v]) => (
                <li key={key}>
                  <span className="key">{key}</span> {v.score}/25
                  {v.rationale && <span className="rationale"> — {v.rationale}</span>}
                </li>
              ))}
            </ul>
          </div>
          <div className="dim-card meaning">
            <h3>MEANING (30%)</h3>
            <div className="dim-score">{result.meaning.weighted.toFixed(1)} pts</div>
            <p>Avg sub-metric: {result.meaning.average.toFixed(1)}/25</p>
            <ul>
              {Object.entries(result.meaning.subMetrics).map(([key, v]) => (
                <li key={key}>
                  <span className="key">{key}</span> {v.score}/25
                  {v.rationale && <span className="rationale"> — {v.rationale}</span>}
                </li>
              ))}
            </ul>
          </div>
          <div className="dim-card match">
            <h3>MATCH (40%)</h3>
            <div className="dim-score">{result.match.weighted.toFixed(1)} pts</div>
            <p>Avg sub-metric: {result.match.average.toFixed(1)}/25</p>
            <ul>
              {Object.entries(result.match.subMetrics).map(([key, v]) => (
                <li key={key}>
                  <span className="key">{key}</span> {v.score}/25
                  {v.rationale && <span className="rationale"> — {v.rationale}</span>}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <p className="weakest">
        Weakest dimension: <strong>{weakest.toUpperCase()}</strong> — refine this for greater impact.
      </p>
    </div>
  );
}
