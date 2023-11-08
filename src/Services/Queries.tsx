const GetAllNetwork_QUERY = (filterObject: any) => `
{
  getAllNetworks(filterObject: ${filterObject}) {
      network_id
      name
  }
}`;

const GetAllDevice_QUERY = (filterObject: any) => `
{
  getAllDevices(filterObject: ${filterObject}) {
    device_id
    material_id
    network_id
    name
    serial_number
    uuid
    status
    created_at
    temperature
    manufacturer
    available_material
    humidity
    printing_time
  }
}`;

const GetDeviceData_QUERY = (filterObject: any) => `
{
  getDeviceData(filterObject: ${filterObject}) {
      network_id,
      device_id
  }
}`;

const GetJobData_QUERY = (filterObject: any) => `
{
    getJobData(filterObject: ${filterObject})
    {
        job_id
        device_id
        status
        start_date
        user_id
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
