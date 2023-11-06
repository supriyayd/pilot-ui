import React from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter,Navigate,Route, Routes } from 'react-router-dom';
import Login from './Components/Login';
import Menubar from './Components/Menubar';
import Dashboard from './Components/Dashboard';
import Operatoins from './Components/Operatoins';
import Analytics from './Components/Analytics/Analytics';


const App: React.FC = () => {
  return (
    <div>
      <Routes>
        {/* <Route path="/dashboard" Component={Dashboard} />
        <Route path="/dashboard/operatoins" Component={Operatoins} /> */}
        <Route path="/dashboard/analytics" Component={Analytics} />
        {/* <Route path="/login" Component={Login} />
        <Route path="/" element={<Navigate replace to="/login" />} /> */}
      </Routes>
    </div>
  );
};

export default App;
