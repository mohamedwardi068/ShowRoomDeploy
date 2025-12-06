import React, { useState } from 'react';
import { UserPlus } from 'lucide-react';
import FormCard from './FormCard';
import { addAdmin } from '../../utils/adminStorage';

const AddAdmin = () => {
  const [data, setData] = useState({
    username: '',
    password: '',
  });

  const handleChange = (e) =>
    setData({ ...data, [e.target.name]: e.target.value });

  const handleSubmit = () => {
    try {
      if (!data.username || !data.password) {
        alert('Please fill in all fields');
        return;
      }

      addAdmin(data.username, data.password);
      alert('Admin created successfully');

      setData({
        username: '',
        password: '',
      });
    } catch (err) {
      console.error(err);
      alert('Failed to create admin');
    }
  };

  return (
    <FormCard title="Add New Admin" icon={UserPlus} onSubmit={handleSubmit}>
      <input
        name="username"
        placeholder="Username"
        value={data.username}
        onChange={handleChange}
        className="w-full px-4 py-3 bg-gray-800 text-white rounded-lg border border-gray-700"
      />

      <input
        name="password"
        type="password"
        placeholder="Password"
        value={data.password}
        onChange={handleChange}
        className="w-full px-4 py-3 bg-gray-800 text-white rounded-lg border border-gray-700"
      />
    </FormCard>
  );
};

export default AddAdmin;
