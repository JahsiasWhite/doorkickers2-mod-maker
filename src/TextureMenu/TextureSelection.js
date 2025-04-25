import React, { useState } from 'react';
import Card from '../components/Card.js';

import Textures from './Textures.js';
import BackButton from '../components/BackButton.js';

const TextureSelection = ({ setSelectedOption }) => {
  const [equipmentType, setEquipmentType] = useState(null);

  const equipmentTypes = [
    { name: 'Main Menu Background', icon: '/MenuIcons/bg_image.svg' },
  ];

  if (equipmentType) {
    switch (equipmentType) {
      case 'Main Menu Background':
        return <Textures setEquipmentType={setEquipmentType} />;
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

export default TextureSelection;
