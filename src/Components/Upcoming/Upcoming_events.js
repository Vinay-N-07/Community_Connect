import React, { useState, useEffect } from 'react';
import { Card, CardBody, CardTitle, CardText, Button } from 'reactstrap';
import { useLocation } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './Upcoming_events.css';
import loadingGif from './loading.gif';
import treeImage from './card_images/tree.jpg'; 
import bloodDonationImage from './card_images/blood-donation.jpg';
import orphanageImage from './card_images/orphanage.jpg'; 
import elderlyCareImage from './card_images/elder.jpg';
import animalRescueImage from './card_images/animal rescue.png'; 
import { Get_data, To_register } from '../API';

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
  const [termsAccepted, setTermsAccepted] = useState(false);

  const purposesString = user.area_of_interest;
  const purposes = purposesString.split(',').map(purpose => purpose.trim());

  const fetchEvents = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${Get_data}/${collname}`);
      const data = await response.json();
      setGetdata(data);
    } catch (error) {
      console.error("Error fetching events:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  const handleRefresh = () => {
    fetchEvents();
  };

  const handleRegister = async (name, event_name, venue, date, time, purpose, desc) => {
    if (!termsAccepted) {
      toast.error("You must accept the terms and conditions to register.", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored"
      });
      return;
    }

    const response = await fetch(`${To_register}/${name}/${event_name}/${venue}/${date}/${time}/${purpose}/${desc}`);
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

  const handleTermsChange = (event) => {
    setTermsAccepted(event.target.checked);
  };

  const getImageForPurpose = (purpose) => {
    switch (purpose.toLowerCase()) {
      case 'plantation':
        return treeImage;
      case 'blood donation':
        return bloodDonationImage;
      case 'orphanage':
        return orphanageImage;
      case 'elderly care':
        return elderlyCareImage;
      case 'animal rescue':
        return animalRescueImage;
      default:
        return null;
    }
  };

  return (
    <div>
      <ToastContainer />
      <div className='dashboard-text'>
        Register now for our upcoming events of community crusaders.
      </div>

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

        {purposes.map((purpose) => (
          <div key={purpose} className='checkbox-item'>
            <input
              type='checkbox'
              value={purpose}
              onChange={handleCheckboxChange}
              checked={selectedPurposes.includes(purpose)}
              disabled={selectAll}
            />
            <label>{purpose}</label>
          </div>
        ))}
      </div>

      <button onClick={handleRefresh} style={{ background: '#f3f3df', marginBottom: '20px', marginLeft: '20px' }}>
        Refresh
      </button>

      {loading ? (
        <div className='loading-container'>
          <img src={loadingGif} alt="Loading..." />
        </div>
      ) : (
        getdata
          .filter(item => selectAll || selectedPurposes.length === 0 || selectedPurposes.includes(item.purpose))
          .map((item, index) => (
            <Card key={index} className='main' onClick={() => handleCardClick(index)}>
              <CardBody className='body'>
                <div style={{ position: 'relative' }}>
                  <CardTitle className='my-title'>
                    Event name: <div style={{ color: 'coral' }}>{item.name}</div>
                  </CardTitle>
                  <CardText style={{ display: 'flex', justifyContent: 'center', color: '#10100f' }}>{item.desc}</CardText>
                  <div className='info-layer'>
                    <CardText className='text'>Scheduled on: {item.date}</CardText>
                    <CardText className='text'>Main Agenda: {item.purpose}</CardText>
                    <CardText className='text'>Reporting time: {item.timing}</CardText>
                    <CardText className='text'>Event venue: {item.venue}</CardText>
                    <CardText className='text'>Maximum volunteers can participate: {item.max_strength}</CardText>
                    <CardText className='text'>Volunteers registered: {item.volunteer_registered}</CardText>
                  </div>

                  {/* Show respective image for each purpose */}
                  {getImageForPurpose(item.purpose) && (
                    <img
                      src={getImageForPurpose(item.purpose)}
                      alt={item.purpose}
                      style={{
                        position: 'absolute',
                        top: 0,
                        right: 0,
                        width: '50px',
                        height: '50px',
                        borderRadius: '20px'
                      }}
                    />
                  )}

                  <div className='bt-align'>
                    <input
                      type="checkbox"
                      id="terms"
                      onChange={handleTermsChange}
                    />
                    <label htmlFor="terms" style={{ color: '#00e3ff', fontSize: 'inherit' }}> I agree to the Terms and Conditions</label>
                    <br />
                    <button style={{ margin: '5px' }}
                      onClick={() => handleRegister(user.username, item.name, item.venue, item.date, item.timing, item.purpose, item.desc)}
                      disabled={!termsAccepted}
                    >
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
