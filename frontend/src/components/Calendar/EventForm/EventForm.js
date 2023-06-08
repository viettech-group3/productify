import { React, useState } from 'react';
import styles from './EventForm.module.css';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faAlignLeft,
  faClock,
  faEnvelope,
  faCalendar,
} from '@fortawesome/free-solid-svg-icons';

const EventForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    describe: '',
    start: null,
    end: null,
    invited: null,
  });

  const handleChange = e => {
    console.log('input infor', e);
    const name = e.target.name;
    const value = e.target.value;
    setFormData(prevData => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async event => {
    event.preventDefault();
    console.log(event);
    try {
      const response = await axios.post(
        'http://localhost:5000/api/events/create',
        formData,
        {
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );
      console.log('Response:', response);
    } catch (error) {
      console.log(
        'There is an error when try to send POST REQUEST to http://localhost:5000/api/events/create',
      );
      console.log('ERROR: ', error);
    }
  };
  return (
    <form onSubmit={handleSubmit} className={styles.form}>
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
            type="text"
            id="emailInput"
            name="invited"
            placeholder="Invite Guests"
            value={formData.invited}
            onChange={handleChange}
            className={styles.input}
          />
        </div>
      </div>

      <div className={styles.submitContainer}>
        <button type="submit" className={styles.submitButton}>
          Submit
        </button>
      </div>
    </form>
  );
};

export default EventForm;
