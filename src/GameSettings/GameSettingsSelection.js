import React, { useState } from 'react';
import Card from '../Card.js';

import Armor from '../EquipmentTypes/Armor.js';
import Scopes from '../EquipmentTypes/Scopes.js';
import Firearm from '../EquipmentTypes/Firearm.js';
import HumanParams from './HumanParams.js';
import BackButton from '../BackButton.js';
import SoundRanges from './SoundRanges.js';
import XPTables from './XPTables.js';

const GameSettingsSelection = ({ setSelectedOption }) => {
  const [equipmentType, setEquipmentType] = useState(null);

  const equipmentTypes = [
    { name: 'Human Parameters', icon: 'Armor' },
    { name: 'Sound Ranges', icon: 'Shield' },
    { name: 'XP Tables', icon: 'Sword' },
  ];

  if (equipmentType) {
    switch (equipmentType) {
      case 'Human Parameters':
        return <HumanParams setEquipmentType={setEquipmentType} />;
      case 'Sound Ranges':
        return <SoundRanges setEquipmentType={setEquipmentType} />;
      case 'XP Tables':
        return <XPTables setEquipmentType={setEquipmentType} />;
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

export default GameSettingsSelection;
