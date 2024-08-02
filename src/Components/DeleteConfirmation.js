import React, { useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate, Link } from 'react-router-dom';

const DeleteConfirmation = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const handleDelete = async () => {
      try {
        await axios.delete(`https://669b3f09276e45187d34eb4e.mockapi.io/api/v1/employee/${id}`);
        navigate('/');
      } catch (error) {
        console.error("Error deleting employee:", error);
      }
    };

    handleDelete();
  }, [id, navigate]);

  return (
    <div className="container">
      <h1>Deleting Employee...</h1>
      <p>If you're not redirected, <Link to="/">click here</Link> to go back to the home page.</p>
    </div>
  );
};

export default DeleteConfirmation;
