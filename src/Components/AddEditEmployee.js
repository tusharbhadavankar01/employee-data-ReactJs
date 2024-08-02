import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const AddEditEmployee = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEdit = Boolean(id);
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
  const [newCountry, setNewCountry] = useState('');

  const fetchEmployee = useCallback(async () => {
    if (isEdit) {
      try {
        const response = await axios.get(`https://669b3f09276e45187d34eb4e.mockapi.io/api/v1/employee/${id}`);
        setEmployee(response.data);
      } catch (error) {
        console.error("Error fetching employee:", error);
      }
    }
  }, [id, isEdit]);

  const fetchCountries = async () => {
    try {
      const response = await axios.get('https://669b3f09276e45187d34eb4e.mockapi.io/api/v1/country');
      setCountries(response.data);
    } catch (error) {
      console.error("Error fetching countries:", error);
    }
  };

  useEffect(() => {
    fetchEmployee();
    fetchCountries();
  }, [fetchEmployee]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEmployee(prevEmployee => ({
      ...prevEmployee,
      [name]: value
    }));
  };

  const handleNewCountryChange = (e) => {
    setNewCountry(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (newCountry && !countries.some(c => c.name === newCountry)) {
        const response = await axios.post('https://669b3f09276e45187d34eb4e.mockapi.io/api/v1/country', { name: newCountry });
        setCountries(prevCountries => [...prevCountries, response.data]);
        setEmployee(prevEmployee => ({ ...prevEmployee, country: newCountry }));
      }
      if (isEdit) {
        await axios.put(`https://669b3f09276e45187d34eb4e.mockapi.io/api/v1/employee/${id}`, employee);
      } else {
        await axios.post('https://669b3f09276e45187d34eb4e.mockapi.io/api/v1/employee', employee);
      }
      navigate('/');
    } catch (error) {
      console.error("Error saving employee:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="name"
        value={employee.name}
        onChange={handleChange}
        placeholder="Name"
        required
      />
      <input
        type="email"
        name="emailId"
        value={employee.emailId}
        onChange={handleChange}
        placeholder="Email"
        required
      />
      <input
        type="text"
        name="mobile"
        value={employee.mobile}
        onChange={handleChange}
        placeholder="Mobile"
        required
      />
      <select
        name="country"
        value={employee.country}
        onChange={handleChange}
        required
      >
        <option value="">Select Country</option>
        {countries.map(country => (
          <option key={country.id} value={country.name}>
            {country.name}
          </option>
        ))}
        <option value="add-new">Add New Country</option>
      </select>
      {employee.country === 'add-new' && (
        <input
          type="text"
          value={newCountry}
          onChange={handleNewCountryChange}
          placeholder="Enter new country"
          required
        />
      )}
      <input
        type="text"
        name="state"
        value={employee.state}
        onChange={handleChange}
        placeholder="State"
        required
      />
      <input
        type="text"
        name="district"
        value={employee.district}
        onChange={handleChange}
        placeholder="District"
        required
      />
      <input
        type="text"
        name="avatar"
        value={employee.avatar}
        onChange={handleChange}
        placeholder="Avatar URL"
      />
      <button type="submit">{isEdit ? 'Update' : 'Add'} Employee</button>
    </form>
  );
};

export default AddEditEmployee;
