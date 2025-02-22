import React, { useState } from 'react';
import './App.css';

import EquipmentTypeSelection from './EquipmentTypeSelection.js';
// import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
// import { Plus, Shield, Sword } from 'lucide-react';

const ModMaker = () => {
  const [selectedOption, setSelectedOption] = useState(null);
  const [expandedSections, setExpandedSections] = useState({});

  const renderLandingPage = () => (
    <div className="grid grid-cols-2 gap-8 p-8">
      <div
        className="cursor-pointer hover:bg-gray-50 transition-colors"
        onClick={() => setSelectedOption('equipment')}
      >
        <div className="flex flex-col items-center justify-center p-8 h-64">
          <div className="w-16 h-16 mb-4 text-blue-500" />
          <div className="text-center">Create New Equipment</div>
          <p className="text-center mt-4 text-gray-600">
            Add new weapons, scopes, or items to the game
          </p>
        </div>
      </div>

      <div
        className="cursor-pointer hover:bg-gray-50 transition-colors"
        onClick={() => setSelectedOption('class')}
      >
        <div className="flex flex-col items-center justify-center p-8 h-64">
          <div className="w-16 h-16 mb-4 text-green-500" />
          <div className="text-center">Create New Class</div>
          <p className="text-center mt-4 text-gray-600">
            Define a new soldier class and its equipment
          </p>
        </div>
      </div>
    </div>
  );

  if (selectedOption === 'equipment') {
    return <EquipmentTypeSelection setSelectedOption={setSelectedOption} />;
  }

  return renderLandingPage();
};

export default ModMaker;
