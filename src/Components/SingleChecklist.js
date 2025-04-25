import React from 'react';

const SingleChecklist = ({
  title,
  dataArray,
  type,
  typeStr,
  setEquipmentForm,
  onToggle,
}) => {
  // Handle toggling the class label (selecting/deselecting the class label)
  const handleToggleClass = (classLabel) => {
    setEquipmentForm((prev) => {
      const isClassSelected = type.includes(classLabel);

      // If class is selected, remove the class and all its subclasses
      if (isClassSelected) {
        onToggle('');
        // return {
        //   ...prev,
        //   [prev.bgImages[index + 1].animType]: type.filter(
        //     (item) => item !== classLabel
        //   ),
        // };
      }
      // If class is not selected, add only the class
      else {
        // Find all subclasses for this class from dataArray
        const classItem = dataArray.find((item) => item.label === classLabel);
        const subclassesToRemove = classItem ? classItem.subclasses : [];

        onToggle([
          ...type.filter((item) => !subclassesToRemove.includes(item)),
          classLabel,
        ]);
        // Add the class but remove any of its subclasses that might be selected
        // return {
        //   ...prev,
        //   [typeStr]: [
        //     ...type.filter((item) => !subclassesToRemove.includes(item)),
        //     classLabel,
        //   ],
        // };
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
      <label className="block text-sm font-medium text-gray-300">{title}</label>
      <div className="w-full p-2 border-gray-600 rounded-lg overflow-y-auto text-gray-100 bg-gray-700">
        {dataArray.map((item) => (
          <div key={item} className="space-y-2">
            {/* Class Row */}
            <div
              onClick={() => handleToggleClass(item)}
              className={`flex items-center justify-between space-x-2 px-2 py-1 cursor-pointer hover:bg-gray-800 rounded ${
                type.includes(item) ? 'bg-gray-800' : ''
              }`}
            >
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={type.includes(item)}
                  readOnly
                  className="rounded cursor-pointer border-gray-500 bg-transparent"
                />
                <span>{item}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SingleChecklist;
