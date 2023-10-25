import React from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter,Route } from 'react-router-dom';
import Login from './Components/Login';

const App: React.FC = () => {
  return (
    <div>
      <Login />
    </div>
  );
};

export default App;
