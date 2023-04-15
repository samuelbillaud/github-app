import { COLUMNS, PULL_REQUESTS } from '../tests/mock';
import { GetPullRequests } from '../types';
import { formatColumns } from './formatColumns';

describe('formatColumns', () => {
  it('should return columns with pull request inside', () => {
    expect(formatColumns(PULL_REQUESTS as GetPullRequests)).toEqual(COLUMNS);
  });
});
