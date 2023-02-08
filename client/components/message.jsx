import React, { useState } from 'react';

const Message = (props) => {
  const [clicked, setClicked] = useState(false);
  const [message_id] = useState(props.id);
  const [sender_id] = useState(props.sender_id);
  const { dateTime } = props;
  const date = new Date(dateTime).toLocaleDateString();
  const time = new Date(dateTime).toLocaleTimeString();
  return (
    <div
      onClick={() => {
        setClicked(true);
        console.log('message id:', message_id);
        console.log('sender_id:', sender_id);
      }}
      className="message"
    >
      <span className="message-user">anonymous crewmate</span>
      <span className="message-message">{props.message}</span>
      <span className="message-timestamp">
        {date} @ {time}
      </span>
    </div>
  );
};

export default Message;
