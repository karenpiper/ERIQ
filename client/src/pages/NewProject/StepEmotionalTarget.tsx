import { createContext, useContext } from 'react';
import type { ERIQInput } from '@eriq/shared';

type SetInput = React.Dispatch<React.SetStateAction<ERIQInput>>;

type Ctx = {
  input: ERIQInput;
  setInput: SetInput;
  next: () => void;
  prev: () => void;
};

export const StepContext = createContext<Ctx | null>(null);

export function useStep() {
  const ctx = useContext(StepContext);
  if (!ctx) throw new Error('StepContext missing');
  return ctx;
}

export function StepEmotionalTarget() {
  const { input, setInput, next } = useStep();

  const update = (key: keyof ERIQInput, value: string) => {
    setInput((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <section className="step step-emotional">
      <h2>Set emotional target</h2>
      <p className="prompt">What emotion are you trying to evoke, and why does it matter to the audience?</p>

      <div className="form-group">
        <label>What emotion are we trying to evoke?</label>
        <input
          type="text"
          placeholder="e.g. Confidence mixed with irreverence"
          value={input.emotionalTarget}
          onChange={(e) => update('emotionalTarget', e.target.value)}
        />
      </div>
      <div className="form-group">
        <label>Why does this matter to the audience?</label>
        <textarea
          placeholder="Describe the audience tension or need this emotion addresses."
          value={input.whyItMatters}
          onChange={(e) => update('whyItMatters', e.target.value)}
          rows={3}
        />
      </div>
      <div className="form-group">
        <label>Audience segment</label>
        <input
          type="text"
          placeholder="e.g. Gen Z urban professionals"
          value={input.audienceSegment}
          onChange={(e) => update('audienceSegment', e.target.value)}
        />
      </div>
      <div className="form-group">
        <label>Creative context (optional)</label>
        <input
          type="text"
          placeholder="Channel, business goal, or brief context"
          value={input.creativeContext ?? ''}
          onChange={(e) => update('creativeContext', e.target.value)}
        />
      </div>

      <button type="button" className="btn btn-primary" onClick={next}>
        Continue to MOTIVE
      </button>
    </section>
  );
}
