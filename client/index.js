import React from 'react';
import { createRoot } from 'react-dom/client';
import Chat from './components/chat.jsx';
import './stylesheets/chat.scss';

// import { io } from 'socket.io-client';
// const socket = io();

const root = createRoot(document.getElementById('root'));
root.render(<Chat />);
