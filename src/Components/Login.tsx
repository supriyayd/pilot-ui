import React, { useState } from 'react';
import AuthService from '../Services/AuthService';

const Login: React.FC = () => {
    const authService = AuthService();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  
  const handleLogin = async () => {
    try {
      const response = await authService.login(username, password);
      if (response.accessToken) {
        // Login successful, perform your desired actions here.
      } else {
        setMessage('Login failed. Please check your credentials.');
      }
    } catch (error) {
      console.error('Error during login:', error);
      setMessage('An error occurred during login.');
    }
  }

  return (
<div>
        <div>
      <label>
        Username : 
      </label>
      <input type="text" value={username} onChange={(event) => setUsername(event.target.value)} />
      </div>
      <div>
      <label>
        Password : 
      </label>
      <input type="password" value={password} onChange={(event) => setPassword(event.target.value)} />
      </div>
      <button onClick={handleLogin}>Login</button>
      </div>
  );
};

export default Login;