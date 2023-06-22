import axios from 'axios';
import React from 'react';
import styles from './InvitationModal.module.css';
import { useDispatch } from 'react-redux';
import { toggleInvitationModal } from '../../../slices/ShowInvitationModal';

const InvitationModal = () => {
  const invitations = [
    {
      //chac se xai populate ben backend
      name: 'jekj',
      describe: 'fefe',
      status: 'pending',
      creator: 'Peter',
    },
    {
      name: '3r3',
      describe: 'ffeee',
      status: 'pending',
      creator: 'Hedwd',
    },
  ];

  const dispatch = useDispatch();
  return (
    <div className={styles.overlay}>
      <div className={styles.invitationModal}>
        <div
          className={styles.modalHeader}
          onClick={() => {
            dispatch(toggleInvitationModal());
          }}
        >
          X
        </div>
        <div>
          {invitations.map(invitation => (
            <div className={styles.eachInvitation}>
              <p>{invitation.creator}</p>
              <p>{invitation.name}</p>
              <p>{invitation.describe}</p>
              <button>Accept</button>
              <button>Decline</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default InvitationModal;
