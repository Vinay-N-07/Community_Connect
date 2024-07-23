import React from 'react';
import './content.css';
import MyComponent from '../Profile';
import Upcoming from '../Admin/Upcoming_events';
import RegistedEvent from '../Admin/Registered_events';


const Content = ({ selectedMenuItem }) => {
  const renderContent = () => {
    switch (selectedMenuItem) {
      case 'About Us':
        return <About/>;
      case 'Profile':
        return <Profile/>;  
      case 'Registered Events':
        return <Registered />;
      case 'Forthcoming Events':
        return <UpcomingEvents />;
      case 'Gallery':
        return <Gallery />;
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

const Profile =() =>{
  return <MyComponent/>;
}
const Registered = () => {
  return <RegistedEvent/>;
};

const UpcomingEvents = () => {
  return <Upcoming/>;
};

const Gallery = () => {
  return <h2>Photos</h2>;
};
const About = () => {
  return <h2>About Us</h2>
}

export default Content;