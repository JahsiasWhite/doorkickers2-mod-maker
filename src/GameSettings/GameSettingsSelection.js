import React, { useState } from 'react';
import Card from '../Card.js';

import HumanParams from './HumanParams.js';
import BackButton from '../BackButton.js';
import SoundRanges from './SoundRanges.js';
import XPTables from './XPTables.js';

const GameSettingsSelection = ({ setSelectedOption }) => {
  const [equipmentType, setEquipmentType] = useState(null);

  const equipmentTypes = [
    { name: 'Human Parameters', icon: '/MenuIcons/human_params.svg' },
    { name: 'Sound Ranges', icon: '/MenuIcons/sound.svg' },
    { name: 'XP Tables', icon: '/MenuIcons/graph.svg' },
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

      <div className="grid grid-cols-3 md:grid-cols-2 gap-8">
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
