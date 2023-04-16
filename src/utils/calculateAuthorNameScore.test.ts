import { vi } from 'vitest';

import { calculateAuthorNameScore } from './calculateAuthorNameScore';

const cases = [
  ['alice', new Date('2022-04-17'), 1],
  ['frank', new Date('2022-04-18'), 1],
  ['killian', new Date('2022-04-19'), 1],
  ['peter', new Date('2022-04-20'), 1],
  ['uguette', new Date('2022-04-21'), 1],
  ['albert', new Date('2022-04-22'), 0],
  ['zinedine', new Date('2022-04-18'), 0],
];

describe('calculateAuthorNameScore', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  test.each(cases)('given %p and %p as arguments, returns %p', (authorName, date, expectedResult) => {
    vi.setSystemTime(date);

    const score = calculateAuthorNameScore(authorName as string);
    expect(score).toEqual(expectedResult);
  });
});
