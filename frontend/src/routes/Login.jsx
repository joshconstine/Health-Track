import React, { useState } from 'react';
import { Link, useOutletContext } from 'react-router-dom';
import './Login.css'; // Import the CSS file

const Login = () => {
  const { setIsLoggedIn } = useOutletContext(); // Get setIsLoggedIn from context
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent page reload on form submission

    const loginData = { username, password };

    try {
      const response = await fetch('http://localhost:4000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: "include", // Ensure cookies are sent
        body: JSON.stringify(loginData),
      });

      if (!response.ok) {
        // Handle non-200 responses
        const errorData = await response.json();
        console.error('Error:', errorData);
        alert(errorData.error || 'Login failed');
        return;
      }

      const data = await response.json();
      console.log('Success:', data);
      setUsername("");
      setPassword("");

      // Perform further actions (e.g., navigate, store token)
      alert(`Welcome, ${data.first_name} ${data.last_name}!`);
      setIsLoggedIn(true); // Update login state in the parent
    } catch (error) {
      console.error('Fetch error:', error);
      alert('An error occurred while logging in. Please try again.');
    }
  };

  return (
    <div className='login-container'>
      <h1 className='login-header'>Login</h1>
      <form onSubmit={handleSubmit} className='login-form'>
        <div className='login-input-group'>
          <label htmlFor='username' className='login-label'>
            Username:
          </label>
          <input
            type='text'
            id='username'
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className='login-input'
            required
          />
        </div>
        <div className='login-input-group'>
          <label htmlFor='password' className='login-label'>
            Password:
          </label>
          <input
            type='password'
            id='password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className='login-input'
            required
          />
        </div>
        <button type='submit' className='login-button'>
          Login
        </button>
        <Link className='link' to='/register'>
          <p className='register-link'>Register?</p>
        </Link>
      </form>
    </div>
  );
};

export default Login;
