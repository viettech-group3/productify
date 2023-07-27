import axios from 'axios';
import React, { useState, useEffect, useRef } from 'react';
import styles from './InvitationModal.module.css';
import { useDispatch } from 'react-redux';
import { toggleInvitationModal } from '../../../slices/ShowInvitationModal';
import { set, add, remove, update } from '../../../slices/MonthEventsSlice';
import { addTodayEvent } from '../../../slices/TodayEventsSlice';

const InvitationModal = () => {
  const exampleTokenForPhuoc = JSON.parse(localStorage.getItem('user')).token;
  // 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0ODBiNTY1ZDhhMzVhNTViMDE2MTFmYiIsImlhdCI6MTY4NjE1NzQxOSwiZXhwIjoxNjg4NzQ5NDE5fQ.u2Xv7d9vm62wFiNQEJgq4Mak6LBBjpe9I69Dl4BH8eA';
  const [invitations, setInvitations] = useState([]);
  const dispatch = useDispatch();
  const modalRef = useRef(null);
  const [isLoading, setIsLoading] = useState(true); // Add loading state
  useEffect(() => {
    //Fetch Events of currentUser by getAllEvents() when we open <TodayModal/>
    axios
      .get('http://localhost:5000/api/events/getPending', {
        headers: {
          Authorization: `Bearer ${exampleTokenForPhuoc}`,
        },
      })
      .then(response => {
        // Handle the response
        const fetchedEventsData = response.data;
        console.log(
          'Fetch successfully invitation',
          fetchedEventsData.invitedEvents,
        );
        setIsLoading(false);
        setInvitations(response.data.invitedEvents);
      })
      .catch(error => {
        // Handle the error
        console.log(
          'There is an error when we try to fetch event for Invitation box',
        );
        console.error(error);
      });
  }, []); // Empty dependency array to run the effect only once on component mount

  const handleAcceptInvitation = eventId => {
    axios
      .put(
        `http://localhost:5000/api/events/updateStatus/${eventId}`,
        { decision: 'accepted' },
        {
          headers: {
            Authorization: `Bearer ${exampleTokenForPhuoc}`,
          },
        },
      )
      .then(response => {
        // Handle the response
        console.log(response.data);
        dispatch(add(response.data));
        dispatch(addTodayEvent(response.data));
        dispatch(toggleInvitationModal());
      })
      .catch(error => {
        // Handle the error
        console.log('There is an error when we try to Accept Invitation');
        console.error(error);
      });
  };

  const handleDenyInvitation = eventId => {
    axios
      .put(
        `http://localhost:5000/api/events/updateStatus/${eventId}`,
        { decision: 'denied' },
        {
          headers: {
            Authorization: `Bearer ${exampleTokenForPhuoc}`,
          },
        },
      )
      .then(response => {
        // Handle the response
        console.log(response.data);

        dispatch(toggleInvitationModal());
      })
      .catch(error => {
        // Handle the error
        console.log('There is an error when we try to Accept Invitation');
        console.error(error);
      });
  };

  const handleOutsideClick = event => {
    if (modalRef.current && !modalRef.current.contains(event.target)) {
      dispatch(toggleInvitationModal());
    }
  };

  return (
    <div className={styles.overlay} onClick={handleOutsideClick}>
      <div className={styles.invitationModal} ref={modalRef}>
        <div
          className={styles.modalHeader}
          onClick={() => {
            dispatch(toggleInvitationModal());
          }}
        >
          X
        </div>
        {isLoading ? (
          <div
            className="d-flex justify-content-center align-items-center"
            style={{ marginTop: '7rem' }}
          >
            <div
              className="spinner-border "
              role="status"
              style={{ width: '3rem', height: '3rem' }}
            >
              <span className="sr-only">Loading...</span>

            </div>
          </div>
        ) : (
          <div>
            <div
              className="row"
              style={{ fontSize: '19px', fontWeight: 'bold', color: '#a2d2ff' }}
            >
              <div className="col d-flex align-items-center justify-content-center">
                Event's Name
              </div>
              <div className="col d-flex align-items-center justify-content-center">
                Event's Creator
              </div>
              <div className="col d-flex align-items-center p-0">
                Accept Or Deny?
              </div>
            </div>
            {invitations.map(invitation => (
              <div
                className={`row my-2 ${styles.eachInvitation}`}
                style={{
                  fontSize: '17px',
                  fontWeight: 'bold',
                  color: '#a2d2ff',
                }}
              >
                <div className="col d-flex align-items-center justify-content-center">
                  {invitation.name}
                </div>
                <div className="col d-flex align-items-center justify-content-center">
                  {invitation.invitedBy}
                </div>
                <div className="col d-flex align-items-center p-0">

                  <button
                    onClick={() => {
                      handleAcceptInvitation(invitation._id);
                    }}

                    className={styles.button}

                  >
                    Accept
                  </button>
                  <button
                    onClick={() => {
                      handleDenyInvitation(invitation._id);
                    }}

                    className={styles.button}

                  >
                    Deny
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default InvitationModal;
