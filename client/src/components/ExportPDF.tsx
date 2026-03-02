import { jsPDF } from 'jspdf';
import type { Project, ERIQResult } from '@eriq/shared';

interface ExportPDFProps {
  project: Project;
  result: ERIQResult;
}

export function ExportPDF({ project, result }: ExportPDFProps) {
  const handleExport = () => {
    const doc = new jsPDF();
    const pageW = doc.getPageWidth();
    let y = 20;

    doc.setFontSize(18);
    doc.text('ERIQ Pre-Launch Report', 20, y);
    y += 10;

    doc.setFontSize(12);
    doc.text(project.name, 20, y);
    y += 6;
    doc.setFontSize(10);
    doc.text(`Emotional target: ${project.input.emotionalTarget}`, 20, y);
    y += 5;
    doc.text(`Audience: ${project.input.audienceSegment}`, 20, y);
    y += 10;

    doc.setFontSize(14);
    doc.text(`ERIQ Score: ${result.eriqScore}`, 20, y);
    y += 6;
    doc.setFontSize(10);
    doc.text(`${result.interpretation.label} — ${result.interpretation.action}`, 20, y);
    y += 12;

    doc.setFontSize(12);
    doc.text('Dimension breakdown', 20, y);
    y += 8;
    doc.setFontSize(10);
    doc.text(`MOTIVE: ${result.motive.weighted.toFixed(1)} pts (avg ${result.motive.average.toFixed(1)}/25)`, 20, y);
    y += 6;
    doc.text(`MEANING: ${result.meaning.weighted.toFixed(1)} pts (avg ${result.meaning.average.toFixed(1)}/25)`, 20, y);
    y += 6;
    doc.text(`MATCH: ${result.match.weighted.toFixed(1)} pts (avg ${result.match.average.toFixed(1)}/25)`, 20, y);
    y += 12;

    doc.setFontSize(10);
    doc.text('Recommendation: Refine the weakest dimension before launch.', 20, y);

    doc.save(`ERIQ-${project.name.replace(/\s+/g, '-')}.pdf`);
  };

  return (
    <button type="button" className="btn btn-secondary" onClick={handleExport}>
      Export PDF
    </button>
  );
}
