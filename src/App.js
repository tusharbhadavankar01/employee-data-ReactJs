import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Components/Home';
import AddEditEmployee from './Components/AddEditEmployee';
import EmployeeDetails from './Components/EmployeeDetails';
import DeleteConfirmation from './Components/DeleteConfirmation';
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/add" element={<AddEditEmployee />} />
        <Route path="/edit/:id" element={<AddEditEmployee />} />
        <Route path="/details/:id" element={<EmployeeDetails />} />
        <Route path="/delete/:id" element={<DeleteConfirmation />} />
      </Routes>
    </Router>
  );
}

export default App;
