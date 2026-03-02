# ERIQ — Emotional Resonance Intelligence Quotient

A diagnostic tool that quantifies emotional resonance across **Motive**, **Meaning**, and **Match** to measure whether a brand, campaign, or experience delivers the intended emotional impact.

**Core value:** Turns qualitative emotional judgment into a measurable diagnostic for strategy validation, creative execution, and tracking over time.

## Quick start

```bash
npm install
npm run dev
```

- **Frontend:** http://localhost:5173  
- **API:** http://localhost:3000  

## Phase 1 MVP (this repo)

- **Scoring interface** for MOTIVE (30%) and MEANING (30%) with sub-metrics 0–25, rationale, and evidence
- **MATCH (40%)** input: manual entry + basic CSV import (headers: `emotionMatch`, `contextualFit`, `memorability`, `actionability`)
- **Weighted scoring:** `ERIQ = (MOTIVE × 0.3) + (MEANING × 0.3) + (MATCH × 0.4)`
- **Dashboard:** overall score, dimension breakdown, weakest dimension, interpretation guide
- **Export:** PDF pre-launch report

## Workflows (from PRD)

1. **Pre-launch validation** — Set emotional target → score MOTIVE/MEANING → input MATCH (manual or CSV) → review ERIQ → save & export
2. **Post-launch** and **Ongoing tracking** — Planned for Phase 2/3 (research data integration, trends, comparisons)

## Framework reference

| Dimension | Weight | Sub-metrics (0–25 each) |
|-----------|--------|--------------------------|
| **MOTIVE** | 30% | Need Clarity, Relevance, Differentiation, Fit with Brand |
| **MEANING** | 30% | Emotional Clarity, Authenticity, Narrative Consistency, Peak Moments |
| **MATCH** | 40% | Emotion Match, Contextual Fit, Memorability, Actionability |

**Interpretation:** 85–100 Deep → 70–84 Strong → 50–69 Moderate → &lt;50 Low resonance.

## Project structure

- `client/` — React (Vite) app: emotional target step, MOTIVE/MEANING/MATCH scoring, dashboard, PDF export
- `server/` — Express API: project CRUD, scoring via `@eriq/shared`
- `shared/` — Types and scoring engine (weighted average, interpretation band)

## Tech stack

- **Frontend:** React 18, TypeScript, Vite, React Router, Recharts (optional later), jsPDF
- **Backend:** Node, Express, in-memory store (Phase 1); PostgreSQL planned
- **Shared:** TypeScript package consumed by client and server
