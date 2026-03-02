import type { SubMetricScore } from '@eriq/shared';

const MAX = 25;

interface SubMetricFieldProps {
  label: string;
  prompt: string;
  value: SubMetricScore;
  onChange: (v: SubMetricScore) => void;
  evidenceLabel?: string;
}

export function SubMetricField({
  label,
  prompt,
  value,
  onChange,
  evidenceLabel = 'Evidence / where in the creative',
}: SubMetricFieldProps) {
  return (
    <div className="sub-metric">
      <div className="sub-metric-header">
        <label>{label}</label>
        <span className="score-input">
          <input
            type="number"
            min={0}
            max={MAX}
            value={value.score === 0 ? '' : value.score}
            onChange={(e) => {
              const n = e.target.value === '' ? 0 : Math.min(MAX, Math.max(0, Number(e.target.value)));
              onChange({ ...value, score: n });
            }}
          />
          <span className="max">/ {MAX}</span>
        </span>
      </div>
      <p className="prompt">{prompt}</p>
      <textarea
        className="rationale"
        placeholder="Why did you give this score? What evidence supports it?"
        value={value.rationale ?? ''}
        onChange={(e) => onChange({ ...value, rationale: e.target.value })}
        rows={2}
      />
      <input
        type="text"
        className="evidence"
        placeholder={evidenceLabel}
        value={value.evidence ?? ''}
        onChange={(e) => onChange({ ...value, evidence: e.target.value })}
      />
    </div>
  );
}
