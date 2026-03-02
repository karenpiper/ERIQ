import { useStep } from './StepEmotionalTarget';
import { SubMetricField } from '../../components/SubMetricField';
import type { MotiveScores } from '@eriq/shared';

const FIELDS: Array<{
  key: keyof MotiveScores;
  label: string;
  prompt: string;
}> = [
  {
    key: 'needClarity',
    label: 'Need Clarity',
    prompt: 'Is the emotional need clearly defined and linked to audience tension?',
  },
  {
    key: 'relevance',
    label: 'Relevance',
    prompt: 'Is the need salient and timely in the audience\'s life or context?',
  },
  {
    key: 'differentiation',
    label: 'Differentiation',
    prompt: 'Does the brand address the need in a way competitors don\'t?',
  },
  {
    key: 'fitWithBrand',
    label: 'Fit with Brand',
    prompt: 'Does the emotional need align with brand values and positioning?',
  },
];

export function StepMotive() {
  const { input, setInput } = useStep();

  const update = (key: keyof MotiveScores, value: MotiveScores[keyof MotiveScores]) => {
    setInput((prev) => ({
      ...prev,
      motive: { ...prev.motive, [key]: value },
    }));
  };

  return (
    <section className="step step-motive">
      <h2>MOTIVE (30%)</h2>
      <p className="dimension-desc">Does the brand align with real audience emotional need?</p>

      {FIELDS.map(({ key, label, prompt }) => (
        <SubMetricField
          key={key}
          label={label}
          prompt={prompt}
          value={input.motive[key]}
          onChange={(v) => update(key, v)}
          evidenceLabel="Where is this need expressed in the creative?"
        />
      ))}
    </section>
  );
}
