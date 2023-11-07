import React, { useState } from "react";
import { Sidebar, Menu, MenuItem } from "react-pro-sidebar";
import { IoMdAnalytics } from "react-icons/io";
import { FiHome } from "react-icons/fi";
import { pageTypes } from "../types";

const Menubar = ({ setCurrentComponent }: any) => {
  const [menuCollapse, setMenuCollapse] = useState<boolean>(false);

  const menuIconClick = (): void => {
    setMenuCollapse((prevMenuCollapse) => !prevMenuCollapse);
  };

  return (
    <>
      <div id="Menu h-screen">
        <Sidebar>
          <Menu>
            <MenuItem
              active={true}
              icon={<FiHome />}
              onClick={() => setCurrentComponent(pageTypes.OPERATIONS)}
            >
              Operations
            </MenuItem>
            <MenuItem
              icon={<IoMdAnalytics />}
              onClick={() => setCurrentComponent(pageTypes.ANALYTICS)}
            >
              Analytics
            </MenuItem>
          </Menu>
        </Sidebar>
      </div>
    </>
  );
};

export default Menubar;
