import { useState } from 'react';
import axios from 'axios';

const API_URL = "http://localhost:8080/api/auth/";

const AuthService = () => {
  const login = async (username:string, password:string) => {
    try {
      const response = await axios.post(API_URL + 'signin', { username, password });
      if (response.data.accessToken) {
        localStorage.setItem('user', JSON.stringify(response.data));
      }
      return response.data;
    } catch (error) {
      throw error;
    }
  };

  const logout = () => {
    localStorage.removeItem('user');
  };

  const getCurrentUser = () => {
    const userStr = localStorage.getItem('user');
    if (userStr) return JSON.parse(userStr);
    return null;
  };

  return {
    login,
    logout,
    getCurrentUser,
  };
};

export default AuthService;