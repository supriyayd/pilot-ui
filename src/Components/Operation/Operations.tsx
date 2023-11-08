import Select from "react-select";
import { DropDownOptions } from "../../types";
import { dropDownStyles } from "../../common";
import DeviceInfo from "../Analytics/DeviceInfo";
import JobsInfo from "../Analytics/JobsInfo";
import React from "react"; 
import { useQuery } from "react-query";
import { GetAllNetworks } from "../../Services/GraphQLService";



function Operations({ userId }: any) {
  //const apiService = GraphQLService();
  const [networks, setNetworks] = React.useState([]);
  //const { data, status } = useQuery("networks",()=> GetAllNetworks(1));

  React.useEffect(() => {


      
       //const response = await apiService.getAllNetworks(userId);
      // const body = await response.json();
      
      //setNetworks(body.results.map(({ body }) => ({ label: name, value: name })));

  }, []);

  const networksList: Array<DropDownOptions> = networks?.map(
    (network: any) => ({ label: network.name, value: network.id })
  ) || [{ value: 1, label: "Network 1" }];

  return (
    <div className="flex-column p-4 mt-16 bg-sky-50 rounded-sm m-4">
      <div className="dropdown-container flex h-16 p-4 rounded-md">
        <div>
          <Select options={networksList} styles={dropDownStyles} />
        </div>
        <div className="ml-8">
          <Select styles={dropDownStyles} />
        </div>
        <div className="ml-8">
          <input type="file" />
          <button type="submit" className="start px-4 py-2 rounded-lg bg-sky-600 text-white font-semibold">Start Printing</button>
        </div>
      </div>
      <div className="info-container flex h-20 p-4 rounded-md mt-2">
          <button  className="pause px-4 py-2 rounded-lg bg-sky-600 text-white font-semibold" disabled type="submit">Pause</button>
          <button className="ml-8 cancel px-4 py-2 rounded-lg bg-sky-600 text-white font-semibold" disabled type="submit">Cancel</button>
      </div>
      <div className="info-container flex h-80 p-4 rounded-md mt-2">
        <DeviceInfo />
        {/* <JobsInfo /> */}
      </div>
      <div className="logs-container flex h-80 p-4 rounded-md">
      </div>
    </div>
  );
}
  

export default Operations;
