import Select from "react-select";
import { dropDownStyles } from "../../common";
import { useQuery } from "react-query";
import axios from "axios";
import { GetJobLogData_QUERY } from "../../Services/Queries";
import { useEffect, useState } from "react";

function JobLogsInfo({ deviceId }: any) {
  const [joblogs, setJoblogs] = useState([]);

  //  useEffect(() => {
  //    refetch();
  //  }, [deviceId]);

  const { data, isLoading, error, refetch } = useQuery(
    "getLogJobData",
    () => {
      return axios({
        url: process.env.REACT_APP_API_URL,
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: localStorage.getItem("authToken"),
        },
        data: {
          query: GetJobLogData_QUERY({
            filterObject: {
              device_id: deviceId,
            },
          }),
        },
      }).then((response) => {
        if (response.status >= 400) {
          throw new Error("Error fetching data");
        } else {
          const jobLogsList = response.data.data.getJoblogData;
          setJoblogs(jobLogsList);
        }
      });
    },
    { enabled: false }
  );

  return (
    <div className="job-logs-container flex-1 border-2 border-sky-500 bg-slate-50 rounded-md h-full w-full ml-2 p-4">
      <div className="device-card-heading flex justify-between">
        <h1 className="text-sky-600 font-semibold text-2xl mb-2">Job Logs</h1>
        <div className="flex justify-around">
          <Select styles={dropDownStyles} className="mr-2" />
          <Select styles={dropDownStyles} className="mr-2" />
          <Select styles={dropDownStyles} />
        </div>
      </div>
      <div className="table-container mt-2 bg-white border-2 border-slate-200 rounded-md h-1/6 px-4 py-2 bg-slate-100">
        <ul className="flex justify-between">
          <li className="">Log ID</li>
          <li>Device ID</li>
          <li>User ID</li>
          <li>Start Date</li>
          <li>End Date</li>
          <li>Incident Type</li>
        </ul>
      </div>
      <div className="table-info mt-2 bg-white border-2 border-slate-200 rounded-md h-40 px-4 py-2 bg-white scroll-smooth overflow-auto no-scrollbar">
        {joblogs.length ? (
          joblogs.map((log: any, index: number) => (
            <ul
              key={index}
              className="flex justify-between border-b-2 border-slate-100 p-2"
            >
              <li>{log?.log_id}</li>
              <li>{log?.job_id}</li>
              <li>{log?.start_date}</li>
              <li>{log?.end_date}</li>
              <li>{log?.incident_type}</li>
            </ul>
          ))
        ) : (
          <div className="flex justify-center items-center font-semibold mt-16">
            No Data to Display!
          </div>
        )}
      </div>
    </div>
  );
}

export default JobLogsInfo;
