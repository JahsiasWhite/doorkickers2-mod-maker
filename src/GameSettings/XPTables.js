import React, { useState } from 'react';

import XPGainTable from '../constants/XPGainTable.js';

import GenerateXML from '../GenerateXML.js';
import Checklist from '../Checklist.js';
import BackButton from '../BackButton.js';

const XPTables = ({ setEquipmentType }) => {
  const [equipmentForm, setEquipmentForm] = useState({
    type: 'xpTables',
    xpTables: [],
  });

  return (
    <div className="p-8 bg-gray-900">
      <BackButton setEquipmentType={setEquipmentType} text={'Game Settings'} />

      <h2 className="text-lg font-semibold mb-4 text-white">Edit XP Tables</h2>
      <form className="space-y-4">
        <div className="columns-2">
          {/* Mobility Modifiers */}
          <Checklist
            dataArray={XPGainTable}
            type={equipmentForm.xpTables}
            typeStr={'xpTables'}
            setEquipmentForm={setEquipmentForm}
          />
        </div>

        {/* XML Preview */}
        <GenerateXML equipmentForm={equipmentForm} />
      </form>
    </div>
  );
};

export default XPTables;
