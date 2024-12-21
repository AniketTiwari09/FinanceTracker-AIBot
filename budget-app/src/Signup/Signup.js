import React, { useState } from 'react';
import axios from 'axios';

const Signup = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSignup = async (e) => {
    e.preventDefault();
    if (!username || !password) {
      setError('Please enter a valid username and password.');
      return;
    }
  
    try {
      const response = await axios.post('http://localhost:3002/signup', {
        username,
        password,
      });
  
      if (response.status === 200) {
        window.location.href = '/login';
      } else {
        setError(response.data.message || 'Unexpected error. Please try again.');
      }
    } catch (error) {
      console.error('Signup error:', error.response || error);
      setError(error.response?.data?.message || 'Signup failed. Please try again.');
    }
  };
  

  return (
    <div>
      <h2>Signup</h2>
      <form onSubmit={handleSignup}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit" disabled={isLoading}>
          {isLoading ? 'Signing Up...' : 'Signup'}
        </button>
        {error && <p>{error}</p>}
      </form>
    </div>
  );
};

export default Signup;
