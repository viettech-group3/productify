import React, { useState, useEffect } from 'react';
import { getMonth } from "../../service/util";
import MiniMonth from "./MiniMonth";
import Points from "./Points";
import UserSearch from "./UserSearch";
import { useSelector, useDispatch } from 'react-redux'; //To manage Global State of Redux
import Label from "./Label/Label"

const SideBar = () => {
  const MonthIndex = useSelector(state => state.MonthIndex.value);
  const [currentMonth, setCurrentMonth] = useState(getMonth(MonthIndex));
  useEffect(() => {
    //When MonthIndex is changed by redux dispatch => Then change currentMonth
    setCurrentMonth(getMonth(MonthIndex));
  }, [MonthIndex]);

  return (
    <div>
      <div>
        <MiniMonth month={currentMonth} />
      </div>
      <div>
        <Label />
      </div>
      <div>
        <UserSearch />
      </div>

    </div>
  );
};

export default SideBar;
