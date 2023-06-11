import React from 'react';
import styles from './EventModal.module.css';
import { ButtonGroup } from '@chakra-ui/react';
import { useSelector, useDispatch } from 'react-redux'; //To manage Global State of Redux
import { toggle } from '../../../slices/ShowModalSlice'; //Import toggle function to turn on/off Modal
import EventForm from '../EventForm/EventForm';

// const ModalOverlay = props => {
//   const ShowModal = useSelector(state => state.ShowModal.value);
//   const dispatch = useDispatch();
//   return (
//     <div className={styles.overlay} onClick={() => dispatch(toggle())}>
//       {props.children}
//     </div>
//   );
// };

const EventModal = () => {
  const ShowModal = useSelector(state => state.ShowModal.value); //ShowModal is a boolean state that know as True - showing and False - not showing
  const dispatch = useDispatch(); //dispatch is touse function to interact with State of Redux
  return (
    <div className={styles.overlay}>
      <div className={styles.ModalCard}>
        <div className={styles.ModalTitle}>
          <button
            className={styles.closeButton}
            onClick={() => dispatch(toggle())}
          >
            X
          </button>
        </div>
        <EventForm />
      </div>
    </div>
  );
};

export default EventModal;
