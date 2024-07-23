import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Auth from './Components/Login/Login';
import Homepage from './Components/Homepage/Homepage';
import LoadAndExecuteScript from './Components/Admin/Admin';

const App = () => {
  return (
    <Router>
      <Routes >
        <Route path="/login" element={<Auth />} />
        <Route path='/home' element={<Homepage />} />
        <Route path='/Admin' element={<LoadAndExecuteScript/>}/>
        <Route path="/" element={<Navigate to="/login" />} />
      </Routes>
    </Router>
  );
};
export default App;
