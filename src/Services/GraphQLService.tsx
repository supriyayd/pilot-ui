import { useState } from 'react';
import axios from 'axios';
import { useQuery } from "react-query";

const API_URL = "http://localhost:3001/";

const DeviceService = () => {

  const GetAllNetworks = async (user_id:number) => {
    try {
      const { data, isLoading, error } = useQuery("getAllNetworks", () => {
        return axios({
          url:API_URL,
          method: "POST",
          headers: { "Content-Type": "application/json" },
          data: { query: GetAllNetwork_QUERY }
        })
          .then((response) => {
            if (response.status >= 400) {
              throw new Error("Error fetching data");
            } else {
              return response.data.json();
            }
          })
      });
    }
    catch(error)
    {

    }
  }    
    
  const GetAllDevices = async (network_id:number) => {
    try {
      const { data, isLoading, error } = useQuery("getAllDevices", () => {
        return axios({
          url:API_URL,
          method: "POST",
          headers: { "Content-Type": "application/json" },
          data: { query: GetAllDevice_QUERY }
        })
          .then((response) => {
            if (response.status >= 400) {
              throw new Error("Error fetching data");
            } else {
              return response.data.json();
            }
          })
      });
    }
    catch(error)
    {

    }
  }

    const GetDeviceData = async (network_id:number, device_id:number) => {
      try {
        const { data, isLoading, error } = useQuery("getDeviceData", () => {
          return axios({
            url:API_URL,
            method: "POST",
            headers: { "Content-Type": "application/json" },
            data: { query: GetDeviceData_QUERY }
          })
            .then((response) => {
              if (response.status >= 400) {
                throw new Error("Error fetching data");
              } else {
                return response.data.json();
              }
            })
        });
      }
      catch(error)
      {
  
      }
    }

    const GetJobData = async (job_id:number, device_id:number, status:string) => {
      try {
        const { data, isLoading, error } = useQuery("getJobData", () => {
          return axios({
            url:API_URL,
            method: "POST",
            headers: { "Content-Type": "application/json" },
            data: { query: GetJobData_QUERY }
          })
            .then((response) => {
              if (response.status >= 400) {
                throw new Error("Error fetching data");
              } else {
                return response.data.json();
              }
            })
        });
      }
      catch(error)
      {
  
      }
    }

    const GetLogJobData = async (job_id: number, incident_type: string, start_date: Date) => {
      try {
        const { data, isLoading, error } = useQuery("getLogJobData", () => {
          return axios({
            url:API_URL,
            method: "POST",
            headers: { "Content-Type": "application/json" },
            data: { query: GetJobLogData_QUERY }
          })
            .then((response) => {
              if (response.status >= 400) {
                throw new Error("Error fetching data");
              } else {
                return response.data.json();
              }
            })
        });
      }
      catch(error)
      {
  
      }
    }

    const CreateJob=async(user_id: number,
      device_id: number,
      start_date: string,
      end_date: string,
      status: string,
      filePath: string)=>{
        try {
          const { data, isLoading, error } = useQuery("createJob", () => {
            return axios({
              url:API_URL,
              method: "POST",
              headers: { "Content-Type": "application/json" },
              data: { query: `mutation{${CreateJob_Query}}` }
            })
              .then((response) => {
                if (response.status >= 400) {
                  throw new Error("Error fetching data");
                } else {
                  return response.data.json();
                }
              })
          });
        }
        catch(error)
        {
    
        }
      }
    
      const UpdateJobStatus=async(job_id: number, status: string)=>{
          try {
            const { data, isLoading, error } = useQuery("updateJobStatus", () => {
              return axios({
                url:API_URL,
                method: "POST",
                headers: { "Content-Type": "application/json" },
                data: { query: `mutation{${updateJobStatus_Query}}` }
              })
                .then((response) => {
                  if (response.status >= 400) {
                    throw new Error("Error fetching data");
                  } else {
                    return response.data.json();
                  }
                })
            });
          }
          catch(error)
          {
      
          }
        }
}

export default DeviceService;