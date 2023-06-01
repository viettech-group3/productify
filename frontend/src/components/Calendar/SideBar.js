import React, { useState } from 'react';
import { getMonth } from "../../service/util";
import MiniMonth from "./MiniMonth";
import Points from "./Points";
import UserSearch from "./UserSearch";

const SideBar = () => {
  const monthTest = getMonth();

  return (
    <div>
      <div>
        <MiniMonth month={monthTest} />
      </div>
      <div>
        <Points />
      </div>
      <div>
        <UserSearch />
      </div>
    </div>
  );
};

export default SideBar;
