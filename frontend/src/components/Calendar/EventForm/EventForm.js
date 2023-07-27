import { React, useState } from 'react';
import styles from './EventForm.module.css';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faAlignLeft,
  faClock,
  faEnvelope,
  faCalendar,
  faTags,
} from '@fortawesome/free-solid-svg-icons';
import { useSelector, useDispatch } from 'react-redux'; //To manage Global State of Redux
import { toggle } from '../../../slices/ShowModalSlice'; //Import toggle function to turn on/off Modal
import { set, add, remove, update } from '../../../slices/MonthEventsSlice';
import { addTodayEvent } from '../../../slices/TodayEventsSlice';

const EventForm = () => {
  const dispatch = useDispatch(); //dispatch is to use function to interact with State of Redux
  const labelList = useSelector(state => state.Label.value);
  const exampleTokenForPhuoc = JSON.parse(localStorage.getItem('user')).token;
  //Example token to pass protect in backend route (We'll delete it later)
  const [formData, setFormData] = useState({
    name: '',
    describe: '',
    start: null,
    end: null,
    invitedInput: null,
    invited: [],
    label: {
      name: '',
      color: '',
    },
  });

  const [invitedGuest, setInvitedGuest] = useState([]); //state to store all of emails in an array

  const handleChange = e => {
    const name = e.target.name;
    let value = e.target.value;
    // Convert local date-time to UTC
    setFormData(prevData => ({
      ...prevData,
      [name]: value,
    }));
    console.log('new formdata is', formData);
  };

  const handleSubmit = async event => {
    event.preventDefault();
    console.log(event);
    dispatch(toggle());
    try {
      const response = await axios
        .post('http://localhost:5000/api/events/create', formData, {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${exampleTokenForPhuoc}`,
          },
        })
        .then(response => {
          console.log('Response:', response);
          dispatch(add(response.data));
          dispatch(addTodayEvent(response.data));
        });
      const ggToken = localStorage.getItem('ggToken');
      if (ggToken !== null) {
        let temp = await axios.post(
          'http://localhost:5000/api/users/googleevent',
          {
            EventForm: {
              summary: formData.name,
              description: formData.describe,
              start: {
                dateTime: formData.start,
                timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
              },
              end: {
                dateTime: formData.end,
                timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
              },
            },
            token: ggToken,
          },
          {
            headers: {
              'Content-Type': 'application/json',
            },
          },
        );
        console.log('gg response', temp);
      }
    } catch (error) {
      console.log(
        'There is an error when try to send POST REQUEST to http://localhost:5000/api/events/create',
      );
      console.log('ERROR: ', error);
    }
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

  // const handleLabelChange = e => {
  //   const selectedLabelName = e.target.value;
  //   console.log('Current SelectedLabelname is', selectedLabelName);
  //   const selectedLabel = labelList.find(
  //     label => label.name === selectedLabelName,
  //   );
  //   console.log('Current label object is', selectedLabel);
  //   if (selectedLabel) {
  //     setFormData(prevData => ({
  //       ...prevData,
  //       label: {
  //         name: selectedLabel.name,
  //         color: selectedLabel.color,
  //       },
  //     }));
  //   }
  //   console.log('curent formData is', formData);
  // };

  const handleLabelChange = selectedLabel => {
    console.log('Current SelectedLabel is', selectedLabel);
    if (selectedLabel) {
      setFormData(prevData => ({
        ...prevData,
        label: {
          name: selectedLabel.name,
          color: selectedLabel.color,
        },
      }));
    }
    console.log('current formData is', formData);
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className={styles.form} id="my-form">
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
                        onClick={() => handleLabelChange(label)}
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

        <button
          type="button"
          className={` btn btn-primary ${styles.addGuestButton}`}
          onClick={handleAddGuest}
        >
          Add Guest
        </button>{' '}
        <div className={styles.emailList}>
          {invitedGuest.map(email => (
            <div className={styles.invitedEmail}>{email}</div>
          ))}
        </div>
      </form>

      <div className={styles.submitContainer}>
        <button type="submit" className={styles.submitButton} form="my-form">
          Submit
        </button>
      </div>
    </div>
  );
};

export default EventForm;
