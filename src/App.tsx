import React from "react";
import "./App.css";
import { Navigate, Route, Routes } from "react-router-dom";
import Login from "./Components/Login";
import Dashboard from "./Components/Dashboard";
import Analytics from "./Components/Analytics/Analytics";


const App: React.FC = () => {
  return (
    <div>
      <Routes>
        <Route path="/dashboard" Component={Dashboard} />
        <Route path="/login" Component={Login} />
      </Routes>
    </div>
  );
};

export default App;
