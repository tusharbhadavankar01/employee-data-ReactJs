import React from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const DeleteConfirmation = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const handleDelete = async () => {
    try {
      await axios.delete(`https://669b3f09276e45187d34eb4e.mockapi.io/api/v1/employee/${id}`);
      navigate('/');
    } catch (error) {
      console.error("Error deleting employee:", error);
    }
  };

  return (
    <div>
      <p>Are you sure you want to delete this employee?</p>
      <button onClick={handleDelete}>Yes</button>
      <button onClick={() => navigate(-1)}>No</button>
    </div>
  );
};

export default DeleteConfirmation;
