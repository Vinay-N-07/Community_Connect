import React from 'react';
import './sidebar.css';

const Sidebar = ({ selectedMenuItem, onMenuItemClick }) => {
  const menuItems = ['About Us','Profile','Forthcoming Events', 'Registered Events', 'My Invitations'];

  return (
    <div className="sidebar">
      <ul>
        {menuItems.map(item => (
          <li key={item} className={selectedMenuItem === item ? 'active' : ''} onClick={() => onMenuItemClick(item)}>
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;