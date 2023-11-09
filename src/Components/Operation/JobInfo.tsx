import Select from "react-select";
import { dropDownStyles } from "../../common";
import axios from "axios";
import { useQuery } from "react-query";
import { GetJobData_QUERY } from "../../Services/Queries";
import { useEffect, useState } from "react";

function JobInfo({ deviceId, setCurrentJobId }: any) {
  console.log(deviceId);
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    if(deviceId)
      refetch();
  }, [deviceId])

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
            },
          }),
        },
      }).then((response) => {
        if (response.status >= 400) {
          throw new Error("Error fetching data");
        } else {
          const jobsList = response.data.data.getJobData.filter((job :any) =>job.status=='PRNT');
          setJobs(jobsList);
          setCurrentJobId(jobsList[0].job_id);
        }
      });
    },
    { enabled: false }
  );

  return (
    <div className="jobs-info-container flex-1 border-2 rounded-md h-full border-sky-500 bg-slate-50 w-full ml-2 p-4">
      <div className="device-card-heading flex justify-between">
        <h1 className="text-sky-600 font-semibold text-2xl mb-2">
          Current Job
        </h1>
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
        {jobs.length ? (
          jobs.map((job: any, index: number) => (
            <ul
              key={index}
              className="flex justify-between border-b-2 border-slate-100 p-2"
            >
              <li>{job.job_id}</li>
              <li>{job.device_id}</li>
              <li>{job.status}</li>
              <li>{new Date(parseInt(job.start_date)).toLocaleString()}</li>
              <li>{job.user_id}</li>
            </ul>
          ))
        ) : (
          <div className="flex justify-center items-center mt-12 font-semibold">No Data to Display!</div>
        )}
      </div>
    </div>
  );
}

export default JobInfo;
