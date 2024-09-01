import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { JsonToTable } from 'react-json-to-table';
import './Profile.css';
import loadingGif from './loading.gif'; // Make sure the path to your loading GIF is correct

function MyComponent() {
    const [info, setInfo] = useState([]);
    const { state } = useLocation();
    const { user } = state;
    const [res, setRes] = useState('');
    const [key, setKey] = useState('');
    const [input, setInput] = useState('');
    const [showEditForm, setShowEditForm] = useState(false);
    const [showEditButton, setShowEditButton] = useState(true);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [profile, setProfile] = useState({});
    const [isFetchingData, setIsFetchingData] = useState(true); // Add state for fetching data

    const collname = 'UserData';

    useEffect(() => {
        fetch(`http://localhost:5000/getUsers/${collname}`)
            .then(response => response.json())
            .then(data => {
                setInfo(data);
                const profileData = data.find(info => info.username === user.username);
                if (profileData) {
                    setProfile({
                        'My Info': {
                            'username': profileData.username,
                            'email': profileData.email,
                            'address': profileData.address,
                            'phone': profileData.phone,
                            'volunteer_type': profileData.volunteer_type,
                            'area_of_interest': profileData.area_of_interest
                        }
                    });
                }
                setIsFetchingData(false); // Set fetching data to false after data is fetched
            })
            .catch(error => {
                console.error('Error fetching data:', error);
                setError('Failed to fetch user data');
                setIsFetchingData(false); // Set fetching data to false in case of error
            });
    }, [user.username]);

    const updateProfile = async (key, input) => {
        setLoading(true);
        try {
            const response = await fetch(`http://localhost:5000/update_user_data/${user.username}/${key}/${input}`);
            const data = await response.json();
            setRes(data);
            setProfile(prevProfile => ({
                ...prevProfile,
                'My Info': {
                    ...prevProfile['My Info'],
                    [key]: input
                }
            }));
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
            {isFetchingData ? (
                <div className='loading-container'>
                    <img src={loadingGif} alt="Loading..." className='loading-gif' />
                </div>
            ) : (
                <>
                    <div className="profile-json">
                        <JsonToTable json={profile} />
                    </div>
                    <div className='edit'>
                        {showEditButton && (
                            <button className='btt' onClick={() => { setShowEditForm(true); setShowEditButton(false); }}>
                                Edit Profile
                            </button>
                        )}
                        {showEditForm && (
                            <form onSubmit={handleSubmit}>
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
                                <button type="submit" disabled={loading}>
                                    {loading ? 'Loading...' : 'Submit'}
                                </button>
                            </form>
                        )}
                    </div>
                    {res && <p className='success'>{res[0]?.message || 'No message available'}</p>}
                    {error && <p className='red'>{error}</p>}
                </>
            )}
        </div>
    );
}

export default MyComponent;
