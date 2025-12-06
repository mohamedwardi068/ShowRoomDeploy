import React from 'react';

const FormCardSlider = ({ title, icon: Icon, onSubmit, onPreview, onCancel, children }) => (
  <div className="p-6 bg-gray-900 rounded-xl shadow-2xl border border-blue-700/50">
    <h2 className="text-3xl font-extrabold text-white mb-6 pb-2 border-b border-blue-600 flex items-center">
      <Icon className="w-6 h-6 mr-3 text-blue-500" />
      {title}
    </h2>

    <div className="space-y-4">{children}</div>

    <div className="mt-8 flex space-x-4">
      {/* Cancel Button */}
      {onCancel && (
        <button
          onClick={onCancel}
          className="px-6 py-3 bg-red-600/20 text-red-400 border border-red-600/50 font-semibold rounded-lg hover:bg-red-600/30 flex items-center"
        >
          Cancel
        </button>
      )}

      {/* Preview Button */}
      <button
        onClick={onPreview}
        className="px-6 py-3 bg-gray-700 text-white font-semibold rounded-lg hover:bg-gray-600 flex items-center"
      >
        Preview
      </button>

      {/* Submit Button */}
      <button
        onClick={onSubmit}
        className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 flex items-center"
      >
        {title.includes('Edit') ? 'Update Slider' : 'Add Slider'}
      </button>
    </div>
  </div>
);

export default FormCardSlider;
