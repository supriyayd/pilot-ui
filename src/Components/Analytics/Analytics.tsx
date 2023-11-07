import Select from "react-select";
import { DropDownOptions } from "../../types";
import { dropDownStyles } from "../../common";
import DeviceInfo from "./DeviceInfo";
import JobsInfo from "./JobsInfo";
import DeviceLogsInfo from "./DeviceLogsInfo";
import JobLogsInfo from "./JobLogsInfo";
import { useEffect, useState } from "react";

function Analytics({ networks }: any) {
  const networksList: Array<DropDownOptions> = networks?.map(
    (network: any) => ({ label: network.name, value: network.id })
  ) || [{ value: 1, label: "Network 1" }];

  const [selectedNetwork, setSelectedNetwork] = useState("");


  useEffect(() => {
    // const 
  }, [])


  return (
    <div className="flex-column p-4  ml-8 bg-sky-50 rounded-sm m-4">
      <div className="dropdown-container flex h-16 p-4 rounded-md">
        <div className="flex items-center">
          <label className="mr-2">Network ID: </label>
          <Select options={networksList} styles={dropDownStyles} />
        </div>
        <div className="flex ml-8 items-center">
          <label className="mr-2">Device ID: </label>
          <Select styles={dropDownStyles} />
        </div>
      </div>
      <div className="info-container flex h-80 p-4 rounded-md mt-2">
        <DeviceInfo />
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
