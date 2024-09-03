import React, { useState, useEffect } from 'react';
import { Card, CardBody, CardTitle, CardText } from 'reactstrap';
import { useLocation } from 'react-router-dom';
import './Registered_event.css';
import loadingGif from './loading.gif'; 

const RegisteredEvent = () => {
    const { state } = useLocation();
    const { user } = state;
    const [registeredevents, setRegisteredevents] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch(`http://localhost:5000/RegisteredEvents/${user.username}`)
            .then(response => response.json())
            .then(data => {
                setRegisteredevents(data);
                setLoading(false); 
                console.log(data);
            });
    }, [user.username]);

    return (
        <div>
            <div className='register-dashboard-text'>Registered events</div>
            <div style={{
                display: 'flex',
                justifyContent: 'center',
                fontSize: 'larger',
                background: 'rgba(0, 0, 0, 0.5)',
                color: 'antiquewhite',
                fontWeight: '200'
            }}>
                Volunteers have the ability to view the events in which they are enrolled, along with their approval status.
            </div>
            {loading ? (
                <div style={{ display: 'flex', justifyContent: 'center', marginTop: '10rem' }}>
                    <img src={loadingGif} alt="Loading..." />
                </div>
            ) : registeredevents.length === 0 ? (
                <div style={{
                    display: 'flex',
                    justifyContent: 'center',
                    marginTop: '10rem',
                    fontSize: 'xx-large',
                    fontFamily: 'fantasy',
                    color: 'currentColor'
                }}>
                    You are not registered for any events.
                </div>
            ) : (
                registeredevents.map((item, index) => (
                    <Card key={index} className='reg'>
                        <CardBody className='reg-bod'>
                            <div>
                                <div>
                                    <div style={{ width: '3rem' }}></div>
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
                ))
            )}
        </div>
    );
};

export default RegisteredEvent;
