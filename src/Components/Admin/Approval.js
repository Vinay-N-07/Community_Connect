import React, { useState, useEffect } from 'react';
import { Card, CardBody, CardTitle, CardText, Button } from 'reactstrap';
import './Approval.css';

const ApprovalList = () => {
    const [data, setData] = useState([]);
    const [result, setResult] = useState('');
    const collname = 'RegistedEvent';

    useEffect(() => {
        fetch(`http://localhost:5000/getUsers/${collname}`)
            .then(response => {
                return response.json();
            })
            .then(data => {
                setData(data);
                console.log(data);

            })
    }, []);

    const handleApprove = async (name, event) => {
        fetch(`http://localhost:5000/approval/${name}/${event}`)
            .then(response => {
                return response.json();
            })
            .then(data => {
                setResult(data);
                console.log(data);

            })
    }

    return (
        <div>
            <div className="main">
                {data.map((item, index) => (
                    <Card key={index} className='layer1'>
                        <CardBody>
                            <CardTitle className="main-text">Name of volunteer : {item.name}</CardTitle>
                            <CardText className="main-text"> Status : {item.status}</CardText>
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
            <div className='approval'>{result.length === 1 && <span>{result[0].message}</span>}</div>
        </div>
    );
};

export default ApprovalList;