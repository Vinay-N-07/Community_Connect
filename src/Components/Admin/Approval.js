import React, { useState, useEffect } from 'react';
import { Card, CardBody, CardTitle, CardText, Button } from 'reactstrap';
import { Approval, Get_data } from '../API';
import './Approval.css';
import loadingGif from './loading.gif';

const ApprovalList = () => {
    const [data, setData] = useState([]);
    const [filteredData, setFilteredData] = useState([]); // You can remove filteredData if you don't need it
    const [result, setResult] = useState('');
    const [loading, setLoading] = useState(true);
    const collname = 'RegistedEvent';

    const fetchData = async () => {
        setLoading(true);
        try {
            const response = await fetch(`${Get_data}/${collname}`);
            const data = await response.json();
            setData(data);  // Set all data without filtering
            setFilteredData(data);  // If you want to still use filteredData, just assign data to it
        } catch (error) {
            console.error("Error fetching data:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const handleRefresh = () => {
        fetchData();
    };

    const handleApprove = async (name, event) => {
        try {
            const response = await fetch(`${Approval}/${name}/${event}`);
            const data = await response.json();

            setResult(`Request for ${name} regarding ${event} has been approved.`);
            fetchData();
            setTimeout(() => setResult(''), 5000);
        } catch (error) {
            console.error("Error approving the request:", error);
        }
    };

    return (
        <div>
            <button
                onClick={handleRefresh}
                style={{ background: '#f3f3df', marginBottom: '20px', marginLeft: '20px' }}
            >
                Refresh
            </button>
            {loading ? (
                <div style={{ textAlign: 'center', marginTop: '20%' }}>
                    <img src={loadingGif} alt="Loading..." />
                </div>
            ) : data.length === 0 ? ( // Use `data` here instead of `filteredData`
                <div style={{
                    display: 'flex',
                    justifyContent: 'center',
                }}>
                    No Approval Requests.
                </div>
            ) : (
                <div className="main">
                    {data.map((item, index) => (  // Use `data` to display all items
                        <Card key={index} className='layer1'>
                            <CardBody>
                                <CardTitle className="main-text">Name of volunteer:  <div style={{ color: 'green', fontWeight: 600 }}>{item.name}</div></CardTitle>
                                <CardTitle className="main-text">Requested event: <div style={{ color: 'green', fontWeight: 600 }}>{item.eve_name}</div></CardTitle>
                                <CardTitle className="main-text">Scheduled date: <div style={{ color: 'green', fontWeight: 600 }}>{item.date}</div></CardTitle>
                                <CardText className="main-text">Status: <div style={{ color: item.status === 'Approved' ? 'blue' : 'green', fontWeight: 600 }}>{item.status}</div></CardText>
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
            <div className='approval'>
                {result && <span style={{ color: 'green' }}>{result}</span>}
            </div>
        </div>
    );
};

export default ApprovalList;
