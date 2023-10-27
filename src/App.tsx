import React from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter,Route, Routes } from 'react-router-dom';
import Login from './Components/Login';
import Menubar from './Components/Menubar';
import Dashboard from './Components/Dashboard';
import Operatoins from './Components/Operatoins';
import Analytics from './Components/Analytics';

const App: React.FC = () => {
  return (
    <div>
      <Routes>
        <Route path="/dashboard" Component={Dashboard} />
        <Route path="/Operatoins" Component={Operatoins} />
        <Route path="/Analytics" Component={Analytics} />
        <Route path="/login" Component={Login} />
      </Routes>
    </div>
  );
};

export default App;
