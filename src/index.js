import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

import { PublicClientApplication } from '@azure/msal-browser'
import { MsalProvider } from '@azure/msal-react'
import { msalconfig } from './config/authConfig.js';

const msalInstance = new PublicClientApplication(msalconfig)

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <MsalProvider instance={msalInstance}>
      <App />
    </MsalProvider>
  </React.StrictMode>
);

