import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../Sidebar/sidebar';
import Content from '../Content/content';
import './Homepage.css';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';

function Homepage() {

  const { state } = useLocation();
  const { user } = state;
  const [selectedMenuItem, setSelectedMenuItem] = useState('');
  const navigate = useNavigate();
  const handleMenuItemClick = (menuItem) => {
    setSelectedMenuItem(menuItem);
  };

  function Logout() {
    navigate('/login');
  }

  return (
    <div className='home'>
      <div className='Dashboard-header'>
        <div className='align'></div>
        <p className='Dashboard-text'>Community Compass</p>
        <div className='right-corner'>
          <div className='icon'>
            <FontAwesomeIcon icon={faUser} />
          </div>
          <div className='user'>{user.username}</div>
          <div className='logout'>
            <button
              onClick={Logout} className='logout-bt'>
              logout
            </button>
          </div>
        </div>
      </div>
      <div className='app'>
        <Sidebar selectedMenuItem={selectedMenuItem} onMenuItemClick={handleMenuItemClick} />
        <Content className='app-content' selectedMenuItem={selectedMenuItem} />
      </div>
    </div>

  );
}

export default Homepage;
