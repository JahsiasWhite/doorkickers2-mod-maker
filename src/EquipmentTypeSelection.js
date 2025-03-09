import React, { useState } from 'react';
import EquipmentForm from './EquipmentForm.js';
import Card from './Card.js';

import Armor from './EquipmentTypes/Armor.js';
import Scopes from './EquipmentTypes/Scopes.js';
import Firearm from './EquipmentTypes/Firearm.js';

const EquipmentTypeSelection = ({ setSelectedOption }) => {
  const [equipmentType, setEquipmentType] = useState(null);

  const equipmentTypes = [
    { name: 'Armor', icon: 'Armor' },
    { name: 'Scope', icon: 'Shield' },
    { name: 'Firearm', icon: 'Sword' },
  ];

  if (equipmentType) {
    switch (equipmentType) {
      case 'Scope':
        return <Scopes setEquipmentType={setEquipmentType} />;
      case 'Armor':
        return <Armor setEquipmentType={setEquipmentType} />;
      case 'Firearm':
        return <Firearm setEquipmentType={setEquipmentType} />;
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
