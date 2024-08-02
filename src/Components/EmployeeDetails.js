import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const EmployeeDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [employee, setEmployee] = useState(null);

  useEffect(() => {
    const fetchEmployee = async () => {
      try {
        const response = await axios.get(`https://669b3f09276e45187d34eb4e.mockapi.io/api/v1/employee/${id}`);
        setEmployee(response.data);
      } catch (error) {
        console.error("Error fetching employee:", error);
      }
    };

    fetchEmployee();
  }, [id]);

  const handleEdit = () => {
    navigate(`/edit/${id}`);
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`https://669b3f09276e45187d34eb4e.mockapi.io/api/v1/employee/${id}`);
      navigate('/');
    } catch (error) {
      console.error("Error deleting employee:", error);
    }
  };

  if (!employee) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Employee Details</h1>
      <div>
        <img src={employee.avatar} alt={employee.name} style={{ width: '150px', height: '150px' }} />
        <p><strong>Name:</strong> {employee.name}</p>
        <p><strong>Email:</strong> {employee.emailId}</p>
        <p><strong>Mobile:</strong> {employee.mobile}</p>
        <p><strong>Country:</strong> {employee.country}</p>
        <p><strong>State:</strong> {employee.state}</p>
        <p><strong>District:</strong> {employee.district}</p>
      </div>
      <div>
        <button onClick={handleEdit}>Edit</button>
        <button onClick={handleDelete}>Delete</button>
      </div>
    </div>
  );
};

export default EmployeeDetails;
