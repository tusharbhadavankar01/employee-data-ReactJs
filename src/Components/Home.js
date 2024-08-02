import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
const ITEMS_PER_PAGE = 10;

const Home = () => {
  const [employees, setEmployees] = useState([]);
  const [countries, setCountries] = useState([]);
  const [filterCountry, setFilterCountry] = useState('');
  const [filterState, setFilterState] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  const fetchEmployees = async () => {
    try {
      const response = await axios.get('https://669b3f09276e45187d34eb4e.mockapi.io/api/v1/employee');
      setEmployees(response.data);
    } catch (error) {
      console.error("Error fetching employees:", error);
    }
  };

  const fetchCountries = async () => {
    try {
      const response = await axios.get('https://669b3f09276e45187d34eb4e.mockapi.io/api/v1/country');
      setCountries(response.data);
    } catch (error) {
      console.error("Error fetching countries:", error);
    }
  };

  useEffect(() => {
    fetchEmployees();
    fetchCountries();
  }, []);

  const filteredEmployees = employees.filter(emp => 
    (filterCountry ? emp.country === filterCountry : true) &&
    (filterState ? emp.state === filterState : true)
  );

  const paginatedEmployees = filteredEmployees.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);

  return (
    <div className="container">
      <h1>Employee List</h1>
      <div className="search-bar">
        <label>
          Country:
          <select onChange={e => setFilterCountry(e.target.value)} value={filterCountry}>
            <option value="">All Countries</option>
            {countries.map(country => (
              <option key={country.id} value={country.name}>
                {country.name}
              </option>
            ))}
          </select>
        </label>
        <label>
          State:
          <input 
            type="text" 
            value={filterState} 
            onChange={e => setFilterState(e.target.value)} 
            placeholder="Filter by state"
          />
        </label>
        <Link to="/add">
          <button>Add New Employee</button>
        </Link>
      </div>
      <table>
        <thead>
          <tr>
            <th>Avatar</th>
            <th>Name</th>
            <th>Email</th>
            <th>Mobile</th>
            <th>Country</th>
            <th>State</th>
            <th>District</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {paginatedEmployees.map(emp => (
            <tr key={emp.id}>
              <td><img src={emp.avatar} alt={emp.name} style={{ width: '50px', height: '50px' }} /></td>
              <td>{emp.name}</td>
              <td>{emp.emailId}</td>
              <td>{emp.mobile}</td>
              <td>{emp.country}</td>
              <td>{emp.state}</td>
              <td>{emp.district}</td>
              <td>
                <Link to={`/details/${emp.id}`}>Details</Link>
                <Link to={`/edit/${emp.id}`}>Edit</Link>
                <Link to={`/delete/${emp.id}`}>Delete</Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="pagination">
        <button onClick={() => setCurrentPage(currentPage - 1)} disabled={currentPage === 1}>
          Previous
        </button>
        <span>Page {currentPage}</span>
        <button onClick={() => setCurrentPage(currentPage + 1)} disabled={paginatedEmployees.length < ITEMS_PER_PAGE}>
          Next
        </button>
      </div>
    </div>
  );
};

export default Home;
