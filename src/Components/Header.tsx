import React, { useState } from "react";
import "../CSS/Header.css";

const Header: React.FC = () => {
  return (
    <div className="title flex justify-center items-center h-100px">
      <img
      style={{marginLeft: "-30px"}}
        src="https://www.stratasys.co.in/siteassets/press-kit/ssys_logo_symbol_typemark_reg_rgb_png.png?v=48ee54"
        width={"200px"}
        height={"50px"}
        className="mt-2 mr-2"
      />
      <button
        onClick={() => {
          localStorage.removeItem("authToken");
          window.location.href = "/login";
        }}
        style={{marginTop: "-40px"}}
        className="logout px-8 py-2 rounded-lg bg-sky-600 text-white font-semibold"
      >
        Logout
      </button>
    </div>
  );
};

export default Header;
