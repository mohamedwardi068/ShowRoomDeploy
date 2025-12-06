// components/AddSponsor.js
import React, { useState } from 'react';
import { Handshake } from 'lucide-react';
import FormCard from './FormCard';

const AddSponsor = () => {
  const [data, setData] = useState({ 
    name: '', 
    description: '', 
    lat: '', 
    lng: '' 
  });

  const handleChange = (e) => setData({ ...data, [e.target.name]: e.target.value });
  
  const handleSubmit = () => {
    const sponsor = { 
      ...data, 
      lat: parseFloat(data.lat), 
      lng: parseFloat(data.lng) 
    };
    console.log('Sponsor Added', sponsor);
    alert('Sponsor Added');
    setData({ name: '', description: '', lat: '', lng: '' });
  };

  return (
    <FormCard title="Manage Brand Sponsors" icon={Handshake} onSubmit={handleSubmit}>
      <input 
        name="name" 
        placeholder="Sponsor Name" 
        value={data.name} 
        onChange={handleChange} 
        className="w-full px-4 py-3 bg-gray-800 text-white rounded-lg border border-gray-700" 
      />
      <textarea 
        name="description" 
        placeholder="Description" 
        value={data.description} 
        onChange={handleChange} 
        className="w-full px-4 py-3 bg-gray-800 text-white rounded-lg border border-gray-700" 
      />
      <div className="flex space-x-4">
        <input 
          name="lat" 
          type="number" 
          step="0.0001" 
          placeholder="Latitude" 
          value={data.lat} 
          onChange={handleChange} 
          className="w-1/2 px-4 py-3 bg-gray-800 text-white rounded-lg border border-gray-700" 
        />
        <input 
          name="lng" 
          type="number" 
          step="0.0001" 
          placeholder="Longitude" 
          value={data.lng} 
          onChange={handleChange} 
          className="w-1/2 px-4 py-3 bg-gray-800 text-white rounded-lg border border-gray-700" 
        />
      </div>
    </FormCard>
  );
};

export default AddSponsor;