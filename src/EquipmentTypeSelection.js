import React, { useState } from 'react';
import EquipmentForm from './EquipmentForm.js';
import Scopes from './EquipmentTypes/Scopes.js';
import Card from './Card.js';

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
          <Card
            icon={type.icon}
            title={type.name}
            description={type.name}
            onClick={() => setEquipmentType(type.name)}
          />
        ))}
      </div>
    </div>
  );
};

export default EquipmentTypeSelection;
