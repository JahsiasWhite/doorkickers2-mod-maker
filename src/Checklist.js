const Checklist = ({ dataArray, type, typeStr, setEquipmentForm }) => {
  const handleToggle = (key) => {
    setEquipmentForm((prev) => {
      const isKeyValuePair = typeof dataArray[0] === 'object'; // Detect format

      if (isKeyValuePair) {
        // If it is an array of key-value pairs, handle it like an array
        const updatedField = prev[typeStr] || [];
        const index = updatedField.findIndex((item) => item.label === key);

        if (index > -1) {
          // If it exists, remove it from the array
          updatedField.splice(index, 1);
        } else {
          // If it doesn't exist, add it to the array
          updatedField.push({ label: key });
          console.error('HMM: ', key, updatedField, updatedField[0]);
        }

        return { ...prev, [typeStr]: updatedField };
      } else {
        return {
          ...prev,
          [typeStr]: type.includes(key)
            ? type.filter((item) => item !== key) // Remove from array
            : [...type, key], // Add to array
        };
      }
    });
  };

  const handleValueChange = (e, key) => {
    const { value } = e.target;
    setEquipmentForm((prev) => ({
      ...prev,
      [typeStr]: { ...prev[typeStr], [key]: value },
    }));
  };

  return (
    <div className="w-full p-2 border rounded h-32 overflow-y-auto bg-white">
      {dataArray.map((item) => {
        const isKeyValuePair = typeof item === 'object';
        console.error(item, item.key);
        const key = isKeyValuePair ? item.label : item;
        const label = isKeyValuePair ? item.label : item;
        const isChecked = isKeyValuePair
          ? type.hasOwnProperty(key)
          : type.includes(key);

        return (
          <div
            key={key}
            onClick={() => handleToggle(key)}
            className={`flex items-center justify-between space-x-2 px-2 py-1 cursor-pointer hover:bg-gray-100 rounded ${
              isChecked ? 'bg-gray-200' : ''
            }`}
          >
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={isChecked}
                readOnly // We handle toggle via div click, so make checkbox readOnly
                className="rounded cursor-pointer"
              />
              <span>{label}</span>
            </div>

            {/* Show value input only if it's a key-value checklist and selected */}
            {isKeyValuePair && isChecked && !item.canEdit && (
              <input
                type="text"
                value={type[key]}
                onChange={(e) => handleValueChange(e, key)}
                className="w-16 p-1 border rounded text-sm"
                placeholder="Value"
                onClick={(e) => e.stopPropagation()} // Prevent div click when editing
              />
            )}
          </div>
        );
      })}
    </div>
  );
};

export default Checklist;
