import type { MatchScores } from '@eriq/shared';

const MATCH_KEYS: (keyof MatchScores)[] = ['emotionMatch', 'contextualFit', 'memorability', 'actionability'];

function parseCSV(text: string): string[][] {
  const lines = text.trim().split(/\r?\n/);
  return lines.map((line) => {
    const row: string[] = [];
    let cell = '';
    let inQuotes = false;
    for (let i = 0; i < line.length; i++) {
      const c = line[i];
      if (c === '"') inQuotes = !inQuotes;
      else if ((c === ',' || c === '\t') && !inQuotes) {
        row.push(cell.trim());
        cell = '';
      } else cell += c;
    }
    row.push(cell.trim());
    return row;
  });
}

const HEADER_ALIASES: Record<string, keyof MatchScores> = {
  emotionmatch: 'emotionMatch',
  emotion_match: 'emotionMatch',
  contextualfit: 'contextualFit',
  contextual_fit: 'contextualFit',
  memorability: 'memorability',
  actionability: 'actionability',
};

/** Map first data row to 0-25 scores. Expects headers or first row with numeric values. */
function mapRowToMatch(row: string[], headers: string[]): Partial<MatchScores> | null {
  const out: Partial<MatchScores> = {};
  for (let i = 0; i < headers.length && i < row.length; i++) {
    const raw = headers[i].trim().toLowerCase().replace(/\s+/g, '').replace(/_/g, '');
    const matchKey = HEADER_ALIASES[raw] ?? (MATCH_KEYS.includes(raw as keyof MatchScores) ? (raw as keyof MatchScores) : null);
    if (!matchKey) continue;
    const num = Number(String(row[i]).replace(/[%,\s]/g, ''));
    if (Number.isNaN(num)) continue;
    const score = num > 25 ? Math.round((num / 100) * 25) : Math.min(25, Math.max(0, Math.round(num)));
    out[matchKey] = { score, rationale: 'From CSV import', evidence: 'CSV' };
  }
  return Object.keys(out).length ? out : null;
}

interface ImportMatchCSVProps {
  onImport: (scores: Partial<MatchScores>) => void;
}

export function ImportMatchCSV({ onImport }: ImportMatchCSVProps) {
  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      const text = String(reader.result);
      const grid = parseCSV(text);
      if (grid.length < 2) return;
      const headers = grid[0].map((h) => h.replace(/^["']|["']$/g, ''));
      const firstRow = grid[1];
      const mapped = mapRowToMatch(firstRow, headers);
      if (mapped) onImport(mapped);
    };
    reader.readAsText(file);
    e.target.value = '';
  };

  return (
    <div className="import-csv">
      <label className="btn btn-secondary" style={{ marginBottom: '1rem', display: 'inline-block' }}>
        Import MATCH data from CSV
        <input type="file" accept=".csv,.txt" onChange={handleFile} style={{ display: 'none' }} />
      </label>
      <p className="hint">CSV with headers: emotionMatch, contextualFit, memorability, actionability (scores 0–25 or 0–100 for %). First data row is used.</p>
    </div>
  );
}
