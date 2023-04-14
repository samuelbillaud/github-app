import { useState } from 'react';
import { container, button } from './App.css';

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className={container}>
      <div>
        <button className={button} onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
      </div>
    </div>
  );
}

export default App;
