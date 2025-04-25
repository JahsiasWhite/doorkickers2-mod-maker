import React, { useState } from 'react';
import Card from '../components/Card.js';
import Soundtrack from './Soundtrack.js';
import BackButton from '../components/BackButton.js';

const SoundSelection = ({ setSelectedOption }) => {
  const [equipmentType, setEquipmentType] = useState(null);

  const equipmentTypes = [{ name: 'Music', icon: '/MenuIcons/sound.svg' }];

  if (equipmentType) {
    switch (equipmentType) {
      case 'Music':
        return <Soundtrack setEquipmentType={setEquipmentType} />;
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

export default SoundSelection;
