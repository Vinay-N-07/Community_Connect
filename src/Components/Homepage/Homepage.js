import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import Sidebar from '../Sidebar/sidebar';
import Content from '../Content/content';
import './Homepage.css';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';

function Homepage() {

  const { state } = useLocation();
  const { user } = state;
  const [selectedMenuItem, setSelectedMenuItem] = useState('');
  const handleMenuItemClick = (menuItem) => {
    setSelectedMenuItem(menuItem);
  };

  return (
    <div className='home'>
      <div className='Dashboard-header'>
        <h1 className='Dashboard-text'>Community crusaders</h1>
        <div className='right-corner'>
        <div className='icon'>
          <FontAwesomeIcon icon={faUser} />
          </div>
        <div className='user'>{user.username}</div>  
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
