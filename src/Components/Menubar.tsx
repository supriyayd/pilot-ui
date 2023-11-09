import React, { useState } from "react";
import { Sidebar, Menu, MenuItem, sidebarClasses } from "react-pro-sidebar";
import { IoMdAnalytics } from "react-icons/io";
import { FiHome } from "react-icons/fi";
import { pageTypes } from "../types";

const Menubar = ({ setCurrentComponent }: any) => {
  return (
    <div>
      <div id="Menu">
        <Sidebar
          rootStyles={{
            [`.${sidebarClasses.container}`]: {
              height: "95vh",
              borderRadius: "5px",
            },
          }}
        >
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
    </div>
  );
};

export default Menubar;
