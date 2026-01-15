import { Task } from '@/types';

const HEADERS = [
  'id',
  'title',
  'revenue',
  'timeTaken',
  'priority',
  'status',
  'notes',
];

export function toCSV(tasks: ReadonlyArray<Task>): string {
  const rows = tasks.map(t => [
    t.id,
    t.title,
    t.revenue,
    t.timeTaken,
    t.priority,
    t.status,
    t.notes ?? '',
  ]);

  return [
    HEADERS.join(','),
    ...rows.map(r => r.map(escapeCsv).join(',')),
  ].join('\n');
}

function escapeCsv(value: unknown): string {
  const v = String(value ?? '');
  const mustQuote = /[",\n]/.test(v);
  const escaped = v.replace(/"/g, '""');
  return mustQuote ? `"${escaped}"` : escaped;
}

export function downloadCSV(filename: string, content: string) {
  const blob = new Blob([content], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}
