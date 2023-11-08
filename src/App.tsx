import React from "react";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import Login from "./Components/Login";
import Dashboard from "./Components/Dashboard";
import { QueryClient, QueryClientProvider } from "react-query";

const App: React.FC = () => {
  const queryClient = new QueryClient();

  return (
    <div>
      <QueryClientProvider client={queryClient}>
        <Routes>
          <Route path="/dashboard" Component={Dashboard} />
          <Route path="/login" Component={Login} />
        </Routes>
      </QueryClientProvider>
    </div>
  );
};

export default App;
