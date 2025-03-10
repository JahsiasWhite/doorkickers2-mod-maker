import React, { useState } from 'react';
import './App.css';
// import { Plus, Shield, Crosshair } from 'lucide-react';
import EquipmentTypeSelection from './EquipmentTypes/EquipmentTypeSelection.js';
import GameSettingsSelection from './GameSettings/GameSettingsSelection.js';
import Card from './Card.js';

const ModMaker = () => {
  const [selectedOption, setSelectedOption] = useState(null);
  const [expandedSections, setExpandedSections] = useState({});

  const renderLandingPage = () => (
    <div className="min-h-screen bg-gray-900 text-gray-100">
      <div className="max-w-6xl mx-auto py-12">
        <h1 className="text-3xl font-bold text-white mb-8 px-8">Mod Maker</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-8">
          <Card
            icon={'Crosshair'}
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
            icon={'Shield'}
            title="Edit Game Settings"
            description=""
            onClick={() => setSelectedOption('game')}
          />
        </div>
      </div>
    </div>
  );

  if (selectedOption === 'equipment') {
    return <EquipmentTypeSelection setSelectedOption={setSelectedOption} />;
  } else if (selectedOption === 'game') {
    return <GameSettingsSelection setSelectedOption={setSelectedOption} />;
  }

  return renderLandingPage();
};

export default ModMaker;
