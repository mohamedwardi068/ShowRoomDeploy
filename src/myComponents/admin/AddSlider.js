import React, { useState } from 'react';
import { Image } from 'lucide-react';
import FormCard from './FormCardSlider';
import SlidePreview from './SlidePreview';
import PreviewModal from './PreviewModalSlider';

import { createSlider } from '../../services/sliderService';

const AddSlider = ({ onCancel, onSave }) => {
  const [data, setData] = useState({
    image: '',
    title: '',
    description: '',
    button1: '',
    button2: '',
    button1Link: '',
    button2Link: '',
  });

  const [showPreview, setShowPreview] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };

  const handleSubmit = async () => {
    if (!data.image || !data.title) {
      alert('Please fill in at least the Image URL and Title.');
      return;
    }
    try {
      await createSlider(data);
      alert('Slider Added Successfully!');
      if (onSave) onSave();
      setData({
        image: '',
        title: '',
        description: '',
        button1: '',
        button2: '',
        button1Link: '',
        button2Link: '',
      });
    } catch (error) {
      console.error("Error adding slider:", error);
      alert('Failed to add slider. Please try again.');
    }
  };

  return (
    <>
      <FormCard
        title="Add New Slider"
        icon={Image}
        onSubmit={handleSubmit}
        onPreview={() => setShowPreview(true)}
        onCancel={onCancel}
      >
        <input
          name="image"
          placeholder="Image URL"
          value={data.image}
          onChange={handleChange}
          className="w-full px-4 py-3 bg-gray-800 text-white rounded-lg border border-gray-700 focus:border-blue-500 focus:outline-none transition-colors"
        />

        <input
          name="title"
          placeholder="Title"
          value={data.title}
          onChange={handleChange}
          className="w-full px-4 py-3 bg-gray-800 text-white rounded-lg border border-gray-700 focus:border-blue-500 focus:outline-none transition-colors"
        />

        <textarea
          name="description"
          placeholder="Description"
          value={data.description}
          onChange={handleChange}
          rows="4"
          className="w-full px-4 py-3 bg-gray-800 text-white rounded-lg border border-gray-700 focus:border-blue-500 focus:outline-none transition-colors resize-none"
        />

        <input
          name="button1"
          placeholder="Button 1 Text (e.g., TO SHOP)"
          value={data.button1}
          onChange={handleChange}
          className="w-full px-4 py-3 bg-gray-800 text-white rounded-lg border border-gray-700 focus:border-blue-500 focus:outline-none transition-colors"
        />

        <input
          name="button1Link"
          placeholder="Button 1 Link (e.g., /shop)"
          value={data.button1Link}
          onChange={handleChange}
          className="w-full px-4 py-3 bg-gray-800 text-white rounded-lg border border-gray-700 focus:border-blue-500 focus:outline-none transition-colors"
        />

        <input
          name="button2"
          placeholder="Button 2 Text (e.g., READ MORE)"
          value={data.button2}
          onChange={handleChange}
          className="w-full px-4 py-3 bg-gray-800 text-white rounded-lg border border-gray-700 focus:border-blue-500 focus:outline-none transition-colors"
        />

        <input
          name="button2Link"
          placeholder="Button 2 Link (e.g., /about)"
          value={data.button2Link}
          onChange={handleChange}
          className="w-full px-4 py-3 bg-gray-800 text-white rounded-lg border border-gray-700 focus:border-blue-500 focus:outline-none transition-colors"
        />
      </FormCard>

      <PreviewModal open={showPreview} onClose={() => setShowPreview(false)}>
        <SlidePreview slide={data} />
      </PreviewModal>
    </>
  );
};

export default AddSlider;
