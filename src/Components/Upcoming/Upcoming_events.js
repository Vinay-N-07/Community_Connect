import React, { useState, useEffect } from 'react';
import { Card, CardBody, CardTitle, CardText } from 'reactstrap';
import { useLocation } from 'react-router-dom';
import './Upcoming_events.css';

const Upcoming = () => {

  const { state } = useLocation();
  const { user } = state;

  const collname = 'CreateEvents';
  const [getdata, setGetdata] = useState([]);
  const [Result, setResult] = useState([]);
  const [selectedCard, setSelectedCard] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:5000/getUsers/${collname}`)
      .then(response => {
        return response.json();
      })
      .then(data => {
        setGetdata(data);
        console.log(data);

      })
  }, []);


  const handleRegister = async (name, event_name, venue, date, time, purpose) => {
    fetch(`http://localhost:5000/to_register/${name}/${event_name}/${venue}/${date}/${time}/${purpose}`)
      .then(response => {
        return response.json();
      })
      .then(data => {
        setResult(data);
        console.log(data);

      })
  }

  const handleCardClick = (index) => {
    setSelectedCard(index);
  };



  return (
    
    <div>
      <div className='dashboard-text'>Register now for our upcoming events of community crusaders.</div>
      {getdata.map((item, index) => (
        <Card key={index} className='main' onClick={() => handleCardClick(index)}>
          <CardBody className='body'>
            <div>
              <CardTitle className='title'>{item.name}</CardTitle>
              <div className='info-layer'>
                <CardText className='text'>Date : {item.date}</CardText>
                <CardText className='text'>Purpose : {item.purpose}</CardText>
                <CardText className='text'>Timing : {item.timing}</CardText>
                <CardText className='text'>Venue : {item.venue}</CardText>
                <CardText className='text'>Volunteers registered : {item.volunteer_registered}</CardText>
              </div>
              <div className='bt-align'>
                <button onClick={() => handleRegister(user.username, item.name, item.venue, item.date, item.timing, item.purpose)}>
                  Register Now
                </button>
              </div>
              {selectedCard === index && Result.length === 1 && (
                  <span className='result-content'>{Result[0].message}</span>
                )}
            </div>
          </CardBody>
        </Card>
      ))}
    </div>

  )

}

export default Upcoming;