import Select from "react-select";
import { dropDownStyles } from "../../common";

function JobLogsInfo() {
     const dummyData = [
       {
        log_id: 1,
         device_id: 1,
         user_id: 1,
         start_date: "27-10-2023",
         end_date: "28-10-2023",
         incident_type: "ABORTED",
       },
     ];
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
        {dummyData.map((log: any) => (
          <ul className="flex justify-between border-b-2 border-slate-100 p-2">
            <li>{log.log_id}</li>
            <li>{log.device_id}</li>
            <li>{log.user_id}</li>
            <li>{log.start_date}</li>
            <li>{log.end_date}</li>
            <li>{log.incident_type}</li>
          </ul>
        ))}
      </div>
    </div>
  );
}

export default JobLogsInfo;
