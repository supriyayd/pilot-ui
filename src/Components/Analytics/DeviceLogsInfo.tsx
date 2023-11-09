import Select from "react-select";
import { dropDownStyles } from "../../common";
import { statusColor } from "../../types";
import { useQuery } from "react-query";
import axios from "axios";
import { GetDeviceLogs_Query } from "../../Services/Queries";
import { useEffect, useState } from "react";

function DeviceLogsInfo({ deviceId }: any) {
  const [devicelogs, setDevicelogs] = useState([]);

  // useEffect(() => {
  //   refetch();
  // }, [deviceId]);

  const { data, isLoading, error, refetch } = useQuery(
    "getDevicelogsData",
    () => {
      return axios({
        url: process.env.REACT_APP_API_URL,
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: localStorage.getItem("authToken"),
        },
        data: {
          query: GetDeviceLogs_Query({
            filterObject: {
              device_id: deviceId,
            },
          }),
        },
      }).then((response) => {
        if (response.status >= 400) {
          throw new Error("Error fetching data");
        } else {
          const deviceLogsList = response.data.data.getDevicelogsData;
          console.log(response.data);
          return setDevicelogs(deviceLogsList);
        }
      });
    },
    { enabled: false }
  );

  return (
    <div className="device-logs-container flex-1 border-sky-500 border-2 bg-slate-50 rounded-md h-full w-full p-4">
      <div className="device-card-heading flex justify-between">
        <h1 className="text-sky-600 font-semibold text-2xl mb-2">
          Device Logs
        </h1>
        <div className="flex justify-around">
          <Select styles={dropDownStyles} />
        </div>
      </div>
      <div className="table-container mt-2 bg-white border-2 border-slate-200 rounded-md h-1/6 px-4 py-2 bg-slate-100">
        <ul className="flex justify-between">
          <li>Log ID</li>
          <li>Device ID</li>
          <li>Occured At</li>
          <li>Status</li>
          <li>Change Description</li>
        </ul>
      </div>
      <div className="table-info mt-2 bg-white border-2 border-slate-200 rounded-md h-40 px-4 py-2 bg-white scroll-smooth overflow-auto no-scrollbar">
        <>
          {devicelogs.length ? (
            devicelogs?.map((log: any, index: number) => (
              <ul
                key={index}
                className="flex justify-between border-b-2 border-slate-100 p-2"
              >
                <li>{log?.log_id}</li>
                <li>{log?.device_id}</li>
                <li>{log?.occurred_at}</li>
                <li
                  className={`text-${statusColor[log?.status]}-200 font-medium`}
                >
                  {log?.status}
                </li>
                <li>{log?.change_description}</li>
              </ul>
            ))
          ) : (
            <div className="flex justify-center items-center mt-16 font-semibold">
              No Data to Display!
            </div>
          )}
        </>
      </div>
    </div>
  );
}

export default DeviceLogsInfo;
