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
    const [showEventDetails, setShowEventDetails] = useState(false); // State for EventDetails
    const navigate = useNavigate();

    const handleClickForAddevent = () => {
        setShowAddevent(prev => !prev);
    };

    const handleClickForApproval = () => {
        setShowApproval(prev => !prev);
    };

    const handleClickForFileUpload = () => {
        setShowFileUpload(prev => !prev);
    };

    const handleClickForEventDetails = () => {
        setShowEventDetails(prev => !prev);
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
                <div className='dash-text'>Community Crusaders - Administration Centre</div>
                <div className='log'>
                    <button onClick={logout} className='btn logout-btn'>Logout</button>
                </div>
            </div>
            <div style={{display: 'contents'}}>
            <div className='handle-button'>
                <button onClick={handleClickForAddevent} className='btn'>
                    {showAddevent ? 'Hide Event Management' : 'Event Management'}
                </button>
            </div>
            {showAddevent && <Addevent />}

            <div className='handle-button'>
                <button onClick={handleClickForApproval} className='btn'>
                    {showApproval ? 'Hide Approval Requests' : 'Approval Requests'}
                </button>
            </div>
            {showApproval && <ApprovalList />}

            <div className='handle-button'>
                <button onClick={handleClickForFileUpload} className='btn'>
                    {showFileUpload ? 'Hide File Upload' : 'File Upload'}
                </button>
            </div>
            {showFileUpload && <FileUpload />}

            <div className='handle-button'>
                <button onClick={handleClickForEventDetails} className='btn'>
                    {showEventDetails ? 'Hide Event Details' : 'Event Details'}
                </button>
            </div>
            <div>
                {showEventDetails && <EventDetails />}
            </div>
            </div>
        </div>
    );
};

export default LoadAndExecuteScript;
