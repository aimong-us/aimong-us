import React, { useState, useEffect } from 'react';
import { io } from 'socket.io-client';
import Message from './message';

const socket = io();

const Chat = () => {
  // Set initial states
  const [messages, setMessages] = useState([]);
  const [messageInput, setMessageInput] = useState('');
  const [pollIntervalId, setPollIntervalId] = useState(null);
  const [senderId, setSenderId] = useState(null);

  // Handler to update state of controlled input
  const handleMessageInput = (e) => setMessageInput(e.target.value);

  // Handler to create a new message
  const handleMessageSend = () => {
    socket.emit('send-message', { sender_id: senderId, message: messageInput });
    setMessageInput('');
  };

  // On mount fetch sender id
  useEffect(() => {
    socket.on('connect', () => console.log('websockets babyyyyyy'));

    const fetchAndSetSenderId = async () => {
      try {
        const response = await fetch('/api/user_id'); // update endpoint when ready
        const userId = await response.json();
        setSenderId(userId.user_id); // update properties to match up if needed
      } catch (err) {
        console.log(err);
      }
    };

    const fetchAllMessages = async () => {
      try {
        const response = await fetch('/api/messages');
        if (response.status === 200) {
          const body = await response.json();
          setMessages(body.messages);
        } else {
          const error = response.json();
          throw new Error(error.message);
        }
      } catch (err) {
        console.log(err);
      }
    };

    fetchAndSetSenderId();
    fetchAllMessages();
  }, []);

  socket.on('receive-message', (message) => {
    setMessages([...messages, message]);
  });

  // Create list of message elements to render
  const messageElementList = messages.map((message) => {
    return (
      <Message
        sender_id={message.sender_id}
        username={message.username}
        message={message.message}
        dateTime={message.time}
        key={message.message_id}
        id={message.message_id}
      />
    );
  });

  // Render chatroom elements
  return (
    <div className="chatroom">
      <h1>AI-mong Us</h1>

      <div className="messages">
        <div>{messageElementList}</div>
      </div>

      <div className="message-input">
        <input
          placeholder="Say something to the chat..."
          value={messageInput}
          onChange={handleMessageInput}
          onKeyDown={(e) => {
            if (e.key === 'Enter') handleMessageSend();
          }}
        ></input>
        <button onClick={handleMessageSend}>Send</button>
      </div>
    </div>
  );
};

export default Chat;
