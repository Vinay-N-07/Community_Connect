import React, { useRef } from 'react';
import { toJpeg } from 'html-to-image';
import download from 'downloadjs';
import './Invitation.css'; // Import CSS for styling

const Invitation = ({ title, message, sender }) => {
    const invitationRef = useRef();

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
            <div ref={invitationRef} className="invitation-content">
                <h1>{title}</h1>
                <p>{message}</p>
                <p>From: {sender}</p>
            </div>
            <button onClick={handleDownload}>Download Invitation</button>
        </div>
    );
};

export default Invitation;
