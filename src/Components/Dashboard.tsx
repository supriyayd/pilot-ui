import React, { useState } from 'react';
import Menubar from './Menubar';
import Header from './Header';
import { Main } from './Main';
import '../CSS/dashboard.css';

const Dashboard: React.FC = () => {
 


        const styles = {
            contentDiv: {
              display: "flex",
            },
            contentMargin: {
              marginLeft: "10px",
              width: "100%",
            },
          };


  return (

      <><div>
          <Header />
      </div>
      <div className="container">
      <div className="left-component"><Menubar /></div> 
  <div className="right-component"><Main/></div> 
  </div>
              
          </>
 
  );
};

export default Dashboard;