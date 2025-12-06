import React, { useState } from 'react';
import { UserPlus } from 'lucide-react';
import FormCard from './FormCard';

const AddAdmin = () => {
  const [data, setData] = useState({
    username: '',
    password: '',
  });

  const handleChange = (e) =>
    setData({ ...data, [e.target.name]: e.target.value });

  const handleSubmit = async () => {
    try {
      const token = localStorage.getItem("adminToken");

      const res = await fetch("http://localhost:8000/api/admin/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(data)
      });

      const result = await res.json();

      if (!res.ok) {
        alert(result.message || "Error creating admin");
        return;
      }

      alert("Admin created successfully");

      setData({
        username: '',
        password: '',
      });
    } catch (err) {
      console.error(err);
      alert("Cannot connect to server");
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
