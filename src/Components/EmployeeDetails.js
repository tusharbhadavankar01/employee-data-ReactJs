import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';

const EmployeeDetails = () => {
  const { id } = useParams();
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

  if (!employee) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container">
      <h1>Employee Details</h1>
      <div className="employee-details">
        <img src={employee.avatar} alt={employee.name} />
        <p><strong>Name:</strong> {employee.name}</p>
        <p><strong>Email:</strong> {employee.emailId}</p>
        <p><strong>Mobile:</strong> {employee.mobile}</p>
        <p><strong>Country:</strong> {employee.country}</p>
        <p><strong>State:</strong> {employee.state}</p>
        <p><strong>District:</strong> {employee.district}</p>
        <Link to="/">Back to Home</Link>
      </div>
    </div>
  );
};

export default EmployeeDetails;
