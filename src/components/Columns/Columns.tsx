import { FC } from 'react';
import { useGetColumns } from '../../hooks';

type ColumnsProps = {
  url: string;
};

export const Columns: FC<ColumnsProps> = ({ url }) => {
  const { columns, isLoading, error } = useGetColumns(url);

  if (isLoading) {
    return <div>Loading</div>;
  }

  if (error) {
    return <div>{error.message}</div>;
  }

  return (
    <div>
      {(Object.values(columns) || []).map(({ id, color, isDefault, name, pullRequests }) => (
        <div key={id} style={{ border: `2px solid #${color}` }}>
          <div>{name}</div>
          <div style={{ border: '1px solid #000', margin: '20px' }}>
            {pullRequests.map(({ id, title, created_at, html_url, user }) => (
              <div key={id} style={{ border: '1px solid red', margin: '10px' }}>
                <a href={html_url}>
                  <div>{title}</div>
                  <div>{created_at}</div>
                  <div>{user?.login}</div>
                </a>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};
