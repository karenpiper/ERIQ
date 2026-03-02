/**
 * ERIQ weighted scoring engine
 * ERIQ = (MOTIVE × 0.3) + (MEANING × 0.3) + (MATCH × 0.4)
 * Each dimension is average of 4 sub-metrics (0–25), then scaled to 0–100 contribution.
 */

import type {
  ERIQInput,
  ERIQResult,
  DimensionResult,
  ScoreInterpretation,
  MotiveScores,
  MeaningScores,
  MatchScores,
} from './types.js';
import {
  MOTIVE_WEIGHT,
  MEANING_WEIGHT,
  MATCH_WEIGHT,
  SUB_METRIC_MAX,
  INTERPRETATION_GUIDE,
} from './types.js';

function averageSubMetrics(scores: Record<string, { score: number }>): number {
  const values = Object.values(scores).map((s) => s.score);
  if (values.length === 0) return 0;
  return values.reduce((a, b) => a + b, 0) / values.length;
}

/** Scale dimension average (0–25) to 0–100 */
function scaleTo100(avg: number): number {
  return (avg / SUB_METRIC_MAX) * 100;
}

/** Contribution to final ERIQ (motive 0–30, meaning 0–30, match 0–40) */
function contribution(avg: number, weight: number): number {
  return scaleTo100(avg) * weight;
}

function buildDimensionResult(
  scores: MotiveScores | MeaningScores | MatchScores,
  weight: number
): DimensionResult {
  const entries = Object.entries(scores).map(([key, v]) => [
    key,
    { score: v.score, rationale: v.rationale, evidence: v.evidence },
  ]);
  const subMetrics = Object.fromEntries(entries);
  const average = averageSubMetrics(scores as Record<string, { score: number }>);
  const weighted = contribution(average, weight);
  return {
    average,
    weighted: Math.round(weighted * 10) / 10,
    subMetrics,
  };
}

function getInterpretation(score: number): ScoreInterpretation {
  if (score >= 85) return INTERPRETATION_GUIDE.deep;
  if (score >= 70) return INTERPRETATION_GUIDE.strong;
  if (score >= 50) return INTERPRETATION_GUIDE.moderate;
  return INTERPRETATION_GUIDE.low;
}

export function calculateERIQ(input: ERIQInput): ERIQResult {
  const motive = buildDimensionResult(input.motive, MOTIVE_WEIGHT);
  const meaning = buildDimensionResult(input.meaning, MEANING_WEIGHT);
  const match = buildDimensionResult(input.match, MATCH_WEIGHT);

  const eriqScore =
    contribution(motive.average, MOTIVE_WEIGHT) +
    contribution(meaning.average, MEANING_WEIGHT) +
    contribution(match.average, MATCH_WEIGHT);

  const roundedScore = Math.round(eriqScore * 10) / 10;
  const interpretation = getInterpretation(roundedScore);

  return {
    eriqScore: roundedScore,
    motive,
    meaning,
    match,
    interpretation,
  };
}

/** Get weakest dimension for recommendation */
export function getWeakestDimension(result: ERIQResult): 'motive' | 'meaning' | 'match' {
  const dims = [
    { key: 'motive' as const, avg: result.motive.average },
    { key: 'meaning' as const, avg: result.meaning.average },
    { key: 'match' as const, avg: result.match.average },
  ];
  dims.sort((a, b) => a.avg - b.avg);
  return dims[0].key;
}
