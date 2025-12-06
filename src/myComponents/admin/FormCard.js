// components/FormCard.js
import React from 'react';

const FormCard = ({ title, icon: Icon, children, onSubmit }) => (
  <div className="p-6 bg-gray-900 rounded-xl shadow-2xl border border-blue-700/50">
    <h2 className="text-3xl font-extrabold text-white mb-6 pb-2 border-b border-blue-600 flex items-center">
      <Icon className="w-6 h-6 mr-3 text-blue-500" />
      {title}
    </h2>
    <div className="space-y-4">{children}</div>
    <div className="mt-8">
      <button
        onClick={onSubmit}
        className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 flex items-center"
      >
        Submit
      </button>
      
    </div>
  </div>
);

export default FormCard;