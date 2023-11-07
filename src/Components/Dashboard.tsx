import React, { useEffect, useState } from "react";
import Menubar from "./Menubar";
import Header from "./Header";
import "../CSS/dashboard.css";
import { pageTypes } from "../types";
import Operations from "./Operations";
import Analytics from "./Analytics/Analytics";

const Dashboard: React.FC = () => {
  const [currentComponent, setCurrentComponent] = useState(
    pageTypes.OPERATIONS
  );

  const [networks, setNetworks] = useState<Array<any>>([]);

  useEffect(() => {
  }, [currentComponent]);

  return (
    <div className="h-screen">
      <div>
        <Header />
      </div>
      <div className="container">
        <div className="left-component h-full">
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
