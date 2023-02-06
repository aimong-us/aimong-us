import React, { useState } from 'react';

const Login = () => {
  // Set state
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  // Handler to set state of controlled input elements
  const handleInput = (e) => {
    if (e.target.name === 'username') setUsername(e.target.value);
    if (e.target.name === 'password') setPassword(e.target.value);
  };

  // Handler to send request to to verify login credentials
  // TODO: error handling based on response
  const handleSubmit = async () => {
    try {
      const response = await fetch('/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username,
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
        <h2>LOGIN</h2>
        <input
          name="username"
          placeholder="username"
          value={username}
          onChange={handleInput}
        ></input>
        <input
          name="password"
          placeholder="password"
          value={password}
          onChange={handleInput}
        ></input>
        <button onClick={handleSubmit}>Login</button>
        <hr />
        <p>Don't have an account?</p>
        <a href="/signup">Sign up!</a>
      </div>
    </div>
  );
};

export default Login;
