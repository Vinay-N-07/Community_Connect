import React, { useState, useEffect, useRef } from 'react';
import { toJpeg } from 'html-to-image';
import download from 'downloadjs';
import { useLocation } from 'react-router-dom';
import logo from './logo.jpg';
import loadingGif from './loading.gif'; // Add your loading GIF file in the same directory
import './Invitation.css';

const Invitation = () => {
    const { state } = useLocation();
    const { user } = state;
    const [invited, setInvited] = useState([]);
    const [loading, setLoading] = useState(true);
    const invitationRef = useRef();

    useEffect(() => {
        fetch(`http://localhost:5000/download_invitation/${user.username}`)
            .then(response => response.json())
            .then(data => {
                setInvited(data);
                setLoading(false);  // Set loading to false after data is fetched
                console.log(data);
            });
    }, [user.username]);

    const handleDownload = () => {
        if (invitationRef.current === null) {
            return;
        }

        toJpeg(invitationRef.current, { quality: 0.95 })
            .then((dataUrl) => {
                download(dataUrl, 'invitation.jpg');
            })
            .catch((err) => {
                console.error('Failed to convert HTML to JPG', err);
            });
    };

    return (
        <div>
            <div className='my-invite'>My Invitations</div>
            <div style={{
                display: 'flex',
                justifyContent: 'center',
                fontSize: 'larger',
                background: 'rgba(0, 0, 0, 0.5)',
                color: 'antiquewhite',
                fontWeight: '200'
            }}>
                Kindly download the invitations for the events you have registered for.
            </div>
            {loading ? (
                <div style={{ display: 'flex', justifyContent: 'center', marginTop: '10rem' }}>
                    <img src={loadingGif} alt="Loading..." />
                </div>
            ) : invited.length === 0 ? (
                <div style={{
                    display: 'flex',
                    justifyContent: 'center',
                    marginTop: '10rem',
                    fontSize: 'xx-large',
                    fontFamily: 'fantasy',
                    color: 'currentColor'
                }}>
                    You don't have approved registered events.
                </div>
            ) : (
                invited.map((item, index) => (
                    <div key={index} className='invite-main'>
                        <div ref={invitationRef} className='invite-body'>
                            <div>
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
                                    <div>Community Compass</div>
                                </div>
                                <div className='invite-title'>YOU ARE INVITED!</div>
                                <div className='letter'>
                                    <p>Dear {user.username},</p>
                                    <p>We hope this message finds you well. 🌟</p>
                                    <p>As part of our commitment to positive change, we are thrilled to invite you to our upcoming NGO activity: <strong>{item.eve_name}</strong>. This event promises to be an inspiring gathering where we come together to make a difference in the lives of those who need it most.</p>
                                    <ul>
                                        <li>Date: {item.date}</li>
                                        <li>Time: {item.time}</li>
                                        <li>Venue: {item.venue}</li>
                                    </ul>
                                    <p>Whether you’re a long-time supporter or new to our cause, your presence matters. Let’s create ripples of change together!</p>
                                    <p>Kindly RSVP by {item.date} to ensure we reserve a spot for you. Feel free to bring friends and family—everyone is welcome.</p>
                                    <p>Thank you for being part of our journey. We look forward to seeing you there!</p>
                                    <p>Warm regards,</p>
                                    <strong>
                                        Event Manager
                                        <p>Community Compass</p>
                                    </strong>
                                </div>
                            </div>
                        </div>
                        <button className='invite-dl' onClick={handleDownload}>Download Invitation</button>
                    </div>
                ))
            )}
        </div>
    );
}

export default Invitation;
