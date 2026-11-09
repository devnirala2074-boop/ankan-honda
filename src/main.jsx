import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';

import './styles/global.css';
import './styles/navbar.css';
import './styles/home.css';
import './styles/vehicles.css';
import './styles/forms.css';

const routerBasename =
  (import.meta.env.BASE_URL || '/').replace(/\/+$/, '') || '/';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter basename={routerBasename}>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
