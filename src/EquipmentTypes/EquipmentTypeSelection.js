import React, { useState } from 'react';
import Card from '../Card.js';

import Armor from './Armor.js';
import Scopes from './Scopes.js';
import Firearm from './Firearm.js';
import BackButton from '../BackButton.js';

const EquipmentTypeSelection = ({ setSelectedOption }) => {
  const [equipmentType, setEquipmentType] = useState(null);

  const equipmentTypes = [
    { name: 'Armor', icon: 'Armor' },
    { name: 'Scope', icon: 'Shield' },
    { name: 'Firearm - WIP', icon: 'Sword' },
  ];

  if (equipmentType) {
    switch (equipmentType) {
      case 'Scope':
        return <Scopes setEquipmentType={setEquipmentType} />;
      case 'Armor':
        return <Armor setEquipmentType={setEquipmentType} />;
      case 'Firearm - WIP':
        return <Firearm setEquipmentType={setEquipmentType} />;
    }
  }

  return (
    <div className="p-8">
      <BackButton setEquipmentType={setSelectedOption} text={'Main Menu'} />

      <div className="grid grid-cols-3 gap-8">
        {equipmentTypes.map((type) => (
          <Card
            icon={type.icon}
            title={type.name}
            onClick={() => setEquipmentType(type.name)}
          />
        ))}
      </div>
    </div>
  );
};

export default EquipmentTypeSelection;
