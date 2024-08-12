import React, { useState, useEffect } from 'react';
import { Card, CardBody, CardTitle, CardText } from 'reactstrap';
import { useLocation } from 'react-router-dom';
import './Registered_event.css';
const RegisteredEvent = () => {
    const { state } = useLocation();
    const { user } = state;
    const [registeredevents, setRegisteredevents] = useState([]);
    useEffect(() => {
        fetch(`http://localhost:5000/RegisteredEvents/${user.username}`)
            .then(response => {
                return response.json();
            })
            .then(data => {
                setRegisteredevents(data);
                console.log(data);

            })
    }, []);


    return (
        <div>
            <div className='register-dashboard-text'>Registered events</div>
            {registeredevents.map((item, index) => (
                <Card key={index} className='reg'>
                    <CardBody className='reg-bod'>
                        <div>
                            <CardTitle className='title'>{item.eve_name}</CardTitle>
                            <div className='info-layer'>
                                <CardText className='text'>Date: {item.date}</CardText>
                                <CardText className='text'>Purpose: {item.purpose}</CardText>
                                <CardText className='text'>Timing: {item.time}</CardText>
                                <CardText className='text'>Venue: {item.venue}</CardText>
                                <CardText className={item.status === 'Pending Approval' ? 'pending' : 'approved'}>
                                    {item.status === 'Pending Approval' ? item.status : 'Approved'}
                                </CardText>
                                {item.status === 'Approved' && (
                                    <div className='redirect'>
                                        Please download your invitation for {item.eve_name}
                                    </div>
                                )}
                            </div>
                        </div>
                    </CardBody>
                </Card>
            ))}
            <div>{registeredevents.lenght >= 0 && <span >{registeredevents}</span>}</div>
        </div>

    );

}
export default RegisteredEvent;