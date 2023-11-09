import React, { useEffect, useState } from "react";
import Menubar from "./Menubar";
import Header from "./Header";
import "../CSS/dashboard.css";
import { pageTypes } from "../types";
import Operations from "./Operations";
import Analytics from "./Analytics/Analytics";
import { useQuery } from "react-query";
import axios from "axios";
import { GetAllNetwork_QUERY } from "../Services/Queries";

const Dashboard: React.FC = () => {
  const [currentComponent, setCurrentComponent] = useState(
    pageTypes.OPERATIONS
  );

  const [networks, setNetworks] = useState<Array<any>>([]);

  useEffect(() => {
    refetch();
  }, [])

  const { data, isLoading, error, refetch } = useQuery("getAllNetworks", () => {
    return axios({
      url: process.env.REACT_APP_API_URL,
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("authToken"),
      },
      data: {
        query: GetAllNetwork_QUERY({ filterObject: { user_id: 1 } }),
        enabled: !networks.length
      },
    }).then((response) => {
      if (response.status >= 400) {
        throw new Error("Error fetching data");
      } else {
        const networksList = response.data.data.getAllNetworks;
        return setNetworks(networksList)
      }
    });
  }, {enabled: false});

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
          {currentComponent === pageTypes.ANALYTICS && (
            <Analytics networks={networks} />
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
