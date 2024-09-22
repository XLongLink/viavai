import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './app';


/* Add the application to the root */
const container = document.getElementById('root');
const root = createRoot(container);
root.render(<App />);