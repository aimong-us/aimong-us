import React, { useState, useEffect } from 'react';

const Login = () => {
  return (
    <div>
      <input placeholder="username"></input>
      <input placeholder="password"></input>
      <button>Login</button>
      <hr />
      <p>Don't have an account?</p>
      <button>Signup</button>
    </div>
  );
};

export default Login;
