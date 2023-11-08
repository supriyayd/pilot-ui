import React, { useState } from "react";
import AuthService from "../Services/AuthService";
import { useNavigate } from "react-router-dom";

const Login: React.FC = () => {
  const authService = AuthService();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [loader, setLoader] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e: any) => {
    setLoader(true);
    e.preventDefault();
    try {
      const response = await authService.login(username, password);
      if (response.authToken) {
        navigate("/Dashboard");
        setErrorMessage("");
      } else {
        setErrorMessage("Login failed. Please check your credentials.");
      }
    } catch (error) {
      setLoader(false);
      console.error("Error during login:", error);
      setErrorMessage("An error occurred during login.");
    }
  };

  return (
    <form
      className="flex justify-center items-center h-screen w-full"
      onSubmit={handleLogin}
    >
      <div className="flex-col">
        <div className="my-4">
          <label>Username :</label>
          <input
            className="border-2 border-slate-200 rounded-md ml-2 outline-none h-10 p-2"
            type="text"
            value={username}
            required
            onChange={(event) => { 
              setErrorMessage("");
              setUsername(event.target.value);}}
          />
        </div>
        <div className="my-4">
          <label>Password :</label>
          <input
            type="password"
            className="border-2 border-slate-200 rounded-md ml-3 outline-none h-10 p-2"
            value={password}
            required
            onChange={(event) => setPassword(event.target.value)}
          />
        </div>
        <div className="flex justify-center ml-16">
          <button className="px-4 py-2 rounded-md bg-blue-500 text-white w-32 outline-none">
            {loader ? (
              <div className="loader-2 center ml-8">
                <span></span>
              </div>
            ) : (
              "Login"
            )}
          </button>
        </div>
        {errorMessage && <span className="ml-16 text-red-500">{errorMessage}</span>}
      </div>
    </form>
  );
};

export default Login;