import React, { useState } from "react";
import Menubar from "./Menubar";
import Header from "./Header";
import { Main } from "./Main";
import "../CSS/dashboard.css";
import { pageTypes } from "../types";
import Operations from "./Operations";
import Analytics from "./Analytics/Analytics";

const Dashboard: React.FC = () => {
  const [currentComponent, setCurrentComponent] = useState(
    pageTypes.OPERATIONS
  );



  return (
    <div className="h-screen">
      <div>
        <Header />
      </div>
      <div className="container h-full">
        <div className="left-component">
          <Menubar setCurrentComponent={setCurrentComponent} />
        </div>
        <div className="right-component">
          {currentComponent === pageTypes.OPERATIONS && <Operations />}
          {currentComponent === pageTypes.ANALYTICS && <Analytics />}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
