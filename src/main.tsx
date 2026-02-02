import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import App from './app.tsx';

import '@assets/fonts/fonts.css';
import './main.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
