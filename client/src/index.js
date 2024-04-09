import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { MaterialUIControllerProvider } from './context/index.js';
import {SnackbarProvider} from "notistack"

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
      <MaterialUIControllerProvider>
        <SnackbarProvider maxSnack={5}>
            <App />
        </SnackbarProvider>
      </MaterialUIControllerProvider>
  </React.StrictMode>
);
