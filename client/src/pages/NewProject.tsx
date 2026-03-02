import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import type { ERIQInput, MotiveScores, MeaningScores, MatchScores } from '@eriq/shared';
import { SUB_METRIC_MAX } from '@eriq/shared';
import { StepContext, StepEmotionalTarget } from './NewProject/StepEmotionalTarget';
import { StepMotive } from './NewProject/StepMotive';
import { StepMeaning } from './NewProject/StepMeaning';
import { StepMatch } from './NewProject/StepMatch';
import { StepReview } from './NewProject/StepReview';
import './NewProject/newProject.css';

const emptySub = () => ({ score: 0, rationale: '', evidence: '' });

const defaultMotive: MotiveScores = {
  needClarity: emptySub(),
  relevance: emptySub(),
  differentiation: emptySub(),
  fitWithBrand: emptySub(),
};

const defaultMeaning: MeaningScores = {
  emotionalClarity: emptySub(),
  authenticity: emptySub(),
  narrativeConsistency: emptySub(),
  peakMoments: emptySub(),
};

const defaultMatch: MatchScores = {
  emotionMatch: emptySub(),
  contextualFit: emptySub(),
  memorability: emptySub(),
  actionability: emptySub(),
};

const steps = ['Emotional target', 'MOTIVE', 'MEANING', 'MATCH', 'Review'];

export function NewProject() {
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [input, setInput] = useState<ERIQInput>({
    emotionalTarget: '',
    whyItMatters: '',
    audienceSegment: '',
    creativeContext: '',
    channel: '',
    businessGoal: '',
    motive: defaultMotive,
    meaning: defaultMeaning,
    match: defaultMatch,
  });

  const next = () => {
    if (step < steps.length - 1) setStep((s) => s + 1);
  };
  const prev = () => {
    if (step > 0) setStep((s) => s - 1);
  };

  const handleSave = async () => {
    const res = await fetch('/api/projects', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: input.emotionalTarget || 'Untitled assessment',
        workflow: 'preLaunch',
        input,
      }),
    });
    const project = await res.json();
    navigate(`/project/${project.id}`);
  };

  return (
    <div className="page-new">
      <nav className="step-nav">
        {steps.map((label, i) => (
          <button
            key={label}
            type="button"
            className={i === step ? 'active' : ''}
            onClick={() => setStep(i)}
          >
            {i + 1}. {label}
          </button>
        ))}
      </nav>

      <StepContext.Provider value={{ input, setInput, next, prev }}>
        {step === 0 && <StepEmotionalTarget />}
        {step === 1 && <StepMotive />}
        {step === 2 && <StepMeaning />}
        {step === 3 && <StepMatch />}
        {step === 4 && <StepReview onSave={handleSave} />}
      </StepContext.Provider>

      <div className="step-actions">
        {step > 0 && step < 4 && (
          <button type="button" className="btn btn-secondary" onClick={prev}>
            Back
          </button>
        )}
        {step < 4 && step > 0 && (
          <button type="button" className="btn btn-primary" onClick={next}>
            Next
          </button>
        )}
      </div>
    </div>
  );
}

export { SUB_METRIC_MAX };
