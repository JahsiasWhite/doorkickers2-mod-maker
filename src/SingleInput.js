import React from 'react';

const SingleInput = ({ title, value, onChange }) => {
  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-gray-300">{title}</label>
      <input
        type="text"
        value={value}
        onChange={onChange}
        className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
      />
    </div>
  );
};

export default SingleInput;
