import React, { useState } from 'react';
import Card from '../components/Card.js';

import Ammo from './Ammo.js';
import Armor from './Armor.js';
import Scopes from './Scopes.js';
import Firearm from './Firearm.js';
import BackButton from '../components/BackButton.js';

const EquipmentTypeSelection = ({ setSelectedOption }) => {
  const [equipmentType, setEquipmentType] = useState(null);

  const equipmentTypes = [
    { name: 'Ammo', icon: '/MenuIcons/ammo.svg' },
    { name: 'Armor', icon: '/MenuIcons/shield.svg' },
    { name: 'Firearm - WIP', icon: '/MenuIcons/Gun.svg' },
    { name: 'Scope', icon: '/MenuIcons/scope.svg' },
  ];

  if (equipmentType) {
    switch (equipmentType) {
      case 'Ammo':
        return <Ammo setEquipmentType={setEquipmentType} />;
      case 'Armor':
        return <Armor setEquipmentType={setEquipmentType} />;
      case 'Scope':
        return <Scopes setEquipmentType={setEquipmentType} />;
      case 'Firearm - WIP':
        return <Firearm setEquipmentType={setEquipmentType} />;
    }
  }

  return (
    <div className="p-8">
      <BackButton setEquipmentType={setSelectedOption} text={'Main Menu'} />

      <div className="grid grid-cols-3 md:grid-cols-2 gap-8">
        {equipmentTypes.map((type) => (
          <Card
            key={type.name}
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
