import React, { useState } from 'react';

const Signup = () => {
  // Set state
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Handler to set state of controlled input elements
  const handleInput = (e) => {
    if (e.target.name === 'username') setUsername(e.target.value);
    if (e.target.name === 'email') setEmail(e.target.value);
    if (e.target.name === 'password') setPassword(e.target.value);
  };

  // Handler to send request to to create user
  // TODO: error handling based on response
  const handleSubmit = async () => {
    try {
      const response = await fetch('/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username,
          email,
          password,
        }),
      });
      if (response.status === 200) {
        window.location = '/';
      } else {
        const error = response.json();
        throw new Error(error.message);
      }
    } catch (err) {
      console.log(err);
    }
  };

  // Render component
  return (
    <div className="login-container">
      <div className="login">
        <input
          name="username"
          placeholder="username"
          value={username}
          onChange={handleInput}
        />
        <input
          name="email"
          placeholder="email"
          value={email}
          onChange={handleInput}
        />
        <input
          name="password"
          placeholder="password"
          value={password}
          onChange={handleInput}
        />
        <button onClick={handleSubmit}>Sign up</button>
        <hr />
        <a href="/login">Back to login</a>
      </div>
    </div>
  );
};

export default Signup;
