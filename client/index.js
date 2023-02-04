import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './app.jsx';

// TODO
// - update messages useState to set initial state to empty array once backend setup
// - update message properties for messages list generation once backend setup
// - update fetch request setInterval callback function if needed based on backend setup

const root = createRoot(document.getElementById('root'));
root.render(<App />);
