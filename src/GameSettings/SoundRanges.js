import React, { useState } from 'react';

import SoundRangeMeters from '../constants/SoundRangeMeters.js';

import GenerateXML from '../GenerateXML.js';
import Checklist from '../Checklist.js';
import BackButton from '../BackButton.js';

const SoundRanges = ({ setEquipmentType }) => {
  const [equipmentForm, setEquipmentForm] = useState({
    type: 'soundRanges',
    soundRanges: [],
  });

  return (
    <div className="p-8 bg-gray-900">
      <BackButton setEquipmentType={setEquipmentType} text={'Game Settings'} />

      <h2 className="text-lg font-semibold mb-4 text-white">
        Edit Sound Ranges
      </h2>
      <form className="space-y-4">
        <div className="columns-2">
          {/* Mobility Modifiers */}
          <Checklist
            dataArray={SoundRangeMeters}
            type={equipmentForm.soundRanges}
            typeStr={'soundRanges'}
            setEquipmentForm={setEquipmentForm}
          />
        </div>

        {/* XML Preview */}
        <GenerateXML equipmentForm={equipmentForm} />
      </form>
    </div>
  );
};

export default SoundRanges;
