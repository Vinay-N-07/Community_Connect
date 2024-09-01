import React, { useState, useEffect } from 'react';
import { Card, CardBody, CardTitle, CardText } from 'reactstrap';
import { useLocation } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './Upcoming_events.css';
import loadingGif from './loading.gif';

const Upcoming = () => {
  const { state } = useLocation();
  const { user } = state;

  const collname = 'CreateEvents';
  const [getdata, setGetdata] = useState([]);
  const [Result, setResult] = useState([]);
  const [selectedCard, setSelectedCard] = useState(null);
  const [selectedPurposes, setSelectedPurposes] = useState([]);
  const [selectAll, setSelectAll] = useState(false);
  const [loading, setLoading] = useState(true);

  const purposesString = user.area_of_interest; // Replace this with your actual variable
  const purposes = purposesString.split(',').map(purpose => purpose.trim()); // Split string into array

  useEffect(() => {
    fetch(`http://localhost:5000/getUsers/${collname}`)
      .then(response => response.json())
      .then(data => {
        setGetdata(data);
        setLoading(false); // Set loading to false after data is fetched
        console.log(data);
      });
  }, []);

  const handleRegister = async (name, event_name, venue, date, time, purpose, desc) => {
    const response = await fetch(`http://localhost:5000/to_register/${name}/${event_name}/${venue}/${date}/${time}/${purpose}/${desc}`);
    const data = await response.json();
    setResult(data);
    console.log(data);
    if (data[0] && data[0].message) {
      toast.success(data[0].message, {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored"
      });
    } else if (data[0] && data[0].sorry) {
      toast.error(data[0].sorry, {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored"
      });
    }
  };

  const handleCardClick = (index) => {
    setSelectedCard(index);
  };

  const handleCheckboxChange = (event) => {
    const value = event.target.value;
    setSelectedPurposes((prev) =>
      prev.includes(value) ? prev.filter((p) => p !== value) : [...prev, value]
    );
  };

  const handleSelectAll = () => {
    if (selectAll) {
      setSelectedPurposes([]);
    } else {
      setSelectedPurposes(purposes);
    }
    setSelectAll(!selectAll);
  };

  return (
    <div>
      <ToastContainer />
      <div className='dashboard-text'>
        Register now for our upcoming events of community crusaders.
      </div>

      {/* Select All Checkbox */}
      <div className='second-header'>List the event based on your interest.</div>
      <div className='grid-view'>
        <div className='checkbox-group'>
          <div className='checkbox-item'>
            <input
              type='checkbox'
              checked={selectAll}
              onChange={handleSelectAll}
            />
            <label>List All</label>
          </div>
        </div>

        {/* Render checkboxes for each purpose */}
        {purposes.map((purpose) => (
          <div key={purpose} className='checkbox-item'>
            <input
              type='checkbox'
              value={purpose}
              onChange={handleCheckboxChange}
              checked={selectedPurposes.includes(purpose)}
              disabled={selectAll} // Disable individual checkboxes if "Select All" is checked
            />
            <label>{purpose}</label>
          </div>
        ))}
      </div>

      {loading ? (
        <div className='loading-container'>
          <img src={loadingGif} alt="Loading..." className='loading-gif' />
        </div>
      ) : (
        getdata
          .filter(item => selectAll || selectedPurposes.length === 0 || selectedPurposes.includes(item.purpose))
          .map((item, index) => (
            <Card key={index} className='main' onClick={() => handleCardClick(index)}>
              <CardBody className='body'>
                <div>
                  <CardTitle className='title'>Event name: {item.name}</CardTitle>
                  <div className='info-layer'>
                    <CardText className='text'>Event description: {item.desc}</CardText>
                    <CardText className='text'>Scheduled on: {item.date}</CardText>
                    <CardText className='text'>Main Agenda: {item.purpose}</CardText>
                    <CardText className='text'>Reporting time: {item.timing}</CardText>
                    <CardText className='text'>Event venue: {item.venue}</CardText>
                    <CardText className='text'>Maximum volunteers can participate : {item.max_strength}</CardText>
                    <CardText className='text'>Volunteers registered : {item.volunteer_registered}</CardText>
                  </div>
                  <div className='bt-align'>
                    <button onClick={() => handleRegister(user.username, item.name, item.venue, item.date, item.timing, item.purpose, item.desc)}>
                      Register Now
                    </button>
                  </div>
                  {selectedCard === index && Result.length === 1 && (
                    <span className='result-content'>{Result[0].message}</span>
                  )}
                </div>
              </CardBody>
            </Card>
          ))
      )}
    </div>
  );
};

export default Upcoming;
