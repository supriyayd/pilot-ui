import React from "react";
import Analytics from "./Analytics/Analytics";
import Operations from "./Operation/Operations";

export const Main: React.FC = () => {
  return (
    <>
      <Operations />
      <Analytics />
    </>
  );
};

export default Main;
