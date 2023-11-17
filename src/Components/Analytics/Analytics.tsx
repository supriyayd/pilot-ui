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
  const [selectedDevice, setSelectedDevice] = useState(0);
  const [devicesInfo, setDevicesInfo] = useState([]);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  useEffect(() => {
    refetch();
  }, [selectedDevice]);

  const { data, isLoading, error, refetch } = useQuery(
    "getDeviceData",
    () => {
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
        },
      }).then((response) => {
        if (response.status >= 400) {
          throw new Error("Error fetching data");
        } else {
          const devicesList = response.data.data.getAllDevices;
          console.log(devicesList);
          return setDevicesInfo(devicesList);
        }
      });
    },
    { enabled: false }
  );

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
              label: JSON.parse(device?.device_info)?.name,
              value: JSON.parse(device?.device_info)?.device_id,
            }))}
            onChange={(e: any) => setSelectedDevice(e.value)}
          />
        </div>
        <div className="ml-8 flex items-center">
          <label className="mr-2">Start Date: </label>
          <input
            type="datetime-local"
            className="p-2 border-2 rounded-md"
            max={new Date().toISOString().split(".")[0]}
            onChange={(e: any) => setStartDate(e.target.value)}
          />
        </div>
        <div className="ml-8 flex items-center">
          <label className="mr-2">End Date: </label>
          <input
            type="datetime-local"
            className="p-2 border-2 rounded-md"
            max={new Date().toISOString().split(".")[0]}
            onChange={(e: any) => setEndDate(e.target.value)}
          />
        </div>
        <button className="bg-red p-2" onClick={() => {}}>
          Filter
        </button>
      </div>
      {startDate && endDate ? (
        <div className="logs-container flex h-80 p-4 rounded-md">
          <DeviceLogsInfo
            deviceId={selectedDevice}
            startDate={startDate}
            endDate={endDate}
          />
          <JobsInfo
            deviceId={selectedDevice}
            startDate={startDate}
            endDate={endDate}
          />
        </div>
      ) : (
        <>
          <div className="info-container flex h-80 p-4 rounded-md mt-2">
            <DeviceInfo
              deviceInfo={
                devicesInfo.filter(
                  (device: any) =>
                    JSON.parse(device.device_info)?.device_id === selectedDevice
                )[0]
              }
            />
            <JobsInfo deviceId={selectedDevice} />
          </div>
          <div className="logs-container flex h-80 p-4 rounded-md">
            <DeviceLogsInfo deviceId={selectedDevice} />
            <JobLogsInfo deviceId={selectedDevice} />
          </div>
        </>
      )}
    </div>
  );
}

export default Analytics;
