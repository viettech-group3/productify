import axios from 'axios';
import React from 'react';
import styles from './InvitationModal.module.css';

const InviationModal = () => {
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
  return (
    <div className={styles.overlay}>
      <div className={styles.invitationModal}>
        {invitations.map(invitation => (
          <div>
            <p>{invitation.creator}</p>
            <p>{invitation.name}</p>
            <p>{invitation.describe}</p>
            <button>Accept</button>
            <button>Decline</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default InviationModal;
