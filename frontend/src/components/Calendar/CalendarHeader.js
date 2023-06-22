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

const CalendarHeader = () => {
  const MonthIndex = useSelector(state => state.MonthIndex.value);
  const ShowInvitationModal = useSelector(state => state.ShowInvitationModal.value)
  const dispatch = useDispatch(); //dispatch is touse function to interact with State of Redux
  return (
    <header className={`d-flex align-items-center ${styles.header}`}>
      <div className={styles.buttonContainer}>
        <div
          className={`${styles.icon_sentence} d-flex align-items-center mt-4`}
          onClick={() => dispatch(toggle())}
        >
          <img src={icon} alt="Add Icon" className={styles.icon} />
          <span className={styles.sentence}>Create</span>
        </div>
        <button onClick={() => { dispatch(toggleInvitationModal()) }} className="btn btn-primary">Show/Unshow Invitation Box</button>
        {/*we can add icon then */}
        <button
          className={styles.button}
          onClick={() => {
            dispatch(reset());
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
          dispatch(decrease());
        }}
        className={styles.buttonArrow}
      >
        <LeftArrow />
      </button>

      <button
        onClick={() => {
          dispatch(increase());
        }}
        className={styles.buttonArrow}
      >
        <RightArrow />
      </button>
      <h3 className={styles.today}>
        {dayjs(new Date(dayjs().year(), MonthIndex)).format('MMMM YYYY')}
      </h3>
    </header>
  );
};

export default CalendarHeader;
