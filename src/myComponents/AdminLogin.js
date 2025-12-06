// components/AdminLogin.js
import React, { useState } from 'react';
import { Lock, LogOut } from 'lucide-react';
import { authenticateAdmin } from '../utils/adminStorage';

const AdminLogin = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();

    try {
      const result = authenticateAdmin(username, password);

      if (!result.success) {
        alert(result.message || "Invalid credentials");
        return;
      }

      // Save token
      localStorage.setItem("adminToken", result.token);

      // Mark as logged in
      onLogin(true);

    } catch (err) {
      console.error(err);
      alert("Login failed. Please try again.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-950 p-4">
      <div className="w-full max-w-md bg-gray-900 p-8 rounded-xl shadow-2xl border border-blue-700/50">
        <h2 className="text-3xl font-bold text-white mb-6 flex items-center">
          <Lock className="w-6 h-6 mr-3 text-blue-500" />
          Admin Login
        </h2>
        <form onSubmit={handleLogin} className="space-y-4">
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full px-4 py-3 bg-gray-800 text-white rounded-lg border border-gray-700 focus:border-blue-500"
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-3 bg-gray-800 text-white rounded-lg border border-gray-700 focus:border-blue-500"
            required
          />
          <button
            type="submit"
            className="w-full py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 flex items-center justify-center"
          >
            <LogOut className="w-5 h-5 mr-2" />
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;