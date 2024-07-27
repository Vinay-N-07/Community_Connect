import React, { useState, useEffect } from 'react';
import * as htmlToImage from 'html-to-image';
import { Card, CardBody, CardTitle, CardText } from 'reactstrap';
import { useLocation } from 'react-router-dom';
import './Registered_event.css';
import Invitation from './invitation';
const RegistedEvent = () => {
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

    const handleDownload = async () => {
        const node = document.getElementById('my-node'); // Replace with your element ID
        const dataUrl = await htmlToImage.toJpeg(node, { quality: 0.95 });
        const link = document.createElement('a');
        link.download = 'my-image.jpg';
        link.href = dataUrl;
        link.click();
    };
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
                                    <Invitation title='hi' message='hello' sender='how are you' />

                                )}
                            </div>
                        </div>
                    </CardBody>
                </Card>
            ))}
            <div>{registeredevents.lenght >= 0 && <span >{registeredevents}</span>}</div>
            {/* <div>
                <button onClick={handleDownload}>Download as JPG</button>
            </div> */}

        </div>

    );

}
export default RegistedEvent;