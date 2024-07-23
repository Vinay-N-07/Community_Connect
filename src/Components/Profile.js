import React from "react";
import { useLocation } from 'react-router-dom';
import { JsonToTable } from 'react-json-to-table';
import './Profile.css';
function MyComponent() {
    const { state } = useLocation();
    const { user } = state;
    const myjson = {
        'Name': user.username,
        'Email': user.email,
        'Address':user.address,
        'Phone':user.phone,
        'Volunteer type': user.volunteer_type,
        'Area of interest': user.area_of_interest
    }
    return (
        <div>
            <div className="profile-main">Volunteer's profile</div>
            <div className="profile-json">
                <JsonToTable json={myjson} />
            </div>
        </div>

    );
}

export default MyComponent;