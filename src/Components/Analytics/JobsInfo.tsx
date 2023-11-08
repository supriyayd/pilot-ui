import Select from "react-select";
import { dropDownStyles } from "../../common";
import axios from "axios";
import { useQuery } from "react-query";
import { GetJobData_QUERY } from "../../Services/Queries";
import { useState } from "react";

function JobsInfo({ deviceId }: any) {
  const [jobs, setJobs] = useState([]);

  const { data, isLoading, error } = useQuery("getJobData", () => {
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
  });

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
          <li className="">Job ID</li>
          <li>Device ID</li>
          <li>Status</li>
          <li>Start Date</li>
          <li>User ID</li>
        </ul>
      </div>
      <div className="table-info mt-2 bg-white border-2 border-slate-200 rounded-md h-40 px-4 py-2 bg-white scroll-smooth overflow-auto no-scrollbar">
        {jobs.map((job: any, index: number) => (
          <ul
            key={index}
            className="flex justify-between border-b-2 border-slate-100 p-2"
          >
            <li>{job.job_id}</li>
            <li>{job.device_id}</li>
            <li>{job.status}</li>
            <li>{new Date(job.start_date).toString()}</li>
            <li>{job.user_id}</li>
          </ul>
        ))}
      </div>
    </div>
  );
}

export default JobsInfo;
