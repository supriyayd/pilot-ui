import React, { useState } from 'react';
import Menubar from './Menubar';
import Header from './Header';
import MenuItemRoutes, { Main } from './Main';

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
      </div><div>
              <Menubar />
              <Main/>
          </div></>
 
  );
};

export default Dashboard;