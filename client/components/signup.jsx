import React, { useState, useEffect } from 'react';

const Signup = () => {

  // Set inital states
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
    
  // Toggle password visibility
  const passwordVisibility = () => {
    const passwordInput = document.getElementById('passwordInput');
    if (passwordInput.type === 'password') {
      passwordInput.type = 'text';
    } else {
      passwordInput.type = 'password';
    }
  };

  // On button click, GET request to check if username or email is in database
  // If not, send POST request of all user information as entry to database
  const handleSignUp = async () => {
    try {
      const userExists = await fetch('/api/signup', {
        // set req.body to contain the username and email
      }) // to be edited
      // if successfully retrieve from database, return "A user with this email or username already exists"
    }
  };

  // Redirect to login page, check if function necessary
  
  return (
    <div className="signup">
      <h2>SIGN UP</h2>

      <div>
        <h3>Username</h3>
        <input type="text" />
      </div>

      <div>
        <h3>Email</h3>
        <input type="text" />
      </div>

      <div>
        <h3>First Name</h3>
        <input type="text" />
      </div>

      <div>
        <h3>Last Name</h3>
        <input type="text" />
      </div>

      <div>
        <h3>
          Avatar <span>(optional)</span>
        </h3>
        <input type="text" />
        <h5>Please upload an image link</h5>
      </div>

      <div>
        <h3>Password</h3>
        <input type="text" id="passwordInput" />
        input
        <input type="checkbox" onclick={passwordVisibility}>
          Show Password
        </input>
      </div>

      <button onclick={handleSignUp}>SIGN UP</button>

      <hr />

      <h4>
        Already a user? <a href="http://localhost:8080/login">LOGIN</a>
      </h4>
    </div>
  );
};

export default Signup;
