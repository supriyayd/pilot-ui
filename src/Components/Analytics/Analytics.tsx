import Select from "react-select";
import { DropDownOptions } from "../../types";
import { dropDownStyles } from "../../common";
import DeviceInfo from "./DeviceInfo";
import JobsInfo from "./JobsInfo";
import DeviceLogsInfo from "./DeviceLogsInfo";
import JobLogsInfo from "./JobLogsInfo";
import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import axios from "axios";
import { GetAllDevice_QUERY } from "../../Services/Queries";

function Analytics({ networks }: any) {
  const networksList: Array<DropDownOptions> = networks?.map(
    (network: any) => ({ label: network.name, value: network.network_id })
  ) || [{ value: 1, label: "Network 1" }];

  const [selectedNetwork, setSelectedNetwork] = useState(null);
  const [selectedDevice, setSelectedDevice] = useState(null);
  const [devicesInfo, setDevicesInfo] = useState([]);

  const { data, isLoading, error } = useQuery("getDeviceData", () => {
    return axios({
      url: process.env.REACT_APP_API_URL,
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("authToken"),
      },
      data: {
        query: GetAllDevice_QUERY({
          filterObject: {
            network_id: selectedNetwork,
          },
        }),
        // enabled: selectedNetwork === newt
      },
    }).then((response) => {
      if (response.status >= 400) {
        throw new Error("Error fetching data");
      } else {
        const devicesList = response.data.data.getAllDevices;
        return setDevicesInfo(devicesList);
      }
    });
  });

  return (
    <div className="flex-column p-4  ml-8 bg-sky-50 rounded-sm m-4">
      <div className="dropdown-container flex h-16 p-4 rounded-md">
        <div className="flex items-center">
          <label className="mr-2">Network ID: </label>
          <Select
            options={networksList}
            styles={dropDownStyles}
            onChange={(e: any) => setSelectedNetwork(e.value)}
          />
        </div>
        <div className="flex ml-8 items-center">
          <label className="mr-2">Device ID: </label>
          <Select
            styles={dropDownStyles}
            options={devicesInfo.map((device: any) => ({
              label: device?.name,
              value: device?.device_id,
            }))}
            onChange={(e: any) => setSelectedDevice(e.value)}
          />
        </div>
      </div>
      <div className="info-container flex h-80 p-4 rounded-md mt-2">
        <DeviceInfo deviceInfo={selectedDevice}/>
        <JobsInfo />
      </div>
      <div className="logs-container flex h-80 p-4 rounded-md">
        <DeviceLogsInfo />
        <JobLogsInfo />
      </div>
    </div>
  );
}

export default Analytics;
