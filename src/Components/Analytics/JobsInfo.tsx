import Select from "react-select";
import { dropDownStyles } from "../../common";

function JobsInfo() {
  const dummyData = [
    {
      device_id: 1,
      network_id: 101,
      status: "IDLE",
      temperature: 25,
      humidity: 25,
    },
    {
      device_id: 1,
      network_id: 101,
      status: "IDLE",
      temperature: 25,
      humidity: 25,
    },
    {
      device_id: 1,
      network_id: 101,
      status: "IDLE",
      temperature: 25,
      humidity: 25,
    },
    {
      device_id: 1,
      network_id: 101,
      status: "IDLE",
      temperature: 25,
      humidity: 25,
    },
    {
      device_id: 1,
      network_id: 101,
      status: "IDLE",
      temperature: 25,
      humidity: 25,
    },
    {
      device_id: 1,
      network_id: 101,
      status: "IDLE",
      temperature: 25,
      humidity: 25,
    },
    {
      device_id: 1,
      network_id: 101,
      status: "IDLE",
      temperature: 25,
      humidity: 25,
    },
    {
      device_id: 1,
      network_id: 101,
      status: "IDLE",
      temperature: 25,
      humidity: 25,
    },
  ];
  return (
    <div className="jobs-info-container flex-1 border-2 rounded-md h-full border-sky-500 bg-slate-50 w-full ml-2 p-4">
      <div className="device-card-heading flex justify-between">
        <h1 className="text-sky-600 font-semibold text-2xl mb-2">
          Recent Jobs
        </h1>
        <div className="flex justify-around">
          <Select styles={dropDownStyles} />
        </div>
      </div>
      <div className="table-container mt-2 bg-white border-2 border-slate-200 rounded-md h-1/6 px-4 py-2 bg-slate-100">
        <ul className="flex justify-between">
          <li className="">Device ID</li>
          <li>Network ID</li>
          <li>Status</li>
          <li>Temperature</li>
          <li>Humidity</li>
        </ul>
      </div>
      <div className="table-info mt-2 bg-white border-2 border-slate-200 rounded-md h-40 px-4 py-2 bg-white scroll-smooth overflow-auto no-scrollbar">
        {dummyData.map((log: any) => (
          <ul className="flex justify-between border-b-2 border-slate-100 p-2">
            <li>{log.device_id}</li>
            <li>{log.network_id}</li>
            <li>{log.status}</li>
            <li>{log.temperature}</li>
            <li>{log.humidity}</li>
          </ul>
        ))}
      </div>
    </div>
  );
}

export default JobsInfo;
