import React, { useState } from 'react';
import Addevent from './Addevent';
import './Admin.css';
import ApprovalList from './Approval';

const LoadAndExecuteScript = () => {
    const [showaddevent, setShowaddevent] = useState(false);
    const [showapproval, setShowapproval] = useState(false);

    const handleClickforAD = () => {
        setShowaddevent(prevShowAdmin => !prevShowAdmin);
    };
    const handleClickforApproval = () => {
        setShowapproval(prevShowAdmin => !prevShowAdmin);
    };

    return (
        <div className='admin-page'>
            <div className='admin-dashboard'>Community crusaders - Administration centre</div>
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

