import React, { useState, useEffect } from 'react';
import { io } from 'socket.io-client';
import Message from './message';
// import Leaderboard from './leaderboard';
import iconGenerator from '../helpers/icon_generator';

const socket = io();

const Chat = () => {
  // Set initial states
  const [messages, setMessages] = useState([]);
  const [leaderboard, setLeaderboard] = useState({
    1: '',
    2: '',
    3: '',
  });
  // console.log(leaderboard);
  const [messageInput, setMessageInput] = useState('');
  const [userId, setuserId] = useState('');
  const [userScore, setUserScore] = useState('');

  // Handler to update state of controlled input
  const handleMessageInput = (e) => setMessageInput(e.target.value);

  // Handler to create a new message
  const handleMessageSend = () => {
    socket.emit('send-message', { sender_id: userId, message: messageInput });
    setMessageInput('');
  };

  // On mount fetch sender id
  useEffect(() => {
    socket.on('connect', () => console.log('websockets babyyyyyy'));

    const fetchAndSetuserId = async () => {
      try {
        const response = await fetch('/api/user_id'); // update endpoint when ready
        const userId = await response.json();
        setuserId(userId.user_id);
        console.log(userId);
        fetchLeaderBoard(userId.user_id); // update properties to match up if needed
      } catch (err) {
        console.log(err);
      }
    };

    const fetchAllMessages = async () => {
      try {
        console.log('I have been ran');
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
    const fetchLeaderBoard = async (user_id) => {
      try {
        console.log('test from fetch leaderboard');
        const response = await fetch('/check', {
          method: 'POST',
          headers: {
            // 'Accept': 'application.json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            user_id,
          }),
        });

        const body = await response.json();
        console.log(body);
        const { first_place, second_place, third_place } = body;
        setLeaderboard({
          1: first_place,
          2: second_place,
          3: third_place,
        });
      } catch (e) {
        console.log(e);
      }
    };

    fetchLeaderBoard();
    fetchAndSetuserId();
    fetchAllMessages();
  }, []);

  socket.on('receive-message', (message) => {
    console.log('i never get ran');
    setMessages([...messages, message]);
  });

  const createLeaderboard = (leaderboard) => {
    const result = [];
    // console.log('i have been ran');
    let i = 1;
    for (const key in leaderboard) {
      result.push(
        <tr className="leaderboardentry" key={i++}>
          <td>{key}</td>
          <td>{leaderboard[key][0]}</td>
          <td>{leaderboard[key][1]}</td>
        </tr>
      );
    }
    return result;
  };

  // Create list of message elements to render
  const messageElementList = messages.map((message) => {
    const imgurl = iconGenerator();
    return (
      <Message
        image={imgurl}
        leaderboard={leaderboard}
        setUserScore={setUserScore}
        setLeaderboard={setLeaderboard}
        user_id={userId}
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
      <h1 className="header" onClick={handleAiMessage}>
        AI-mong Us
      </h1>

      <div className="leaderboard">
        <p>Leaderboard</p>
        <table>
          <tr>
            <th>Rank</th>
            <th>Username</th>
            <th>Score</th>
          </tr>
          {createLeaderboard(leaderboard)}
        </table>
      </div>

      <div className="messageboard">
        <div className="messages">{messageElementList}</div>

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
    </div>
  );
};

export default Chat;
