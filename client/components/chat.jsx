import React, { useState, useEffect } from 'react';

const Chat = () => {
  // Set inital states
  const [messages, setMessages] = useState([]);
  const [messageInput, setMessageInput] = useState('');
  const [pollIntervalId, setPollIntervalId] = useState(null);

  // Handler to update state of controlled input
  const handleMessageInput = (e) => setMessageInput(e.target.value);

  // Handler to send POST request and create a new message
  const handleMessageSend = async () => {
    try {
      const response = await fetch('/api/messages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(messageInput),
      });
      if (response.status === 201) setMessageInput(''); // reset input value
      else {
        const error = await response.json();
        throw new Error(error.message);
      }
    } catch (err) {
      console.log(err);
    }
  };

  // On mount initialize setinterval to long poll api for messages and update state
  useEffect(() => {
    const intervalId = setInterval(async () => {
      try {
        const response = await fetch('/api/messages');
        if (response.status === 200) {
          const body = await response.json();
          setMessages(body.messages);
          setPollIntervalId(intervalId);
        } else {
          const error = response.json();
          throw new Error(error.message);
        }
      } catch (err) {
        console.log(err);
        clearInterval(pollIntervalId);
      }
    }, 1000);
  }, []);

  // Create list of message elements to render
  const messageElementList = messages.map((message) => {
    const dateTime = new Date(message.time);

    return (
      <div key={message.message_id} className="message">
        <span className="message-user">{message.sender_id}</span>
        <span className="message-message">{message.message}</span>
        <span className="message-timestamp">
          {dateTime.toLocaleTimeString()}
        </span>
      </div>
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
        ></input>
        <button onClick={handleMessageSend}>Send</button>
      </div>
    </div>
  );
};

export default Chat;
