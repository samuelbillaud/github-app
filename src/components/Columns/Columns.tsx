import { FC } from 'react';
import { useGetColumns } from '../../hooks';

import { Spinner } from '../Spinner';
import { container, pullRequest, column, pullRequestHeader, pullRequestName } from './Columns.css';

type ColumnsProps = {
  url: string;
};

export const Columns: FC<ColumnsProps> = ({ url }) => {
  const { columns, isLoading, error } = useGetColumns(url);

  if (isLoading) {
    return <Spinner />;
  }

  if (error) {
    return <div>{error.message}</div>;
  }

  return (
    <div className={container}>
      {(Object.values(columns) || []).map(({ id, color, name, pullRequests }) => (
        <div key={id} className={column} style={{ border: `2px solid #${color}` }}>
          <div
            className={pullRequestHeader}
            style={{ background: `#${color}`, color: color === '000000' ? '#fff' : '#000' }}
          >
            {name}
          </div>
          <div>
            {pullRequests.map(({ id, title, created_at, html_url, user }) => (
              <div key={id} className={pullRequest}>
                <a href={html_url}>
                  <div className={pullRequestName}>{title}</div>
                  <div>Opened at: {new Date(created_at).toLocaleString()}</div>
                  <div>By: {user?.login}</div>
                </a>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};
