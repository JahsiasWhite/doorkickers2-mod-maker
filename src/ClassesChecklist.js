import React from 'react';

const ClassesChecklist = ({
  title,
  dataArray,
  type,
  typeStr,
  setEquipmentForm,
}) => {
  // Handle toggling the class label (selecting/deselecting the class label)
  const handleToggleClass = (classLabel) => {
    setEquipmentForm((prev) => {
      const isClassSelected = type.includes(classLabel);

      // If class is selected, remove the class and all its subclasses
      if (isClassSelected) {
        return {
          ...prev,
          [typeStr]: type.filter((item) => item !== classLabel),
        };
      }
      // If class is not selected, add only the class
      else {
        // Find all subclasses for this class from dataArray
        const classItem = dataArray.find((item) => item.label === classLabel);
        const subclassesToRemove = classItem ? classItem.subclasses : [];

        // Add the class but remove any of its subclasses that might be selected
        return {
          ...prev,
          [typeStr]: [
            ...type.filter((item) => !subclassesToRemove.includes(item)),
            classLabel,
          ],
        };
      }
    });
  };

  // Handle toggling individual subclasses
  const handleToggleSubclass = (subclass, classLabel) => {
    setEquipmentForm((prev) => {
      const fullSubclass = subclass; // Use the subclass name as is, without adding prefix
      const isSubclassSelected = type.includes(fullSubclass);

      const updatedSubclasses = isSubclassSelected
        ? type.filter((item) => item !== fullSubclass) // Remove subclass if it was selected
        : [...type, fullSubclass]; // Add subclass if it was not selected

      return {
        ...prev,
        [typeStr]: updatedSubclasses,
      };
    });
  };

  return (
    <div style={{ overflow: 'auto' }}>
      <label className="block text-sm font-medium text-gray-300 pt-3 pb-2">
        {title}
      </label>
      <div className="w-full p-2 border-gray-600 rounded-lg overflow-y-auto text-gray-100 bg-gray-700">
        {dataArray.map((item) => (
          <div key={item.label} className="space-y-2">
            {/* Class Row */}
            <div
              onClick={() => handleToggleClass(item.label)}
              className={`flex items-center justify-between space-x-2 px-2 py-1 cursor-pointer hover:bg-gray-800 rounded ${
                type.includes(item.label) ? 'bg-gray-800' : ''
              }`}
            >
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={type.includes(item.label)}
                  readOnly
                  className="rounded cursor-pointer border-gray-500 bg-transparent"
                />
                <span>{item.label}</span>
              </div>
            </div>

            {/* Subclass Rows */}
            {item.subclasses.map((subclass) => {
              const isClassSelected = type.includes(item.label);
              const isSubclassSelected = type.includes(subclass);

              return (
                <div
                  key={subclass}
                  onClick={() =>
                    !isClassSelected &&
                    handleToggleSubclass(subclass, item.label)
                  }
                  className={`flex items-center justify-between space-x-2 px-2 py-1 cursor-pointer hover:bg-gray-800 rounded ${
                    isSubclassSelected ? 'bg-gray-800' : ''
                  }`}
                >
                  <div className="flex items-center space-x-2 pl-6">
                    <input
                      type="checkbox"
                      checked={isSubclassSelected}
                      readOnly
                      className="rounded cursor-pointer border-gray-500 bg-transparent"
                      disabled={isClassSelected} // Disable if the class is selected
                    />
                    <span>{subclass}</span>
                  </div>
                </div>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ClassesChecklist;
