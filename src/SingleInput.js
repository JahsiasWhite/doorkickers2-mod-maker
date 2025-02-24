import React from 'react';

function SingleInput({ title, value, onChange }) {
  return (
    <div>
      <label className="block text-sm font-medium mb-1">{title}</label>
      <input
        type="text"
        value={value}
        onChange={onChange}
        className="w-full p-2 border rounded"
        // placeholder={placeholder}
      />
    </div>
  );
}

export default SingleInput;
