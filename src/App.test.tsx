import { render, screen } from '@testing-library/react';

import App from './App';

describe('App', () => {
  it('renders App', () => {
    render(<App />);

    expect(screen.getByText(/count/i)).toBeInTheDocument();
  });
});
