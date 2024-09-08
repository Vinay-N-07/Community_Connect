import React, { useState, useEffect } from 'react';
import { Card, CardBody, CardTitle, CardText, Button } from 'reactstrap';
import './Approval.css';
import loadingGif from './loading.gif';

const ApprovalList = () => {
    const [data, setData] = useState([]);
    const [result, setResult] = useState('');
    const [loading, setLoading] = useState(true);
    const collname = 'RegistedEvent';

    useEffect(() => {
        fetch(`http://localhost:5000/getUsers/${collname}`)
            .then(response => response.json())
            .then(data => {
                setData(data);
                setLoading(false);
            })
            .catch(error => {
                console.error("Error fetching data:", error);
                setLoading(false);
            });
    }, []);

    const handleApprove = async (name, event) => {
        try {
            const response = await fetch(`http://localhost:5000/approval/${name}/${event}`);
            const data = await response.json();
            setResult(data);
            console.log(data);
        } catch (error) {
            console.error("Error approving the request:", error);
        }
    };

    return (
        <div>
            {loading ? (
                <div style={{ textAlign: 'center', marginTop: '20%' }}>
                    <img src={loadingGif} alt="Loading..." />
                </div>
            ) : data.length === 0 ? (
                <div style={{
                    display: 'flex',
                    justifyContent: 'center',
                }}>
                    No Approval Requests.
                </div>
            ) : (
                <div className="main">
                    {data.map((item, index) => (
                        <Card key={index} className='layer1'>
                            <CardBody>
                                <CardTitle className="main-text">Name of volunteer: {item.name}</CardTitle>
                                <CardTitle className="main-text">Event name: {item.eve_name}</CardTitle>
                                <CardTitle className="main-text">Scheduled date: {item.date}</CardTitle>
                                <CardText className="main-text">Status: {item.status}</CardText>
                                <div className='layout'>
                                    {item.status === 'Pending Approval' && (
                                        <Button className='bt' onClick={() => handleApprove(item.name, item.eve_name)}>
                                            Approve
                                        </Button>
                                    )}
                                </div>
                            </CardBody>
                        </Card>
                    ))}
                </div>
            )}
            <div className='approval'>{result && <span>{result.message}</span>}</div>
        </div>
    );
};

export default ApprovalList;
