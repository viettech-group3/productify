import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import styles from './EventUpdateForm.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faAlignLeft,
  faClock,
  faEnvelope,
  faCalendar,
  faTags,
} from '@fortawesome/free-solid-svg-icons';
import { toggleUpdateForm } from '../../slices/ShowEventUpdateFormSlice';
import {
  set,
  add,
  remove,
  update,
  updateStatus,
} from '../../slices/MonthEventsSlice';
import { addPoints } from '../../slices/UserStateSlice';
import toast, { Toaster } from 'react-hot-toast';
const { points } = require('../../service/points');

const EventUpdateForm = ({ eventInformation }) => {
  console.log('Event information is', eventInformation);
  console.log('SHow eventUpdateForm');
  const dispatch = useDispatch(); //dispatch is to use function to interact with State of Redux
  const labelList = useSelector(state => state.Label.value);
  const exampleTokenForPhuoc = JSON.parse(localStorage.getItem('user')).token;
  //Example token to pass protect in backend route (We'll delete it later)
  const [formData, setFormData] = useState({
    name: eventInformation.name || '',
    describe: eventInformation.describe || '',
    start: eventInformation.start,
    end: eventInformation.end,
    invitedInput: eventInformation.invitedInput || '',
    invited: eventInformation.invited || [],
    label: eventInformation.label || '',
  });
  const [finish, setFinish] = useState(false);

  const [invitedGuest, setInvitedGuest] = useState(
    eventInformation.invited || [],
  ); //state to store all of emails in an array
  const modalRef = useRef(null);

  const handleOutsideClick = e => {
    e.stopPropagation();
    if (modalRef.current && !modalRef.current.contains(e.target)) {
      dispatch(toggleUpdateForm());
    }
  };

  const handleXClick = e => {
    e.stopPropagation();
    dispatch(toggleUpdateForm());
  };

  const handleChange = e => {
    toast.success('Increase Points');
    const name = e.target.name;
    const value = e.target.value;
    setFormData(prevData => ({
      ...prevData,
      [name]: value,
    }));
    console.log('formData when we change is', formData);
  };

  const handleAddGuest = () => {
    let newGuest = formData.invitedInput;
    setInvitedGuest(oldArray => [...oldArray, formData.invitedInput]);
    setFormData(prevData => ({
      //keep everything and change invitedInput to ''
      ...prevData,
      invited: [...prevData.invited, newGuest],
      invitedInput: '',
    }));
  };

  const handleLabelChange = name => {
    const selectedLabelName = name;
    console.log('Current SelectedLabelname is', selectedLabelName);
    const selectedLabel = labelList.find(
      label => label.name === selectedLabelName,
    );
    console.log('Current label object is', selectedLabel);
    if (selectedLabel) {
      setFormData(prevData => ({
        ...prevData,
        label: {
          name: selectedLabel.name,
          color: selectedLabel.color,
        },
      }));
    }
  };

  const handleUpdate = async event => {
    event.preventDefault();
    console.log('We just run handleUpdate');
    console.log('formData to update is:', formData);
    try {
      const response = await axios
        .put(
          `http://localhost:5000/api/events/modify/${eventInformation._id}`,
          formData,
          {
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${exampleTokenForPhuoc}`,
            },
          },
        )
        .then(response => {
          console.log('Response of PUT Request to update event:', response);
          dispatch(update(response.data));
          dispatch(toggleUpdateForm());
        });
    } catch (error) {
      console.log(
        'There is an error when try to send PUT REQUEST to http://localhost:5000/api/events/modify/:id',
      );
      console.log('ERROR: ', error);
    }
  };

  const handleFinishEventClick = (e, eventFinish) => {
    e.stopPropagation();
    dispatch(updateStatus({ _id: eventFinish._id, status: 'completed' }));
    dispatch(toggleUpdateForm());
    axios
      .post(
        `http://localhost:5000/api/events/finish/${eventFinish._id}`,
        null,
        {
          headers: {
            Authorization: `Bearer ${exampleTokenForPhuoc}`,
          },
        },
      )
      .then(response => {
        console.log('Finish event successfully');
        toast.success(
          `Congratulations! You get ${points(
            response.data.event.start,
            response.data.event.end,
          )} points`,
        );
        dispatch(
          addPoints(points(response.data.event.start, response.data.event.end)),
        );
      })
      .catch(error => {
        console.log('There are some bugs when we try to finish events');
        console.log(error);
      });
  };

  return (
    <div className={styles.overlay} onClick={e => handleOutsideClick(e)}>
      <div className={styles.ModalCard} ref={modalRef}>
        <div className={styles.ModalTitle}>
          <button className={styles.closeButton} onClick={e => handleXClick(e)}>
            X
          </button>
        </div>
        <form onSubmit={handleUpdate} className={styles.form} id="my-form">
          <input
            type="text"
            id="title"
            name="name"
            placeholder="Add Title"
            autoFocus
            className={styles.input}
            value={formData.name}
            onChange={handleChange}
          />
          <span className={styles.buttonGroup}>
            <button className={styles.typeButton}>Event</button>
            <button className={styles.typeButton}>Task</button>
            <button className={styles.typeButton}>Reminder</button>
          </span>
          <br />
          <div className={styles.columns}>
            {/* First Column */}
            <div className={styles.columnLabel}>
              <FontAwesomeIcon icon={faAlignLeft} className={styles.icon} />
              <FontAwesomeIcon icon={faCalendar} className={styles.icon} />
              <FontAwesomeIcon icon={faClock} className={styles.icon} />
              <FontAwesomeIcon icon={faEnvelope} className={styles.icon} />
              <FontAwesomeIcon icon={faTags} className={styles.icon} />
            </div>

            {/* Second Column */}
            <div className={styles.columnTitle}>
              <span className={styles.label}>Description</span>
              <span className={styles.label}>Start</span>
              <span className={styles.label}>End</span>
              <span className={styles.label}>Invite Guest</span>
              <span className={styles.label}>Select Label</span>
            </div>

            {/* Third Column */}
            <div className={styles.columnInput}>
              <div className={styles.inputContainer}>
                <input
                  type="text"
                  id="descriptionInput"
                  name="describe"
                  placeholder="Describe your event"
                  value={formData.describe}
                  onChange={handleChange}
                  className={styles.input}
                />
              </div>

              <div className={styles.inputContainer}>
                <input
                  type="datetime-local"
                  id="startInput"
                  name="start"
                  value={formData.start}
                  onChange={handleChange}
                  className={styles.input}
                />
              </div>

              <div className={styles.inputContainer}>
                <input
                  type="datetime-local"
                  id="endInput"
                  name="end"
                  value={formData.end}
                  onChange={handleChange}
                  className={styles.input}
                />
              </div>

              <div className={styles.inputContainer}>
                <input
                  type="email"
                  id="emailInput"
                  name="invitedInput"
                  placeholder="Invite Guest"
                  value={formData.invitedInput}
                  onChange={handleChange}
                  className={styles.input}
                />
              </div>

              <div className={styles.inputContainer}>
                <div className={styles.customDropdown}>
                  <div className={styles.dropdownLabel}>
                    {formData.label.name}
                  </div>
                  <div className={styles.dropdownOptions}>
                    {labelList.map(label => (
                      <div
                        key={label.name}
                        className={styles.dropdownOption}
                        onClick={() => handleLabelChange(label.name)}
                      >
                        <span
                          className={styles.labelColor}
                          style={{ backgroundColor: label.color }}
                        ></span>
                        {label.name}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className={styles.buttonContainer}>
            <div className={styles.submitContainer}>
              <button className={styles.submitButton} form="my-form">
                Update Changes
              </button>

              <div
                className={styles.finishEvent}
                onClick={e => handleFinishEventClick(e, eventInformation)}
              >
                Finish Event
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EventUpdateForm;
