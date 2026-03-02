import { useStep } from './StepEmotionalTarget';
import { SubMetricField } from '../../components/SubMetricField';
import { ImportMatchCSV } from '../../components/ImportMatchCSV';
import type { MatchScores } from '@eriq/shared';

const FIELDS: Array<{
  key: keyof MatchScores;
  label: string;
  prompt: string;
}> = [
  {
    key: 'emotionMatch',
    label: 'Emotion Match',
    prompt: '% of audience that reports feeling the intended emotion (scale 0–25 from 0–100%)',
  },
  {
    key: 'contextualFit',
    label: 'Contextual Fit',
    prompt: 'Did the emotion feel relevant in cultural, situational, or audience context?',
  },
  {
    key: 'memorability',
    label: 'Memorability',
    prompt: 'Was the emotion recalled after 24–72 hours?',
  },
  {
    key: 'actionability',
    label: 'Actionability',
    prompt: 'Did the emotion lead to meaningful behavior (save, click, share, purchase)?',
  },
];

export function StepMatch() {
  const { input, setInput } = useStep();

  const update = (key: keyof MatchScores, value: MatchScores[keyof MatchScores]) => {
    setInput((prev) => ({
      ...prev,
      match: { ...prev.match, [key]: value },
    }));
  };

  const applyImported = (partial: Partial<MatchScores>) => {
    setInput((prev) => ({
      ...prev,
      match: { ...prev.match, ...partial },
    }));
  };

  return (
    <section className="step step-match">
      <h2>MATCH (40%)</h2>
      <p className="dimension-desc">Does the audience actually feel the intended emotion?</p>
      <p className="hint">Use research (surveys, sentiment, behavioral data) where available. Otherwise score from hypothesis or early signals.</p>
      <ImportMatchCSV onImport={applyImported} />

      {FIELDS.map(({ key, label, prompt }) => (
        <SubMetricField
          key={key}
          label={label}
          prompt={prompt}
          value={input.match[key]}
          onChange={(v) => update(key, v)}
          evidenceLabel="Source (e.g. survey %, sentiment report, behavioral metric)"
        />
      ))}
    </section>
  );
}
