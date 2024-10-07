import React, { useState } from 'react';
import { useAuth } from '../../provider/AuthContext';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const { register } = useAuth(); // Get the register function from AuthContext
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    password2: '', // Added password2 field for confirm password
    age: '',
    mobile_number: '',
    location: '',
    assigned_task: '',
  });

  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState('');
  const navigate = useNavigate(); // Navigate after successful registration

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage(''); // Clear any previous message

    // Check if password and confirm password match
    if (formData.password !== formData.password2) {
      setMessage("Passwords do not match");
      setMessageType('error');
      return;
    }

    try {
      // Call the register function with formData
      const successMessage = await register(formData);
      setMessage(successMessage);
      setMessageType('success');

      // Navigate to login or home page after successful registration
      navigate('/login');
    } catch (error) {
      setMessage(error.message);
      setMessageType('error');
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md w-1/3">
        <h2 className="text-2xl font-bold mb-4 text-center">Register</h2>

        {message && (
          <div
            className={`mb-4 p-2 rounded ${
              messageType === 'success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
            }`}
          >
            {message}
          </div>
        )}

        <div className="mb-4">
          <input
            type="text"
            name="username"
            placeholder="Username"
            value={formData.username}
            onChange={handleChange}
            required
            className="border border-gray-300 p-2 w-full rounded"
          />
        </div>

        <div className="mb-4">
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
            className="border border-gray-300 p-2 w-full rounded"
          />
        </div>

        <div className="mb-4">
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
            className="border border-gray-300 p-2 w-full rounded"
          />
        </div>

        <div className="mb-4">
          <input
            type="password"
            name="password2" // Confirm password field
            placeholder="Confirm Password"
            value={formData.password2}
            onChange={handleChange}
            required
            className="border border-gray-300 p-2 w-full rounded"
          />
        </div>

        <div className="mb-4">
          <input
            type="number"
            name="age"
            placeholder="Age"
            value={formData.age}
            onChange={handleChange}
            className="border border-gray-300 p-2 w-full rounded"
          />
        </div>

        <div className="mb-4">
          <input
            type="text"
            name="mobile_number"
            placeholder="Mobile Number"
            value={formData.mobile_number}
            onChange={handleChange}
            required
            className="border border-gray-300 p-2 w-full rounded"
          />
        </div>

        <div className="mb-4">
          <input
            type="text"
            name="location"
            placeholder="Location"
            value={formData.location}
            onChange={handleChange}
            required
            className="border border-gray-300 p-2 w-full rounded"
          />
        </div>

        <div className="mb-4">
          <input
            type="text"
            name="assigned_task"
            placeholder="Assigned Task (optional)"
            value={formData.assigned_task}
            onChange={handleChange}
            className="border border-gray-300 p-2 w-full rounded"
          />
        </div>

        <button type="submit" className="w-full bg-[#6020F0] text-white p-2 rounded hover:bg-[#5017c4]">
          Register
        </button>
      </form>
    </div>
  );
};

export default Register;
