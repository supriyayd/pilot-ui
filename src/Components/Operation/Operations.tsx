import Select from "react-select";
import { DropDownOptions } from "../../types";
import { dropDownStyles } from "../../common";
import DeviceInfo from "../Analytics/DeviceInfo";
import React, { useEffect, useState } from "react"; 
import { useMutation, useQuery } from "react-query";
import axios from "axios";
import { CreateJob_Query, GetAllDevice_QUERY, updateJobStatus_Query } from "../../Services/Queries";
import JobInfo from "./JobInfo";


function Operations({ networks }: any) {

  const networksList: Array<DropDownOptions> = networks?.map(
    (network: any) => ({ label: network.name, value: network.network_id })
  )|| [{ value: 1, label: "Network 1" }];

  const [selectedNetwork, setSelectedNetwork] = useState(null);
  const [selectedDevice, setSelectedDevice] = useState(null);
  const [devicesInfo, setDevicesInfo] = useState([]);

  const [ isAlertVisible, setIsAlertVisible ] = React.useState(false);
  const [isDeviceIdle, setIsDeviceIdle]= useState(true);
  const [isDeviceInProcess, setIsDeviceInProcess] = useState(true);
  const [seletedFile, setSeletedFile] = useState('');
  const [currentJobId, setCurrentJobId]=useState<any>(null);
  const [fetchJob, setFetchJob]=useState(false)

  const[message, setMessage]=useState('');
  let updatedStatus:string='';
  useEffect(() => {
    refetch();
  }, [selectedDevice])
  
  const { data, isLoading, error, refetch } = useQuery("getDeviceData", () => {
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
      }
    }).then((response) => {
      if (response.status >= 400) {
        throw new Error("Error fetching data");
      } else {
        const devicesList = response.data.data.getAllDevices;
        return setDevicesInfo(devicesList);
      }
    });
  }, {enabled: false});

      const onFileUpload = (event:any) => {
        setSeletedFile(event.target.files[0]?.name);
    };

    const handleStartPrntClick = () => {
      mutateCreateJob()
      setIsDeviceInProcess(true);

    }

    const handlePauseClick = () => {
      if(currentJobId)
      {
        if(currentJobId.status==='PSD')
        { 
          updatedStatus='PRNT'
        }
        else{
          updatedStatus='PSD'
        }

      }
      else{
        updatedStatus='PSD'
      }

      mutateUpdateJob()
    }

    const handleCancelClick = () => {
      updatedStatus='ABRT'
      mutateUpdateJob();

    }

    const { mutate:mutateCreateJob } = useMutation("createJob", () => {
      return axios({
        url: process.env.REACT_APP_API_URL,
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: localStorage.getItem("authToken"),
        },
        data: {
          query: CreateJob_Query,
          variables:{
            jobData: {
              user_id: 1,
              device_id: selectedDevice,
              start_date: new Date(),
              status: 'PRNT',
              filepath: seletedFile,

            },
          }
        },
      }).then((response) => {
        if (response.status >= 400) {
          setMessage("Error starting job.");

        } else {
          setIsAlertVisible(true);
          setMessage("Job started successfully.");
          setTimeout(() => {
                       setIsAlertVisible(false);
                   }, 3000);
          setIsDeviceInProcess(true)
          setIsDeviceIdle(false)
          setFetchJob(true);

        }
      });
    });

    const { mutate:mutateUpdateJob } = useMutation("updateJobStatus", () => {
      console.log(updatedStatus);
      return axios({
        url: process.env.REACT_APP_API_URL,
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: localStorage.getItem("authToken"),
        },
        data: {
          query: updateJobStatus_Query,
          variables:{
            actionObject: {
              device_id: selectedDevice,
              job_id:currentJobId.job_id,
              status: updatedStatus

            },
          }
        },
      }).then((response) => {
        if (response.status >= 400) {
          throw new Error("Error starting job");
        } else {
          setIsAlertVisible(true);
          setMessage("Job updated successfully.");
          setTimeout(() => {
            setIsAlertVisible(false);
          }, 3000);
          setFetchJob(true);
          if(updatedStatus==='ABRT')
          {
            setIsDeviceInProcess(false)
            setIsDeviceIdle(true)
          }
        }
      });
    });



   const getDeviceDetails = (event:any) => {

    const value = event.value;
    setSelectedDevice(value);

    const deviceData:any=devicesInfo.filter(
      (device: any) => device.device_id === value
    )[0];
    if(deviceData?.status=="IDLE")
    {
    setIsDeviceInProcess(false)
    setIsDeviceIdle(true)
    }
    if(deviceData?.status=="PRNT")
    {
    setIsDeviceInProcess(true)
    setIsDeviceIdle(false)
    }
    
  };


  return (
    <div className="flex-column p-4 mt-16 bg-sky-50 rounded-sm m-4">
      <div className="dropdown-container flex h-16 p-4 rounded-md">
        <div>
        <Select
            options={networksList}
            styles={dropDownStyles}
            onChange={(e: any) => setSelectedNetwork(e.value)}
          />
        </div>
        <div className="ml-8">
          <Select
            styles={dropDownStyles}
            options={devicesInfo.map((device: any) => ({
              label: device?.name,
              value: device?.device_id,
            }))}
            onChange={getDeviceDetails}
          />
        </div>
        <div className="ml-8">
          <input  onChange={onFileUpload} type="file" />
          
        </div>
      </div>
      <div className="info-container flex h-20 p-4 rounded-md mt-2">
      {/* <button type="submit" onClick={handleStartPrntClick}  className="start px-4 py-2 rounded-lg bg-sky-600 text-white font-semibold">Start</button>
      <button onClick={()=>handlePauseClick()} className="ml-8 pause px-4 py-2 rounded-lg bg-sky-600 text-white font-semibold" type="submit">Pause</button>
      <button  onClick={()=>handleCancelClick()} className="ml-8 cancel px-4 py-2 rounded-lg bg-sky-600 text-white font-semibold" type="submit">Cancel</button>
       */}
      
          {isDeviceInProcess
            ? <button type="submit"   className="start px-4 py-2 rounded-lg bg-sky-200 text-white font-semibold">Start</button>
            : <button type="submit" onClick={handleStartPrntClick}  className="start px-4 py-2 rounded-lg bg-sky-600 text-white font-semibold">Start</button>
          }
          


          {isDeviceInProcess && !isDeviceIdle
            ? <button onClick={()=>handlePauseClick()} className="ml-8 pause px-4 py-2 rounded-lg bg-sky-600 text-white font-semibold" type="submit">PauseOrResume</button>
            : <button  className="ml-8 pause px-4 py-2 rounded-lg bg-sky-200 text-white font-semibold" type="submit">PauseOrResume</button>
          }

        {isDeviceInProcess && !isDeviceIdle
            ? <button  onClick={()=>handleCancelClick()} className="ml-8 cancel px-4 py-2 rounded-lg bg-sky-600 text-white font-semibold" type="submit">Cancel</button>
            : <button  className="ml-8 cancel px-4 py-2 rounded-lg bg-sky-200 text-white font-semibold" type="submit">Cancel</button>
          }

         
      </div>
      {isAlertVisible
      && <div className="p-4 mb-4 text-sm text-green-800 rounded-lg bg-blue-50 dark:bg-gray-800 dark:text-green-400" role="alert">
          <span className="font-medium">{message}</span> 
      </div>}
      <div className="info-container flex h-80 p-4 rounded-md mt-2">
        <DeviceInfo deviceInfo={devicesInfo.filter(
            (device: any) => device.device_id === selectedDevice
          )[0]} />
         <JobInfo setFetchJob={setFetchJob} fetchJob={fetchJob} deviceId={selectedDevice} setCurrentJobId={setCurrentJobId} />
      </div>
      <div className="logs-container flex h-80 p-4 rounded-md">
      </div>
    </div>
  );
}


export default Operations;
