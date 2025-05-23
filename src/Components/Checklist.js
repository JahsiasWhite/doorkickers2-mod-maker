import React from 'react';

const Checklist = ({ title, dataArray, type, typeStr, setEquipmentForm }) => {
  const handleToggle = (key) => {
    setEquipmentForm((prev) => {
      const isKeyValuePair = typeof dataArray[0] === 'object';

      if (isKeyValuePair) {
        // For key-value pairs, we want to maintain the array of objects format
        const currentItems = Array.isArray(prev[typeStr]) ? prev[typeStr] : [];
        const itemExists = currentItems.some((item) => item.label === key);

        if (itemExists) {
          // Disable
          return {
            ...prev,
            [typeStr]: currentItems.filter((item) => item.label !== key),
          };
        } else {
          // Add the item if it doesn't exist
          const item = dataArray.find((item) => item.label === key);
          return {
            ...prev,
            [typeStr]: [
              ...currentItems,
              {
                label: key,
                value: item.value ? item.value : '',
              },
            ],
          };
        }
      } else {
        // For simple arrays, keep the existing logic
        return {
          ...prev,
          [typeStr]: type.includes(key)
            ? type.filter((item) => item !== key)
            : [...type, key],
        };
      }
    });
  };

  const handleValueChange = (e, key) => {
    const { value } = e.target;
    setEquipmentForm((prev) => {
      const currentItems = Array.isArray(prev[typeStr]) ? prev[typeStr] : [];
      const updatedItems = currentItems.map((item) =>
        item.label === key ? { ...item, value } : item
      );

      return {
        ...prev,
        [typeStr]: updatedItems,
      };
    });
  };

  return (
    // <div className="mt-1">
    <div className="break-inside-avoid">
      <label className="block text-sm pt-3 font-medium text-gray-300 pb-2">
        {title}
      </label>
      <div className="w-full p-2 border-gray-600 rounded-lg text-gray-100 bg-gray-700 max-h-80 overflow-auto scrollbarwidth-auto">
        {dataArray.map((item) => {
          const isKeyValuePair = typeof item === 'object';
          const key = isKeyValuePair ? item.label : item;
          const label = isKeyValuePair ? item.label : item;

          const isChecked = isKeyValuePair
            ? Array.isArray(type) && type.some((t) => t.label === key)
            : type.includes(key);

          const currentValue =
            isKeyValuePair && Array.isArray(type)
              ? type.find((t) => t.label === key)?.value || ''
              : '';

          return (
            <div
              key={key}
              onClick={() => handleToggle(key)}
              className={`flex items-center justify-between space-x-2 px-2 py-1 cursor-pointer hover:bg-gray-800 rounded ${
                isChecked ? 'bg-gray-800' : ''
              }`}
            >
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={isChecked}
                  readOnly
                  className="rounded cursor-pointer border-gray-500 bg-transparent"
                />
                <span>{label}</span>
              </div>

              {isKeyValuePair && (
                <input
                  type="text"
                  value={currentValue}
                  onChange={(e) => handleValueChange(e, key)}
                  className={` ${
                    isChecked ? 'opacity-100' : 'opacity-0 pointer-events-none'
                  } w-16 p-1 border border-gray-600 rounded text-sm bg-gray-700 text-gray-100`}
                  placeholder="Value"
                  onClick={(e) => e.stopPropagation()}
                  disabled={item.readOnly}
                />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Checklist;
