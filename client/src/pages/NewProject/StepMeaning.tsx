import { useStep } from './StepEmotionalTarget';
import { SubMetricField } from '../../components/SubMetricField';
import type { MeaningScores } from '@eriq/shared';

const FIELDS: Array<{
  key: keyof MeaningScores;
  label: string;
  prompt: string;
}> = [
  {
    key: 'emotionalClarity',
    label: 'Emotional Clarity',
    prompt: 'Is the expression unmistakable—does the emotion come through strongly?',
  },
  {
    key: 'authenticity',
    label: 'Authenticity',
    prompt: 'Does the tone feel real, not forced or performative?',
  },
  {
    key: 'narrativeConsistency',
    label: 'Narrative Consistency',
    prompt: 'Do story, design, and tone align with the emotional goal?',
  },
  {
    key: 'peakMoments',
    label: 'Peak Moments',
    prompt: 'Are there clear moments that evoke an emotional response?',
  },
];

export function StepMeaning() {
  const { input, setInput } = useStep();

  const update = (key: keyof MeaningScores, value: MeaningScores[keyof MeaningScores]) => {
    setInput((prev) => ({
      ...prev,
      meaning: { ...prev.meaning, [key]: value },
    }));
  };

  return (
    <section className="step step-meaning">
      <h2>MEANING (30%)</h2>
      <p className="dimension-desc">Is the emotion expressed authentically and clearly?</p>

      {FIELDS.map(({ key, label, prompt }) => (
        <SubMetricField
          key={key}
          label={label}
          prompt={prompt}
          value={input.meaning[key]}
          onChange={(v) => update(key, v)}
          evidenceLabel="Where in the creative is this emotion clearest?"
        />
      ))}
    </section>
  );
}
