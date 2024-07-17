import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Register = () => {
  const [name, setName] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [email, setEmail] = useState('');
  const [pin, setPin] = useState('');
  const [role, setRole] = useState('user');
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();

    const registerInfo = {
      name,
      mobileNumber,
      email,
      pin,
      role,
      status: "pending"
    };

    try {
      const response = await axios.post('http://localhost:5000/register', registerInfo);
      console.log(response.data);
      navigate('/');
    } catch (error) {
      console.error('Error registering user', error);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="w-full max-w-md bg-white rounded-lg shadow-md p-8">
        <h2 className="text-2xl font-bold mb-6 text-center">Register</h2>
        <form onSubmit={handleRegister}>
          <div className="mb-4">
            <label className="block text-gray-700">Name</label>
            <input
              type="text"
              className="w-full px-3 py-2 border rounded"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Mobile Number</label>
            <input
              type="number"
              className="w-full px-3 py-2 border rounded"
              value={mobileNumber}
              onChange={(e) => setMobileNumber(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Email</label>
            <input
              type="email"
              className="w-full px-3 py-2 border rounded"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">PIN</label>
            <input
              type="password"
              className="w-full px-3 py-2 border rounded"
              value={pin}
              onChange={(e) => setPin(e.target.value)}
              required
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700">Role</label>
            <select
              className="w-full px-3 py-2 border rounded"
              value={role}
              onChange={(e) => setRole(e.target.value)}
            >
              <option value="user">User</option>
              <option value="agent">Agent</option>
            </select>
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-700"
          >
            Register
          </button>
        </form>
        <div className="mt-6 text-center">
          <p>
            Already have an account?{' '}
            <Link to="/" className="text-blue-500 hover:underline">
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
