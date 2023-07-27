import React, { useState, useEffect } from 'react';
import { getMonth } from '../../service/util';
import MiniMonth from './MiniMonth';
import Points from './Points';
import UserSearch from './UserSearch';
import { useSelector, useDispatch } from 'react-redux'; //To manage Global State of Redux
import Label from './Label/Label';
import InvitationModal from './InvitationModal/InvitationModal';
import { toggle } from '../../slices/ShowModalSlice'; //Import toggle function to turn on/off Modal
import { toggleInvitationModal } from '../../slices/ShowInvitationModal'; //Import toggleInvitationModal to turn on/off Invitation Modal
import styles from './SideBar.module.css';


const SideBar = () => {
  const ShowInvitationModal = useSelector(
    state => state.ShowInvitationModal.value,
  );
  const dispatch = useDispatch(); //dispatch is touse function to interact with State of Redux
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
      <button
          onClick={() => {
            dispatch(toggleInvitationModal());
          }}
          className={`${styles.invitationBoxButton} position-relative`}
        >
          Invitation Box
          <span class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
            2+
            <span class="visually-hidden">unread messages</span>
          </span>
        </button>
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
