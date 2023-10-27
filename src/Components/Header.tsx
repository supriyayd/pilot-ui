import React, { useState } from 'react';
import '../CSS/Header.css';
import logout from '../Services/AuthService';

const Header: React.FC = () => {
   return (
    <div className="title">
      <h1><span className="name">Stratasys</span></h1>
      <button onClick={logout} className="logout">logout</button>
    </div>

  );
};

export default Header;