import React, { useState } from 'react';
import './App.css';
import Sidebar from './Components/sidebar';
import Content from './Components/content';
import Dashboard from './Components/Dashboard';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';

function App() {
  const [selectedMenuItem, setSelectedMenuItem] = useState('Dashboard');

  const handleMenuItemClick = (menuItem) => {
    setSelectedMenuItem(menuItem);
  };

  return (
    <div><Dashboard/>
    <div className="App">
      <Sidebar selectedMenuItem={selectedMenuItem} onMenuItemClick={handleMenuItemClick} />
      <Content selectedMenuItem={selectedMenuItem} />
    </div>
    </div>
  );
}

export default App;
