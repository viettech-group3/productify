import { React, useState } from 'react'
import styles from './EventForm.module.css'
import axios from 'axios';

const EventForm = () => {
    const [formData, setFormData] = useState({
        name: '',
        describe: '',
        start: null,
        end: null,
        invited: null

    })

    const handleChange = (e) => {
        console.log("input infor", e)
        const name = e.target.name;
        const value = e.target.value;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        console.log(event);
        try {
            const response = await axios.post('http://localhost:5000/api/events/create', formData, {
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            console.log('Response:', response);
        } catch (error) {
            console.log('There is an error when try to send POST REQUEST to http://localhost:5000/api/events/create')
            console.log("ERROR: ", error)
        }
    }
    return (
        <form onSubmit={handleSubmit}>
            <input type="text" id="title" name="name" placeholder="Add Title" autoFocus className={styles.input} value={formData.name} onChange={handleChange} />
            <span><button className="btn btn-muted">Event</button></span>
            <span><button className="btn btn-muted">Task</button></span>
            <span><button className="btn btn-muted">Reminder</button></span>
            <span><button className="btn btn-muted">Event</button></span>

            <label form="descriptionInput">Description</label>
            <input type="text" id="descriptionInput" name="describe" placeholder="Desribe your event" value={formData.describe} onChange={handleChange} />

            <label for="startInput">Start</label>
            <input type="datetime-local" id="startInput" name="start" value={formData.start} onChange={handleChange} />

            <label for="endInput">End</label>
            <input type="datetime-local" id="endInput" name="end" value={formData.end} onChange={handleChange} />

            <label form="emailInput">Invite Guest</label>
            <input type="text" id="emailInput" name="invited" placeholder="Invite Guests" value={formData.invited} onChange={handleChange} />

            <div className="py-2">Label Icon + Label Input</div>
            <div className="d-flex align-items-center justify-content-end">
                <button type='submit' className="me-3">Submit</button>
            </div>
        </form>
    )
}

export default EventForm;