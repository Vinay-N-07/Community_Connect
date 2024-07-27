import React, { useState } from 'react';
import Addevent from './Addevent';
import './Admin.css';
import ApprovalList from './Approval';
import { useNavigate } from 'react-router-dom';

const LoadAndExecuteScript = () => {

    const [showaddevent, setShowaddevent] = useState(false);
    const [showapproval, setShowapproval] = useState(false);
    const navigate = useNavigate();

    const handleClickforAD = () => {
        setShowaddevent(prevShowAdmin => !prevShowAdmin);
    };
    const handleClickforApproval = () => {
        setShowapproval(prevShowAdmin => !prevShowAdmin);
    };

    function Logout() {
        navigate('/login');
    }

    return (
        <div className='admin-page'>
            <div className='admin-dashboard'>
                <div className='dash-text'>Community crusaders - Administration centre</div>
                <div className='log'>
                    <button onClick={Logout}>Logout</button>
                </div>
            </div>

            <div className='handle-button'>
                <button onClick={handleClickforAD} className='btn'>
                    {showaddevent ? 'Hide' : 'Event management '}
                </button>
            </div>
            {showaddevent && <Addevent />}
            <div className='handle-button'>
                <button onClick={handleClickforApproval} className='btn'>
                    {showaddevent ? 'Hide' : 'Approval request '}
                </button>
            </div>
            {showapproval && <ApprovalList />}

        </div>
    );
};

export default LoadAndExecuteScript;

