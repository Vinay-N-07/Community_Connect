import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { JsonToTable } from 'react-json-to-table';
import './Profile.css';
import loadingGif from './loading.gif'; 
import { Get_data, Update } from '../API';

function MyComponent() {
    const [info, setInfo] = useState([]);
    const { state } = useLocation();
    const { user } = state;
    const [res, setRes] = useState('');
    const [selectedField, setSelectedField] = useState(''); // Changed from key to selectedField
    const [input, setInput] = useState('');
    const [showEditForm, setShowEditForm] = useState(false);
    const [showEditButton, setShowEditButton] = useState(true);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [profile, setProfile] = useState({});
    const [isFetchingData, setIsFetchingData] = useState(true); 

    const collname = 'UserData';

    useEffect(() => {
        fetch(`${Get_data}/${collname}`)
            .then(response => response.json())
            .then(data => {
                setInfo(data);
                const profileData = data.find(info => info.username === user.username);
                if (profileData) {
                    setProfile({
                        'My Info': {
                            'username': profileData.username,
                            'email': profileData.email,
                            'date_of_birth':profileData.date_of_birth,
                            'age': profileData.age,
                            'gender':profileData.gender,
                            'address': profileData.address,
                            'phone': profileData.phone,
                            'volunteer_type': profileData.volunteer_type,
                            'area_of_interest': profileData.area_of_interest
                            
                            
                        }
                    });
                }
                setIsFetchingData(false);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
                setError('Failed to fetch user data');
                setIsFetchingData(false); 
            });
    }, [user.username]);

    const updateProfile = async (selectedField, input) => {
        setLoading(true);
        try {
            const response = await fetch(`${Update}/${user.username}/${selectedField}/${input}`);
            const data = await response.json();
            setRes(data);
            setProfile(prevProfile => ({
                ...prevProfile,
                'My Info': {
                    ...prevProfile['My Info'],
                    [selectedField]: input
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
        if (!selectedField || !input.trim()) {
            setError('Field and Input fields cannot be empty.');
            setTimeout(() => setError(''), 3000);
            return;
        }
        setShowEditForm(false);
        updateProfile(selectedField, input);
    };

    return (
        <div>
            <div className="profile-main">Volunteer's profile</div>
            {isFetchingData ? (
                <div className='loading-container'>
                    <img src={loadingGif} alt="Loading..." />
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
                                    <label htmlFor="selectedField">Select the field: </label>
                                    <select
                                        className='width'
                                        id="selectedField"
                                        value={selectedField}
                                        onChange={(e) => setSelectedField(e.target.value)}
                                    >
                                        <option value="">Select Field</option>
                                        <option value="username">Username</option>
                                        <option value="email">Email</option>
                                        <option value="age">Age</option>
                                        <option value="address">Address</option>
                                        <option value="phone">Phone</option>
                                        <option value="volunteer_type">Volunteer Type</option>
                                        <option value="area_of_interest">Area of Interest</option>
                                    </select>
                                </div>
                                <div>
                                    <label htmlFor="input">Insert: </label>
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
