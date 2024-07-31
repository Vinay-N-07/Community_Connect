import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { JsonToTable } from 'react-json-to-table';
import './Profile.css';

function MyComponent() {
    const { state } = useLocation();
    const { user } = state;
    const [res, setRes] = useState('');
    const [key, setKey] = useState('');
    const [input, setInput] = useState('');
    const [showEditForm, setShowEditForm] = useState(false);
    const [showEditButton, setShowEditButton] = useState(true);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const profileData = {
        'My Info': {
            'username': user.username,
            'email': user.email,
            'address': user.address,
            'phone': user.phone,
            'volunteer_type': user.volunteer_type,
            'area_of_interest': user.area_of_interest
        }
    };

    const updateProfile = async (key, input) => {
        setLoading(true);
        try {
            const response = await fetch(`http://localhost:5000/update_user_data/${user.username}/${key}/${input}`);
            const data = await response.json();
            setRes(data);
        } catch (err) {
            console.error('Error fetching data:', err);
            setError('Failed to update changes');
        } finally {
            setLoading(false);
            setTimeout(() => {
                setRes('');
                setShowEditButton(true);
            }, 3000);
        }
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        if (!key.trim() || !input.trim()) {
            setError('Key and Input fields cannot be empty.');
            setTimeout(() => setError(''), 3000);
            return;
        }
        setShowEditForm(false);
        updateProfile(key, input);
    };

    return (
        <div>
            <div className="profile-main">Volunteer's profile</div>
            <div className="profile-json">
                <JsonToTable json={profileData} />
            </div>
            <div className='edit'>
                {showEditButton && (
                    <button className='btt' onClick={() => { setShowEditForm(true); setShowEditButton(false); }}>
                        Edit Profile
                    </button>
                )}
                {showEditForm && (
                    <form onSubmit={handleSubmit}>
                        {error && <p className='red'>{error}</p>}
                        <div>
                            <label htmlFor="key">Select the field:   </label>
                            <input
                                className='width'
                                id="key"
                                type="text"
                                value={key}
                                onChange={(e) => setKey(e.target.value)}
                                placeholder="Select the field you want to edit (ex: username)"
                            />
                        </div>
                        <div>
                            <label htmlFor="input">Insert:   </label>
                            <input
                                className='width'
                                id="input"
                                type="text"
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                placeholder="Insert new value"
                            />
                        </div>
                        <button type="submit" disabled={loading} >
                            {loading ? 'Loading...' : 'Submit'}
                        </button>
                    </form>
                )}
                {res && <p className='success'>{res[0]?.message || 'No message available'}</p>}
            </div>
        </div>
    );
}

export default MyComponent;
