import React, { useState } from 'react';
import AuthService from '../Services/AuthService';
import { Navigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import Dashboard from './Dashboard';
import { useNavigate  } from 'react-router-dom';

const Login: React.FC = () => {
    const authService = AuthService();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();
  
  const handleLogin = async (e: any) => {
    e.preventDefault();
    try {
      const response = await authService.login(username, password);
      if (response.authToken) {
        navigate("/Dashboard");
        setMessage('');
      } else {
        setMessage('Login failed. Please check your credentials.');
      }
    } catch (error) {
      console.error('Error during login:', error);
      setMessage('An error occurred during login.');
    }
  }

  return (
<form onSubmit={handleLogin}>
        <div>
      <label>
        Username : 
      </label>
      <input type="text" value={username} required onChange={(event) => setUsername(event.target.value)} />
      </div>
      <div>
      <label>
        Password : 
      </label>
      <input type="password" value={password} required onChange={(event) => setPassword(event.target.value)} />
      </div>
      <button>Login</button>
      <span>{message}</span>
      </form>
  );
};

export default Login;