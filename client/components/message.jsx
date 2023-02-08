import React, { useState } from 'react';

const Message = (props) => {
  const [clicked, setClicked] = useState(false);
  const [message_id] = useState(props.id);
  const [sender_id] = useState(props.sender_id);
  const { dateTime, user_id } = props;
  const date = new Date(dateTime).toLocaleDateString();
  const time = new Date(dateTime).toLocaleTimeString();

  const calcScore = (event) => {
    if (clicked) {
      return;
    } else {
      setClicked(true);
      // const message = document.getElementById(`${message_id}`);
      // console.dir(message);
      // message.style.backgroundColor = 'grey';
      // event.target.style.backgroundColor = 'grey';
      event.currentTarget.style.backgroundColor = 'grey';

      fetch('/check', {
        method: 'POST',
        Headers: {
          Accept: 'application.json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          sender_id,
          user_id,
        }),
        header: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      })
        .then((response) => {
          response.json();
        })
        .then((data) => {
          console.log(data);
        });
      console.log('user_id', user_id);
      console.log('message id:', message_id);
      console.log('sender_id:', sender_id);
    }
  };
  return (
    <div onClick={calcScore} className="message" id={message_id}>
      <span className="message-user">anonymous crewmate</span>
      <span className="message-message">{props.message}</span>
      <span className="message-timestamp">
        {date} @ {time}
      </span>
    </div>
  );
};

export default Message;
