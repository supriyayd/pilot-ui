import React, { useState } from "react";
import {
  Sidebar,
  Menu,
  MenuItem,

} from "react-pro-sidebar";
import { IoMdAnalytics  } from "react-icons/io";
import { FiHome } from "react-icons/fi";
import { Link } from "react-router-dom";


const Menubar: React.FC = () => {
  const [menuCollapse, setMenuCollapse] = useState<boolean>(false);

  const menuIconClick = (): void => {
    setMenuCollapse((prevMenuCollapse) => !prevMenuCollapse);
  };

  return (
    <>
      <div id="Menu">
        <Sidebar>
            <Menu>
              <MenuItem active={true} icon={<FiHome />} component={<Link to="/dashboard/operatoins" />}>
                Operatoins
              </MenuItem>
              <MenuItem icon={<IoMdAnalytics/>} component={<Link to="/dashboard/analytics" />}>Analytics</MenuItem>
            </Menu>
        </Sidebar>
      </div>
    </>
  );
};

export default Menubar;