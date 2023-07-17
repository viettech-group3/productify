import React, { useRef } from 'react';
import styles from './EventModal.module.css';
import { useSelector, useDispatch } from 'react-redux';
import { toggle } from '../../../slices/ShowModalSlice';
import EventForm from '../EventForm/EventForm';

const EventModal = () => {
  console.log('Show Event Modal');
  const ShowModal = useSelector(state => state.ShowModal.value);
  const dispatch = useDispatch();
  const modalRef = useRef(null);

  const handleOutsideClick = event => {
    if (modalRef.current && !modalRef.current.contains(event.target)) {
      dispatch(toggle());
    }
  };

  const handleXClick = () => {
    dispatch(toggle());
  };

  return (
    <div className={styles.overlay} onClick={handleOutsideClick}>
      <div className={styles.ModalCard} ref={modalRef}>
        <div className={styles.ModalTitle}>
          <button className={styles.closeButton} onClick={handleXClick}>
            X
          </button>
        </div>
        <EventForm />
      </div>
    </div>
  );
};

export default EventModal;
