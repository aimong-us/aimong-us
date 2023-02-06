import React from 'react';
import { createRoot } from 'react-dom/client';
import Login from './components/login.jsx';
import './stylesheets/login.scss';

const root = createRoot(document.getElementById('root'));
root.render(<Login />);
