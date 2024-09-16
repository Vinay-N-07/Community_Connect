import React, { useState } from 'react';
import { Add_event } from '../API';
import './Addevent.css';

const Addevent = () => {
    const [eventname, setEventName] = useState('');
    const [venue, setVenue] = useState('');
    const [date, setDate] = useState('');
    const [time, setTime] = useState('');
    const [purpose, setPurpose] = useState('');
    const [strength, setStrength] = useState('');
    const [apiResponse, setApiResponse] = useState('');
    const [desc, setDesc] = useState('');

    const handleAddEvent = (e) => {
        e.preventDefault();
        // Replace with your API endpoint
        fetch(`${Add_event}/${eventname}/${venue}/${date}/${time}/${purpose}/${strength}/${desc}`)
            .then(response => response.json())
            .then(data => {
                setApiResponse(data);
                console.log(data);
            });
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
                <label htmlFor='desc'>Event description</label>
                <input type='text' id='desc' value={desc} onChange={(e) => setDesc(e.target.value)}/>
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
                <div>
                    <label>
                        <input
                            type="radio"
                            name="purpose"
                            value="Plantation"
                            checked={purpose === 'Plantation'}
                            onChange={(e) => setPurpose(e.target.value)}
                        />
                        Plantation
                    </label>
                    <label>
                        <input
                            type="radio"
                            name="purpose"
                            value="Blood Donation"
                            checked={purpose === 'Blood Donation'}
                            onChange={(e) => setPurpose(e.target.value)}
                        />
                        Blood Donation
                    </label>
                    <label>
                        <input
                            type="radio"
                            name="purpose"
                            value="Orphanage"
                            checked={purpose === 'Orphanage'}
                            onChange={(e) => setPurpose(e.target.value)}
                        />
                        Orphanage
                    </label>
                    <label>
                        <input
                            type="radio"
                            name="purpose"
                            value="Elderly Care"
                            checked={purpose === 'Elderly Care'}
                            onChange={(e) => setPurpose(e.target.value)}
                        />
                        Elderly Care
                    </label>
                    <label>
                        <input
                            type="radio"
                            name="purpose"
                            value="Animal Rescue"
                            checked={purpose === 'Animal Rescue'}
                            onChange={(e) => setPurpose(e.target.value)}
                        />
                        Animal Rescue
                    </label>
                </div>

                <label htmlFor="strength">Maximum strength of the event</label>
                <input
                    type="text"
                    id="strength"
                    value={strength}
                    onChange={(e) => setStrength(e.target.value)}
                />

                <button type="submit">Create Event</button>
            </form>
            <div>
                {apiResponse.length === 1 && <span>{apiResponse[0].message}</span>}
            </div>
        </div>
    );
};

export default Addevent;
