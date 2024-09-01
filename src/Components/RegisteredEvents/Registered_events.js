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
                            <div>
                                <div style={{width: '3rem'}}></div>
                                <CardTitle className='title'>Event name: {item.eve_name}</CardTitle>
                                <CardText className={item.status === 'Pending Approval' ? 'pending' : 'approved'}>
                                    {item.status === 'Pending Approval' ? item.status : 'Approved'}
                                </CardText>
                            </div>
                            <div className='info-layer'>
                                <CardText className='text'>Scheduled on: {item.date}</CardText>
                                <CardText className='text'>Main agenda: {item.purpose}</CardText>
                                <CardText className='text'>reporting time: {item.time}</CardText>
                                <CardText className='text'>Event venue: {item.venue}</CardText>
                                {item.status === 'Approved' && (
                                    <div className='redirect'>
                                        Please download your invitation for {item.eve_name} at 'My Invitations'
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