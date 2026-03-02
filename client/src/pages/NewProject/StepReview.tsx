import { useStep } from './StepEmotionalTarget';
import { calculateERIQ, getWeakestDimension } from '@eriq/shared';
import type { ERIQResult } from '@eriq/shared';

interface StepReviewProps {
  onSave: () => void;
}

export function StepReview({ onSave }: StepReviewProps) {
  const { input } = useStep();
  const result: ERIQResult = calculateERIQ(input);
  const weakest = getWeakestDimension(result);

  return (
    <section className="step step-review">
      <h2>Review & save</h2>

      <div className="eriq-score-card" data-band={result.interpretation.band}>
        <div className="eriq-score-value">{result.eriqScore}</div>
        <div className="eriq-score-label">ERIQ Score</div>
        <p className="eriq-interpretation">
          <strong>{result.interpretation.label}</strong> — {result.interpretation.action}
        </p>
      </div>

      <div className="dimension-bars">
        <div className="dim-bar" style={{ '--weight': result.motive.average / 25, '--color': 'var(--color-motive)' } as React.CSSProperties}>
          <span>MOTIVE</span>
          <span>{result.motive.average.toFixed(1)} avg → {result.motive.weighted.toFixed(1)} pts</span>
        </div>
        <div className="dim-bar" style={{ '--weight': result.meaning.average / 25, '--color': 'var(--color-meaning)' } as React.CSSProperties}>
          <span>MEANING</span>
          <span>{result.meaning.average.toFixed(1)} avg → {result.meaning.weighted.toFixed(1)} pts</span>
        </div>
        <div className="dim-bar" style={{ '--weight': result.match.average / 25, '--color': 'var(--color-match)' } as React.CSSProperties}>
          <span>MATCH</span>
          <span>{result.match.average.toFixed(1)} avg → {result.match.weighted.toFixed(1)} pts</span>
        </div>
      </div>

      <p className="weakest">
        Weakest dimension: <strong>{weakest.toUpperCase()}</strong> — consider refining this before launch.
      </p>

      <button type="button" className="btn btn-primary" onClick={onSave}>
        Save assessment & view dashboard
      </button>
    </section>
  );
}
