import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const AddEditEmployee = () => {
  const [employee, setEmployee] = useState({
    name: '',
    emailId: '',
    mobile: '',
    country: '',
    state: '',
    district: '',
    avatar: ''
  });
  const [countries, setCountries] = useState([]);
  const { id } = useParams();
  const navigate = useNavigate();
  const isEdit = Boolean(id);

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await axios.get('https://669b3f09276e45187d34eb4e.mockapi.io/api/v1/country');
        setCountries(response.data);
      } catch (error) {
        console.error('Error fetching countries:', error);
      }
    };

    const fetchEmployee = async () => {
      if (isEdit) {
        try {
          const response = await axios.get(`https://669b3f09276e45187d34eb4e.mockapi.io/api/v1/employee/${id}`);
          setEmployee(response.data);
        } catch (error) {
          console.error('Error fetching employee:', error);
        }
      }
    };

    fetchCountries();
    fetchEmployee();
  }, [id, isEdit]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEmployee((prevState) => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isEdit) {
        await axios.put(`https://669b3f09276e45187d34eb4e.mockapi.io/api/v1/employee/${id}`, employee);
      } else {
        await axios.post('https://669b3f09276e45187d34eb4e.mockapi.io/api/v1/employee', employee);
      }
      navigate('/');
    } catch (error) {
      console.error('Error saving employee:', error);
    }
  };

  return (
    <div className="container">
      <h1>{isEdit ? 'Edit Employee' : 'Add Employee'}</h1>
      <form onSubmit={handleSubmit}>
        <label>Name:</label>
        <input
          type="text"
          name="name"
          value={employee.name}
          onChange={handleChange}
          required
        />
        <label>Email ID:</label>
        <input
          type="email"
          name="emailId"
          value={employee.emailId}
          onChange={handleChange}
          required
        />
        <label>Mobile:</label>
        <input
          type="text"
          name="mobile"
          value={employee.mobile}
          onChange={handleChange}
          required
        />
        <label>Country:</label>
        <select
          name="country"
          value={employee.country}
          onChange={handleChange}
          required
        >
          <option value="">Select a country</option>
          {countries.map((country) => (
            <option key={country.id} value={country.name}>
              {country.name}
            </option>
          ))}
        </select>
        <label>State:</label>
        <input
          type="text"
          name="state"
          value={employee.state}
          onChange={handleChange}
          required
        />
        <label>District:</label>
        <input
          type="text"
          name="district"
          value={employee.district}
          onChange={handleChange}
          required
        />
        <label>Avatar URL:</label>
        <input
          type="text"
          name="avatar"
          value={employee.avatar}
          onChange={handleChange}
        />
        <button type="submit">{isEdit ? 'Update' : 'Add'} Employee</button>
      </form>
    </div>
  );
};
export default AddEditEmployee;