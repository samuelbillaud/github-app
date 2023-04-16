import { GetPullRequest, PullRequestWithScore } from '../types';
import { calculateAuthorNameScore } from './calculateAuthorNameScore';

const getHasUrgentLabel = (labels: GetPullRequest['labels']) => labels.some(({ name }) => name === 'URGENT');

const calculateScore = ({ user, labels, mergeable, draft, additions, deletions }: GetPullRequest): number => {
  let score = 0;

  const hasUrgentLabel = getHasUrgentLabel(labels);
  const authorNameScore = user ? calculateAuthorNameScore(user.login) : 0;
  const linesChanges = additions + deletions;

  if (hasUrgentLabel) {
    score += 10;
  }

  if (!mergeable) {
    score -= 2;
  }

  if (linesChanges < 100) {
    score += 1;
  }

  if (draft) {
    score -= 5;
  }

  return score + authorNameScore;
};

export const getNextPRToReview = (pullRequestQueries: GetPullRequest[]): PullRequestWithScore => {
  const result = pullRequestQueries.map((data) => {
    const { title, html_url: htmlURL, created_at: createdAt, user } = data || {};

    return {
      title,
      htmlURL,
      createdAt,
      login: user?.login,
      score: calculateScore(data),
    };
  });

  return result.reduce((previous, current) => (previous.score > current.score ? previous : current), result[0]);
};
