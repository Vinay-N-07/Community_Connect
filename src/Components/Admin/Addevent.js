import React, { useState } from 'react';
import './Addevent.css';

const Addevent = () => {
    

    const [eventname, setEventName] = useState('');
    const [venue, setVenue] = useState('');
    const [date, setDate] = useState('');
    const [time, setTime] = useState('');
    const [purpose, setPurpose] = useState('');
    const [apiResponse, setApiResponse] = useState('');

    const handleAddEvent = (e) => {
        e.preventDefault();
        // Replace with your API endpoint
        fetch(`http://localhost:5000/add_event/${eventname}/${venue}/${date}/${time}/${purpose}`)
            .then(response => {
                return response.json();
            })
            .then(data => {
                setApiResponse(data);
                console.log(data);

            })

    };
    return (
        <div className="event-form">
            <h2>Create Event</h2>
            <form onSubmit={handleAddEvent}>
                <label htmlFor="eventname">Event Name</label>
                <input
                    type="text"
                    id="eventname"
                    value={eventname}
                    onChange={(e) => setEventName(e.target.value)}
                />

                <label htmlFor="venue">Venue</label>
                <input
                    type="text"
                    id="venue"
                    value={venue}
                    onChange={(e) => setVenue(e.target.value)}
                />

                <label htmlFor="date">Date</label>
                <input
                    type="date"
                    id="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                />

                <label htmlFor="time">Time</label>
                <input
                    type="time"
                    id="time"
                    value={time}
                    onChange={(e) => setTime(e.target.value)}
                />

                <label htmlFor="purpose">Purpose</label>
                <input
                    type="text"
                    id="purpose"
                    value={purpose}
                    onChange={(e) => setPurpose(e.target.value)}
                />

                <button type="submit">Create Event</button>
            </form>
            <div>
                {apiResponse.length === 1 && <span>{apiResponse[0].message}</span>}
            </div>
        </div>
    )


};

export default Addevent;
