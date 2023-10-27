import React, { useState } from 'react';
import '../CSS/Header.css';

const Header: React.FC = () => {
   return (
    <div className="title">
      <h1><span className="name">Stratasys</span></h1>
      <button className="logout">logout</button>
    </div>

  );
};

export default Header;