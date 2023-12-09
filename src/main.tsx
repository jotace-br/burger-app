import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { AppRouter } from './app-router.tsx';
import { WebSettingsProvider } from './theme-provider.tsx';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <WebSettingsProvider>
      <AppRouter />
    </WebSettingsProvider>
  </React.StrictMode>
);
