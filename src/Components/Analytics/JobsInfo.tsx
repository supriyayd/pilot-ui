import Select from "react-select";
import { dropDownStyles } from "../../common";
import axios from "axios";
import { useQuery } from "react-query";
import { GetJobData_QUERY } from "../../Services/Queries";
import { useEffect, useState } from "react";

function JobsInfo({ deviceId, startDate, endDate }: any) {
  const [jobs, setJobs] = useState([]);
  const [enableClear, setEnableClear] = useState(false);
  const [defaultFilterValue, setDefaultFilterValue] = useState("");
  useEffect(() => {
    if (deviceId) refetch();
  }, [deviceId, startDate, endDate]);

  const { data, isLoading, error, refetch } = useQuery(
    "getJobData",
    () => {
      return axios({
        url: process.env.REACT_APP_API_URL,
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: localStorage.getItem("authToken"),
        },
        data: {
          query: GetJobData_QUERY({
            filterObject: {
              device_id: deviceId,
              start_date: startDate,
              end_date: endDate
            },
          }),
        },
      }).then((response) => {
        if (response.status >= 400) {
          throw new Error("Error fetching data");
        } else {
          const jobsList = response.data.data.getJobData;
          setJobs(jobsList);
        }
      });
    },
    { enabled: false }
  );

  function handleJobFilter(e: any) {
    const jobId = e.value;
    const filteredJobs = jobs.filter((job: any) => job.job_id === jobId);
    setJobs(filteredJobs);
    setEnableClear(true);
    setDefaultFilterValue(jobId);
  }

  return (
    <div className="jobs-info-container flex-1 border-2 rounded-md h-full border-sky-500 bg-slate-50 w-full ml-2 p-4">
      <div className="device-card-heading flex justify-between">
        <h1 className="text-sky-600 font-semibold text-2xl mb-2">
          Recent Jobs
        </h1>
        <div className="flex justify-around">
          <Select
            styles={dropDownStyles}
            placeholder="Job ID"
            defaultInputValue={defaultFilterValue}
            options={jobs?.map((job: any) => ({
              value: job.job_id,
              label: job.job_id,
            }))}
            onChange={handleJobFilter}
          />
          {enableClear && (
            <button
              className="ml-2 p-2 bg-red-500 rounded-md text-white"
              onClick={() => {
                setEnableClear(false);
                setDefaultFilterValue("");
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
          <li className="w-1/5">Job ID</li>
          <li className="w-1/5">Device ID</li>
          <li className="w-1/5">Status</li>
          <li className="w-1/5">Start Date</li>
        </ul>
      </div>
      <div className="table-info mt-2 bg-white border-2 border-slate-200 rounded-md h-40 px-4 py-2 bg-white scroll-smooth overflow-auto no-scrollbar">
        {deviceId ? (
          jobs.length ? (
            jobs
              .sort((job1: any, job2: any) => job2.job_id - job1.job_id)
              .map((job: any, index: number) => (
                <ul
                  key={index}
                  className="flex justify-between border-b-2 border-slate-100 p-2"
                >
                  <li className="w-1/5">{job.job_id}</li>
                  <li className="w-1/5">{job.device_id}</li>
                  <li className="w-1/5 pr-6">{job.status}</li>
                  <li className="w-1/5">
                    {new Date(parseInt(job?.start_date)).toLocaleDateString()}
                  </li>
                </ul>
              ))
          ) : (
            <div className="loader flex justify-center items-center mt-12 ml-64"></div>
          )
        ) : (
          <div className="flex justify-center items-center mt-12 font-semibold">
            No Data to Display!
          </div>
        )}
      </div>
    </div>
  );
}

export default JobsInfo;
