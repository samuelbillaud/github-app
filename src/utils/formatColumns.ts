import { Columns, GetPullRequests } from '../types';

export const formatColumns = (pullRequests: GetPullRequests): Columns => {
  const columns: Columns = {};

  for (const pullRequest of pullRequests || []) {
    const { labels } = pullRequest;

    for (const { id, name, default: isDefault, color } of labels || []) {
      if (!columns[name]) {
        columns[name] = {
          id,
          name,
          isDefault,
          color,
          pullRequests: [],
        };
      }

      columns[name].pullRequests.push(pullRequest);
    }
  }

  return columns;
};
