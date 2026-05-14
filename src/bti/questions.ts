import { Question } from './types';

// 12 questions — 3 per axis. Option 0 always contributes to the first letter of
// the axis (N, S, G, I), option 1 to the second (M, C, V, T). The wizard
// renders option text by question id from i18n.
export const QUESTIONS: Question[] = [
  // NM — Nit vs Maniac (starting-hand range)
  { id: 'q1', axis: 'NM', options: [{ pole: 'N' }, { pole: 'M' }] },
  { id: 'q2', axis: 'NM', options: [{ pole: 'N' }, { pole: 'M' }] },
  { id: 'q3', axis: 'NM', options: [{ pole: 'N' }, { pole: 'M' }] },
  // SC — Shover vs Caller (aggression / initiative)
  { id: 'q4', axis: 'SC', options: [{ pole: 'S' }, { pole: 'C' }] },
  { id: 'q5', axis: 'SC', options: [{ pole: 'S' }, { pole: 'C' }] },
  { id: 'q6', axis: 'SC', options: [{ pole: 'S' }, { pole: 'C' }] },
  // GV — GTO Gremlin vs Vibes Merchant (decision basis)
  { id: 'q7', axis: 'GV', options: [{ pole: 'G' }, { pole: 'V' }] },
  { id: 'q8', axis: 'GV', options: [{ pole: 'G' }, { pole: 'V' }] },
  { id: 'q9', axis: 'GV', options: [{ pole: 'G' }, { pole: 'V' }] },
  // IT — Ice vs Tilt Monster (emotional regulation)
  { id: 'q10', axis: 'IT', options: [{ pole: 'I' }, { pole: 'T' }] },
  { id: 'q11', axis: 'IT', options: [{ pole: 'I' }, { pole: 'T' }] },
  { id: 'q12', axis: 'IT', options: [{ pole: 'I' }, { pole: 'T' }] },
];

export const NUM_QUESTIONS = QUESTIONS.length;
