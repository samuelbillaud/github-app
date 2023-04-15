import { ChangeEvent, useState } from 'react';

import { useGetColumns } from './hooks';

import { container } from './App.css';

function App() {
  const [url, setUrl] = useState('https://github.com/python/cpython');
  const { columns, isLoading, error } = useGetColumns(url);

  const onBlur = (event: ChangeEvent<HTMLInputElement>) => {
    const {
      target: { value },
    } = event;

    setUrl(value);
  };

  if (isLoading) {
    return <div>Loading</div>;
  }

  if (error) {
    return <div>{error.message}</div>;
  }

  return (
    <div className={container}>
      <div>Mergic</div>
      <input type="text" onBlur={onBlur} placeholder="Enter repo url" defaultValue={url} />
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
    </div>
  );
}

export default App;
