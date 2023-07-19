import React, { useState } from 'react';
import styles from './CalendarHeader.module.css';
import icon from '../../assets/images/addicon.png';
import { useSelector, useDispatch } from 'react-redux'; //To manage Global State of Redux
import { toggle } from '../../slices/ShowModalSlice'; //Import toggle function to turn on/off Modal
import { toggleInvitationModal } from '../../slices/ShowInvitationModal'; //Import toggleInvitationModal to turn on/off Invitation Modal
import { increase, decrease, reset } from '../../slices/MonthIndexSlice';
import dayjs from 'dayjs';
import InvitationModal from './InvitationModal/InvitationModal';
import { LeftArrow, RightArrow } from '../../assets/smallComponents/icon';
import { ViewMode, switchViewMode } from '../../slices/ViewModeSlice';
import { decreaseDate, increaseDate, resetDate } from '../../slices/CurrentDateSlice';

const CalendarHeader = () => {
  const MonthIndex = useSelector(state => state.MonthIndex.value);
  const ShowInvitationModal = useSelector(
    state => state.ShowInvitationModal.value,
  );
  const ViewMode = useSelector(state => state.ViewMode.value)
  const dispatch = useDispatch(); //dispatch is touse function to interact with State of Redux
  return (
    <header className={`d-flex align-items-center ${styles.header}`}>
      <div className={styles.buttonContainer}>
        <div
          className={`${styles.icon_sentence} d-flex align-items-center mt-3`}
          onClick={() => dispatch(toggle())}
        >
          <img src={icon} alt="Add Icon" className={styles.icon} />
          <span className={styles.sentence}>Create</span>
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
        {/*we can add icon then */}
        <button
          className={styles.button}
          onClick={() => {
            if (ViewMode === "month") { dispatch(reset()); }
            else if (ViewMode === "day") { dispatch(resetDate()); }

          }}
        >
          Today
        </button>
        <button></button>
      </div>
      <div>
        {ShowInvitationModal && (
          <div className={styles.invitationBox}>
            <InvitationModal />
          </div>
        )}
      </div>
      <button
        onClick={() => {
          if (ViewMode === "month") { dispatch(decrease()); }
          else if (ViewMode === "day") { dispatch(decreaseDate()) }
        }}
        className={styles.buttonArrow}
      >
        <LeftArrow />
      </button>

      <button
        onClick={() => {
          if (ViewMode === "month") { dispatch(increase()); }
          else if (ViewMode === "day") { dispatch(increaseDate()) }
        }}
        className={styles.buttonArrow}
      >
        <RightArrow />
      </button>
      <h3 className={styles.today}>
        {dayjs(new Date(dayjs().year(), MonthIndex)).format('MMMM YYYY')}
      </h3>

      <div className={styles.switchView}>
        <span className={`${styles.MonthViewButton} ${ViewMode === "month" && styles.choosing}`} onClick={() => { dispatch(switchViewMode("month")) }}>Month View</span>
        <span className={`${styles.DayViewButton} ${ViewMode === "day" && styles.choosing}`} onClick={() => { dispatch(switchViewMode("day")) }}>Day View</span>
      </div>
    </header>
  );
};

export default CalendarHeader;
