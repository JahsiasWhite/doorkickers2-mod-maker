import React, { useState } from 'react';

import HumanParameters from '../constants/HumanParameters.js';

import GenerateXML from '../GenerateXML.js';
import Checklist from '../Checklist.js';
import BackButton from '../BackButton.js';

const HumanParams = ({ setEquipmentType }) => {
  const [equipmentForm, setEquipmentForm] = useState({
    type: 'humanParams',
    humanParams: [],
  });

  return (
    <div className="p-8 bg-gray-900">
      <BackButton setEquipmentType={setEquipmentType} text={'Game Settings'} />

      <h2 className="text-lg font-semibold mb-4 text-white">
        Edit Human Params
      </h2>
      <form className="space-y-4">
        <div className="columns-2">
          {/* Mobility Modifiers */}
          <Checklist
            dataArray={HumanParameters}
            type={equipmentForm.humanParams}
            typeStr={'humanParams'}
            setEquipmentForm={setEquipmentForm}
          />
        </div>

        {/* XML Preview */}
        <GenerateXML equipmentForm={equipmentForm} />
      </form>
    </div>
  );
};

export default HumanParams;
