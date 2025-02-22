import React, { useState } from 'react';
import EquipmentForm from './EquipmentForm.js';
import Scopes from './EquipmentTypes/Scopes.js';

const EquipmentTypeSelection = ({ setSelectedOption }) => {
  const [equipmentType, setEquipmentType] = useState(null);

  const equipmentTypes = [
    { name: 'Stimulant', icon: 'Plus' },
    { name: 'Scope', icon: 'Shield' },
    { name: 'Weapon', icon: 'Sword' },
  ];

  if (equipmentType) {
    switch (equipmentType) {
      case 'Scope':
        return <Scopes setEquipmentType={setEquipmentType} />;
    }
    return (
      <EquipmentForm
        equipmentType={equipmentType}
        setEquipmentType={setEquipmentType}
      />
    );
  }

  return (
    <div className="p-8">
      <button
        onClick={() => setSelectedOption(null)}
        className="mb-8 text-blue-500 hover:text-blue-600"
      >
        ← Back to Main Menu
      </button>

      <div className="grid grid-cols-3 gap-6">
        {equipmentTypes.map((type) => (
          <div
            key={type.name}
            className="cursor-pointer hover:bg-gray-50 transition-colors"
            onClick={() => setEquipmentType(type.name)}
          >
            <div className="flex flex-col items-center justify-center p-6 h-48">
              <type.icon className="w-12 h-12 mb-3 text-blue-500" />
              <div className="text-center text-lg">{type.name}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EquipmentTypeSelection;
