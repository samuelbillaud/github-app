import { FC } from 'react';

import { spinnerContainer, loadingSpinner } from './Spinner.css';

export const Spinner: FC = () => (
  <div className={spinnerContainer} data-testid="spinner">
    <div className={loadingSpinner}></div>
  </div>
);
