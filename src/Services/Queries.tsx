const GetAllNetwork_QUERY = `
{
  getAllNetworks() {
      user_id
  }
}`;

const GetAllDevice_QUERY = `
{
  getAllDevices() {
      network_id
  }
}`;

const GetDeviceData_QUERY = `
{
  getDeviceData() {
      network_id,
      device_id
  }
}`;

const GetJobData_QUERY = `
{
    getJobData()
    {
        job_id,
        device_id, 
        status
    }
}`;

const GetJobLogData_QUERY = `
{
    getJobLogData()
    {
        job_id,
        incident_type, 
        start_date
    }
}`;

const CreateJob_Query = `{
    createJob()
    {
        user_id,
        device_id,
        start_date,
        end_date,
        status,
        filePath
    }
}`;

const updateJobStatus_Query = `{
    UpdateJobStatus()
    {
        job_id,
        status
    }
}`;

export {
  updateJobStatus_Query,
  CreateJob_Query,
  GetAllDevice_QUERY,
  GetAllNetwork_QUERY,
  GetDeviceData_QUERY,
  GetJobData_QUERY,
  GetJobLogData_QUERY,
};
