/**
 * ERIQ Framework types — Motive (30%), Meaning (30%), Match (40%)
 */

export const MOTIVE_WEIGHT = 0.3;
export const MEANING_WEIGHT = 0.3;
export const MATCH_WEIGHT = 0.4;

export const SUB_METRIC_MAX = 25;

/** MOTIVE sub-metrics (0–25 each) */
export type MotiveSubMetric =
  | 'needClarity'
  | 'relevance'
  | 'differentiation'
  | 'fitWithBrand';

/** MEANING sub-metrics (0–25 each) */
export type MeaningSubMetric =
  | 'emotionalClarity'
  | 'authenticity'
  | 'narrativeConsistency'
  | 'peakMoments';

/** MATCH sub-metrics (0–25 each) */
export type MatchSubMetric =
  | 'emotionMatch'
  | 'contextualFit'
  | 'memorability'
  | 'actionability';

export interface SubMetricScore<T extends string = string> {
  score: number; // 0–25
  rationale?: string;
  evidence?: string;
}

export interface MotiveScores {
  needClarity: SubMetricScore;
  relevance: SubMetricScore;
  differentiation: SubMetricScore;
  fitWithBrand: SubMetricScore;
}

export interface MeaningScores {
  emotionalClarity: SubMetricScore;
  authenticity: SubMetricScore;
  narrativeConsistency: SubMetricScore;
  peakMoments: SubMetricScore;
}

export interface MatchScores {
  emotionMatch: SubMetricScore;
  contextualFit: SubMetricScore;
  memorability: SubMetricScore;
  actionability: SubMetricScore;
}

export interface ERIQInput {
  /** Emotional target & context */
  emotionalTarget: string;
  whyItMatters: string;
  audienceSegment: string;
  /** Creative context */
  creativeContext?: string;
  channel?: string;
  businessGoal?: string;
  /** Dimension scores */
  motive: MotiveScores;
  meaning: MeaningScores;
  match: MatchScores;
}

export interface DimensionResult {
  average: number; // 0–25 raw average
  weighted: number; // 0–100 scale contribution
  subMetrics: Record<string, { score: number; rationale?: string; evidence?: string }>;
}

export interface ERIQResult {
  eriqScore: number; // 0–100
  motive: DimensionResult;
  meaning: DimensionResult;
  match: DimensionResult;
  interpretation: ScoreInterpretation;
}

export type ScoreInterpretation =
  | { band: 'deep'; label: string; action: string }
  | { band: 'strong'; label: string; action: string }
  | { band: 'moderate'; label: string; action: string }
  | { band: 'low'; label: string; action: string };

export const INTERPRETATION_GUIDE: Record<string, ScoreInterpretation> = {
  deep: {
    band: 'deep',
    label: 'Deep emotional resonance',
    action: 'Expand, amplify, study why it worked',
  },
  strong: {
    band: 'strong',
    label: 'Strong but uneven',
    action: 'Refine weaker dimension',
  },
  moderate: {
    band: 'moderate',
    label: 'Moderate resonance',
    action: 'Rethink narrative or clarity',
  },
  low: {
    band: 'low',
    label: 'Low resonance',
    action: 'Revisit insight, strategy, or execution',
  },
};

export interface Project {
  id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
  input: ERIQInput;
  result?: ERIQResult;
  workflow: 'preLaunch' | 'postLaunch' | 'tracking';
}
