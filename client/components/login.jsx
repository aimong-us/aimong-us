import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();

  const handleInput = (e) => {
    if (e.target.name === 'username') setUsername(e.target.value);
    if (e.target.name === 'password') setPassword(e.target.value);
  };

  const handleSubmit = async () => {
    try {
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username,
          password,
        }),
      });

      if (response.status === 302) return navigate('/');
      else throw new Error('failed to validate credentials');
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="login-container">
      <div className="login">
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
        <p>Sign up!</p>
      </div>
    </div>
  );
};

export default Login;
