import React from 'react';
import './content.css';
import MyComponent from '../Profile/Profile';
import Upcoming from '../Upcoming/Upcoming_events';
import RegisteredEvent from '../RegisteredEvents/Registered_events';
import Invitation from '../Invitation/invitation';
import Main from '../AboutUs/About';



const Content = ({ selectedMenuItem }) => {
  
  const renderContent = () => {
    switch (selectedMenuItem) {
      case 'About Us':
        return <About />;
      case 'Profile':
        return <Profile />;
      case 'Registered Events':
        return <Registered />;
      case 'Forthcoming Events':
        return <UpcomingEvents />;
      case 'My Invitations':
        return <Download/>;
      default:
        return <About />;
    }
  };

  return (
    <div className="content">
      {renderContent()}
    </div>
  );
};

const Profile = () => {
  return <MyComponent />;
}
const Registered = () => {
  return <RegisteredEvent />;
};

const UpcomingEvents = () => {
  return <Upcoming />;
};

const Download = () => {
  return <Invitation/>
}
const About = () => {
  return <Main/>
}

export default Content;