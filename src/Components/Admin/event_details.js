import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, CardBody, CardTitle, CardText, Button } from 'reactstrap';
import { utils, write } from 'xlsx';
import { saveAs } from 'file-saver';
import './EventDetails.css';
import loadingGif from './loading.gif';
import { Event_details } from '../API';

const EventDetails = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [expandedParticipant, setExpandedParticipant] = useState(null);

    useEffect(() => {
        fetch(Event_details)  // Replace with your actual API endpoint
            .then(response => response.json())
            .then(data => {
                setData(data);
                setLoading(false);
            })
            .catch(error => {
                setError(error);
                setLoading(false);
            });
    }, []);

    const handleParticipantClick = (eventName, participant) => {
        setExpandedParticipant(prev => (
            prev && prev.eventName === eventName && prev.participant === participant
                ? null
                : { eventName, participant }
        ));
    };

    const downloadExcel = (eventName) => {
        const wsData = [];

        data.forEach(event => {
            if (Object.keys(event)[0] === eventName) {
                const participants = event[eventName];
                Object.entries(participants).forEach(([participant, details]) => {
                    details.forEach(detail => {
                        wsData.push({
                            Event: eventName,
                            Participant: participant,
                            Email: detail.email,
                            Address: detail.address,
                            Phone: detail.phone,
                            VolunteerType: detail.volunteer_type,
                            AreaOfInterest: detail.area_of_interest
                        });
                    });
                });
            }
        });

        if (wsData.length === 0) {
            alert("No data available for this event.");
            return;
        }

        const ws = utils.json_to_sheet(wsData);
        const wb = utils.book_new();
        utils.book_append_sheet(wb, ws, "EventDetails");
        const wbout = write(wb, { bookType: "xlsx", type: "array" });

        const blob = new Blob([wbout], { type: "application/octet-stream" });
        saveAs(blob, `${eventName}_details.xlsx`);
    };

    return (
        <Container className="event-details-container">
            {loading ? (
                <div style={{ display: 'flex', justifyContent: 'centre', marginTop: '20%' }}>
                    <img src={loadingGif} alt="Loading..." />
                </div>
            ) : error ? (
                <p>Error fetching data: {error.message}</p>
            ) : data.length === 0 ? (
                <div>
                    <div >No event data available.</div>
                </div>
            ) : (
                data.map((event, index) => {
                    const eventName = Object.keys(event)[0];
                    const participants = event[eventName];

                    return (
                        <Row key={index} className="mb-4">
                            <Col style={{background:'#c0dabd',borderRadius: '10px', width: '30rem', cursor: 'pointer', margin: '20px' }}>
                                <Card className="event-card">
                                    <CardBody>
                                        <Row className="align-items-center">
                                            <Col>
                                                <CardTitle tag="h5" className="event-title">Event name: {eventName}</CardTitle>
                                            </Col>
                                        </Row>
                                        <div style={{ display: 'flex', justifyContent: 'center', color: 'blue' }}>List of volunteers enrolled</div>
                                        {Object.entries(participants).map(([participant, details], idx) => (
                                            <CardText key={idx} className="participant-info">
                                                <div
                                                    className="participant-name"
                                                    onClick={() => handleParticipantClick(eventName, participant)}
                                                >
                                                    {participant}
                                                </div>
                                                {expandedParticipant && expandedParticipant.eventName === eventName && expandedParticipant.participant === participant && (
                                                    <div className="detail-container">
                                                        {details.map((detail, detailIndex) => (
                                                            <div key={detailIndex} className="detail-item">
                                                                <p><strong>Email:</strong> {detail.email}</p>
                                                                <p><strong>Address:</strong> {detail.address}</p>
                                                                <p><strong>Phone:</strong> {detail.phone}</p>
                                                                <p><strong>Volunteer Type:</strong> {detail.volunteer_type}</p>
                                                                <p><strong>Area of Interest:</strong> {detail.area_of_interest}</p>
                                                            </div>
                                                        ))}
                                                    </div>
                                                )}
                                            </CardText>
                                        ))}
                                    </CardBody>
                                    <div style={{ display: 'flex', justifyContent: 'center' }}>
                                        <button color="primary" className='excel_download' onClick={() => downloadExcel(eventName)}>
                                            Download {eventName} event details
                                        </button>
                                    </div>
                                </Card>
                            </Col>
                        </Row>
                    );
                })
            )}
        </Container>
    );
};

export default EventDetails;
