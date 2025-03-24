import React, { useState } from 'react';
import './App.css';
// import { Plus, Shield, Crosshair } from 'lucide-react';
import EquipmentTypeSelection from './EquipmentTypes/EquipmentTypeSelection.js';
import GameSettingsSelection from './GameSettings/GameSettingsSelection.js';
import Card from './Card.js';
import HowToUseMods from './HowToUseMods.js';
import TextureSelection from './Textures/TextureSelection.js';
import SoundSelection from './SoundMenu/SoundSelection.js';

const ModMaker = () => {
  const [selectedOption, setSelectedOption] = useState(null);
  const [expandedSections, setExpandedSections] = useState({});

  const renderLandingPage = () => (
    <div className="min-h-screen bg-gray-900 text-gray-100">
      <div className="max-w-6xl mx-auto py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-8">
          <Card
            icon={'/MenuIcons/equipment.svg'}
            title="Create New Equipment"
            description="Add new weapons, scopes, or items to the game. Customize their attributes and appearance."
            onClick={() => setSelectedOption('equipment')}
          />

          {/* <Card
            icon={'Shield'}
            title="Create New Class"
            description="Define a new soldier class and its equipment. Set up unique abilities and loadouts."
            onClick={() => setSelectedOption('class')}
          /> */}

          <Card
            icon={'/MenuIcons/gear.svg'}
            title="Edit Game Settings"
            description=""
            onClick={() => setSelectedOption('game')}
          />

          <Card
            icon={'/MenuIcons/wall.svg'}
            title="Edit Textures"
            description=""
            onClick={() => setSelectedOption('textures')}
          />

          <Card
            icon={'/MenuIcons/sound.svg'}
            title="Edit Sounds"
            description=""
            onClick={() => setSelectedOption('sounds')}
          />

          <Card
            icon={'/MenuIcons/question.svg'}
            title="How To Use"
            description=""
            onClick={() => setSelectedOption('howto')}
          />
        </div>
      </div>
    </div>
  );

  if (selectedOption === 'equipment') {
    return <EquipmentTypeSelection setSelectedOption={setSelectedOption} />;
  } else if (selectedOption === 'game') {
    return <GameSettingsSelection setSelectedOption={setSelectedOption} />;
  } else if (selectedOption === 'textures') {
    return <TextureSelection setSelectedOption={setSelectedOption} />;
  } else if (selectedOption === 'sounds') {
    return <SoundSelection setSelectedOption={setSelectedOption} />;
  } else if (selectedOption === 'howto') {
    return <HowToUseMods setSelectedOption={setSelectedOption} />;
  }

  return renderLandingPage();
};

export default ModMaker;
