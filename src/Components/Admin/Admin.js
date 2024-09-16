import React, { useState } from 'react';
import Addevent from './Addevent';
import './Admin.css';
import ApprovalList from './Approval';
import { useNavigate } from 'react-router-dom';
import FileUpload from './upload';
import logo from './logo.jpg';
import EventDetails from './event_details';

const LoadAndExecuteScript = () => {
    const [showAddevent, setShowAddevent] = useState(false);
    const [showApproval, setShowApproval] = useState(false);
    const [showFileUpload, setShowFileUpload] = useState(false);
    const [showEventDetails, setShowEventDetails] = useState(false);
    const navigate = useNavigate();

    const handleClickForAddevent = () => {
        setShowAddevent(prev => !prev);
        setShowApproval(false);
        setShowFileUpload(false);
        setShowEventDetails(false);
    };

    const handleClickForApproval = () => {
        setShowApproval(prev => !prev);
        setShowAddevent(false);
        setShowFileUpload(false);
        setShowEventDetails(false);
    };

    const handleClickForFileUpload = () => {
        setShowFileUpload(prev => !prev);
        setShowAddevent(false);
        setShowApproval(false);
        setShowEventDetails(false);
    };

    const handleClickForEventDetails = () => {
        setShowEventDetails(prev => !prev);
        setShowAddevent(false);
        setShowApproval(false);
        setShowFileUpload(false);
    };

    const logout = () => {
        navigate('/login');
    };

    return (
        <div className='admin-page'>
            <div className='admin-dashboard'>
                <div className='align'>
                    <header>
                        <img
                            src={logo}
                            alt="Logo"
                            style={{
                                display: 'flex',
                                width: '40px',
                                height: '40px',
                                borderRadius: '50%',
                                objectFit: 'cover',
                                padding: '4px'
                            }}
                        />
                    </header>
                </div>
                <div className='dash-text'>Community Compass - Administration Centre</div>
                <div className='log'>
                    <button onClick={logout} className='btn logout-btn'>Logout</button>
                </div>
            </div>
            <div className="admin-info-box">
                <p><strong>Administrator</strong> possesses the authority to:</p>
                <ul>
                    <li>Create and manage events</li>
                    <li>Review and approve participation requests from volunteers</li>
                    <li>Upload recent event photos to the <em>Community Compass</em> gallery</li>
                    <li>Access detailed information about each event, with the option to download the details in an Excel file</li>
                </ul>
            </div>
            
            {/* Button group in a single row */}
            <div className="button-row">
                <button onClick={handleClickForAddevent} className='btn'>
                    {showAddevent ? 'Hide Event Management' : 'Event creation'}
                </button>
                <button onClick={handleClickForApproval} className='btn'>
                    {showApproval ? 'Hide Approval Requests' : 'Event approval requests'}
                </button>
                <button onClick={handleClickForFileUpload} className='btn'>
                    {showFileUpload ? 'Hide File Upload' : 'Gallery management'}
                </button>
                <button onClick={handleClickForEventDetails} className='btn'>
                    {showEventDetails ? 'Hide Event Details' : 'Event details'}
                </button>
            </div>

            {/* Content shown below the buttons */}
            <div className="content-display">
                {showAddevent && <Addevent />}
                {showApproval && <ApprovalList />}
                {showFileUpload && <FileUpload />}
                {showEventDetails && <EventDetails />}
            </div>
        </div>
    );
};

export default LoadAndExecuteScript;
