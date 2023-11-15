import Select from "react-select";
import { dropDownStyles } from "../../common";
import { useQuery } from "react-query";
import axios from "axios";
import { GetJobLogData_QUERY } from "../../Services/Queries";
import { useEffect, useState } from "react";
import { deviceStatus, jobStatus } from "../../types";

function JobLogsInfo({ deviceId }: any) {
  const [joblogs, setJoblogs] = useState([]);
  const [enableClear, setEnableClear] = useState(false);

  useEffect(() => {
    if (deviceId) refetch();
  }, [deviceId]);

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

  function getJobIds(): any {
    const uniqueJobIds = joblogs
      .map((job: any) => job?.job_id)
      .filter((x, i, a) => a.indexOf(x) === i);

    return uniqueJobIds.map((id) => ({ value: id, label: id }));
  }

  function handleJobChange(e: any) {
    const jobId = e.value;
    const filteredJobLogs = joblogs.filter((log: any) => log?.job_id === jobId);
    setJoblogs(filteredJobLogs);
    if (!enableClear) setEnableClear(true);
  }

  function handleDateChange(e: any) {
    const startDate = e.value;
    const filteredDeviceLogs = joblogs?.filter(
      (log: any) =>
        new Date(parseInt(log?.start_date)).toLocaleDateString() === startDate
    );
    setJoblogs(filteredDeviceLogs);
    if (!enableClear) setEnableClear(true);
  }

  function handleStatusChange(e: any) {
    const status = e.value;
    const filteredJobLogs = joblogs.filter(
      (log: any) => log?.incident_type === status
    );
    setJoblogs(filteredJobLogs);
    if (!enableClear) setEnableClear(true);
  }

  function getUnique() {
    const timestamps = joblogs.map((log: any) =>
      new Date(parseInt(log?.start_date)).toLocaleDateString()
    );

    const result = Array.from(new Set(timestamps));
    return result.map((date: any) => ({
      value: date,
      label: date,
    }));
  }

  return (
    <div className="job-logs-container flex-1 border-2 border-sky-500 bg-slate-50 rounded-md h-full w-full ml-2 p-4">
      <div className="device-card-heading flex justify-between">
        <h1 className="text-sky-600 font-semibold text-2xl mb-2">Job Logs</h1>
        <div className="flex justify-around">
          <Select
            styles={dropDownStyles}
            className="mr-2 w-42"
            options={jobStatus.map((status) => ({
              value: status,
              label: status,
            }))}
            onChange={handleStatusChange}
            placeholder="Incident Type"
          />
          <Select
            styles={dropDownStyles}
            className="mr-2"
            options={getUnique()}
            placeholder="Start Date"
            onChange={handleDateChange}
          />
          <Select
            styles={dropDownStyles}
            placeholder="Job ID"
            onChange={handleJobChange}
            options={getJobIds()}
          />
          {enableClear && (
            <button
              className="ml-1 p-1 bg-red-500 rounded-md text-white h-10"
              onClick={() => {
                setEnableClear(false);
                refetch();
              }}
            >
              Clear
            </button>
          )}
        </div>
      </div>
      <div className="table-container mt-2 bg-white border-2 border-slate-200 rounded-md h-1/6 px-4 py-2 bg-slate-100">
        <ul className="flex justify-between">
          <li className="w-1/5">Log ID</li>
          <li className="w-1/5">Job ID</li>
          <li className="w-1/5">Start Date</li>
          <li className="w-1/5">End Date</li>
          <li className="w-1/5">Incident Type</li>
        </ul>
      </div>
      <div className="table-info mt-2 bg-white border-2 border-slate-200 rounded-md h-40 px-4 py-2 bg-white scroll-smooth overflow-auto no-scrollbar">
        {deviceId ? (
          joblogs.length ? (
            joblogs.map((log: any, index: number) => (
              <ul
                key={index}
                className="flex justify-between border-b-2 border-slate-100 p-2"
              >
                <li className="w-1/5">{log?.log_id}</li>
                <li className="w-1/5">{log?.job_id}</li>
                <li className="w-1/5">{`${new Date(
                  parseInt(log?.start_date)
                ).toLocaleDateString()}`}</li>
                <li className="w-1/5">
                  {log?.end_date
                    ? new Date(parseInt(log?.end_date)).toLocaleDateString()
                    : ""}
                </li>
                <li className="w-1/5">{log?.incident_type}</li>
              </ul>
            ))
          ) : (
            <div className="loader flex justify-center items-center mt-12 ml-64"></div>
          )
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
