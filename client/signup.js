import React from 'react';
import { createRoot } from 'react-dom/client';
import Signup from './components/signup.jsx';
import './stylesheets/login.scss';

const root = createRoot(document.getElementById('root'));
root.render(<Signup />);
