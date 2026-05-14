import { scoreAnswers, isComplete } from './scoring';
import { QUESTIONS } from './questions';
import { Answers } from './scoring';

function answersChoosing(choice: 0 | 1): Answers {
  const a: Answers = {};
  for (const q of QUESTIONS) a[q.id] = choice;
  return a;
}

describe('scoreAnswers', () => {
  test('all option 0 -> NSGI', () => {
    expect(scoreAnswers(answersChoosing(0))).toBe('NSGI');
  });

  test('all option 1 -> MCVT', () => {
    expect(scoreAnswers(answersChoosing(1))).toBe('MCVT');
  });

  test('majority per axis decides the pole', () => {
    // All option 1 except: flip 2 of 3 NM questions to option 0.
    // Expect N on NM, MCVT-like on the rest -> 'NCVT'.
    const a: Answers = {};
    for (const q of QUESTIONS) a[q.id] = 1;
    const nmQuestions = QUESTIONS.filter((q) => q.axis === 'NM').slice(0, 2);
    for (const q of nmQuestions) a[q.id] = 0;
    expect(scoreAnswers(a)).toBe('NCVT');
  });

  test('throws when an answer is missing', () => {
    const a = answersChoosing(0);
    delete a[QUESTIONS[0].id];
    expect(() => scoreAnswers(a)).toThrow();
  });
});

describe('isComplete', () => {
  test('false when partial', () => {
    expect(isComplete({})).toBe(false);
    const partial: Answers = { [QUESTIONS[0].id]: 0 };
    expect(isComplete(partial)).toBe(false);
  });
  test('true when all answered', () => {
    expect(isComplete(answersChoosing(0))).toBe(true);
  });
});
