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
} from '@fortawesome/free-solid-svg-icons';
import { toggleUpdateForm } from '../../slices/ShowEventUpdateFormSlice';
import {
  set,
  add,
  remove,
  update,
  updateStatus,
} from '../../slices/MonthEventsSlice';

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

  const handleLabelChange = e => {
    const selectedLabelName = e.target.value;
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
    setFinish(value => !value);
    dispatch(updateStatus({ _id: eventFinish._id, status: 'completed' }));

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
        console.log(response.data);
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
          <div className={styles.formRow}>
            <div className={styles.labelColumn}>
              {/* <FontAwesomeIcon icon={faAlignLeft} className={styles.icon} /> */}
              <label className={styles.label} htmlFor="descriptionInput">
                <FontAwesomeIcon icon={faAlignLeft} className={styles.icon} />
                Description
              </label>
              <label className={styles.label} htmlFor="startInput">
                <FontAwesomeIcon icon={faCalendar} className={styles.icon} />
                Start
              </label>
              <label className={styles.label} htmlFor="endInput">
                <FontAwesomeIcon icon={faClock} className={styles.icon} />
                End
              </label>
              <label className={styles.label} htmlFor="emailInput">
                <FontAwesomeIcon icon={faEnvelope} className={styles.icon} />
                Invite Guest
              </label>
            </div>

            <div className={styles.inputColumn}>
              <input
                type="text"
                id="descriptionInput"
                name="describe"
                placeholder="Describe your event"
                value={formData.describe}
                onChange={handleChange}
                className={styles.input}
              />
              <input
                type="datetime-local"
                id="startInput"
                name="start"
                value={formData.start}
                onChange={handleChange}
                className={styles.input}
              />
              <input
                type="datetime-local"
                id="endInput"
                name="end"
                value={formData.end}
                onChange={handleChange}
                className={styles.input}
              />
              <input
                type="email"
                id="emailInput"
                name="invitedInput"
                placeholder="Invite Guests"
                value={formData.invitedInput}
                onChange={handleChange}
                className={styles.input}
              />
              <div className={styles.labelDropdown}>
                <input
                  type="text"
                  id="labelInput"
                  name="label"
                  placeholder="Select Label"
                  value={formData.label.name}
                  onChange={handleLabelChange}
                  className={styles.input}
                />
                <div className={styles.labelOptions}>
                  {labelList.map(label => (
                    <div
                      key={label.name}
                      className={styles.labelOption}
                      onClick={() =>
                        handleLabelChange({ target: { value: label.name } })
                      }
                    >
                      {label.name}
                      <span
                        style={{
                          backgroundColor: label.color,
                          width: '10px',
                          height: '10px',
                          display: 'inline-block',
                          marginLeft: '5px',
                        }}
                      ></span>
                    </div>
                  ))}
                </div>
              </div>

              {/* <input
                type="text"
                id="labelInput"
                name="label"
                placeholder="Select Label"
                list="labelList"
                onChange={handleLabelChange}
                className={styles.input}
                value={formData.label.name}
              />
              <datalist id="labelList">
                {labelList.map(label => (
                  <option key={label.name} value={label.name}>
                    {label.name}
                    <span
                      style={{
                        backgroundColor: label.color,
                        width: '10px',
                        height: '10px',
                        display: 'inline-block',
                        marginLeft: '5px',
                      }}
                    ></span>
                  </option>
                ))}
              </datalist> */}
            </div>
          </div>
          <button
            type="button"
            className={` btn btn-primary ${styles.addGuestButton}`}
            onClick={handleAddGuest}
          >
            Add Guest
          </button>{' '}
          {/* Button to add Guest  */}
          <div className={styles.emailList}>
            {invitedGuest.map(email => (
              <div className={styles.invitedEmail}>{email}</div>
            ))}
          </div>
        </form>

        <div className={styles.buttonContainer}>
          <div className={styles.submitContainer}>
            <button className={styles.submitButton} form="my-form">
              {' '}
              {/* Form attribute to connect with form, because this button is outside of form */}
              Update Changes
            </button>
          </div>

          <div className={styles.submitContainer}>
            <button
              className={styles.submitButton}
              onClick={handleFinishEventClick}
            >
              {' '}
              Finish Event
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventUpdateForm;
