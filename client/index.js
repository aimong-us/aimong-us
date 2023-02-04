import React from 'react';
import { createRoot } from 'react-dom/client';
import Chat from './components/chat.jsx';
import './stylesheets/chat.scss';

const root = createRoot(document.getElementById('root'));
root.render(<Chat />);
