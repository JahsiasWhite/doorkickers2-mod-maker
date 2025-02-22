import React, { useState } from 'react';
import Classes from '../constants/Classes.js';
import ModifiableParams from '../constants/ModifiableParams.js';

import GenerateXML from '../GenerateXML.js';
import Checklist from '../Checklist.js';
import FileUpload from '../FileUpload.js';

const EquipmentForm = ({ setEquipmentType }) => {
  const [equipmentForm, setEquipmentForm] = useState({
    name: '',
    inventoryBinding: 'PrimaryWeaponScope',
    bindTo: [],
    modifiableParams: [],
    tooltip: '',
    description: '',
    img: '',
    unlockCost: '',
    ddsFile: null,
  });
  console.error(equipmentForm);

  return (
    <div className="p-8">
      <button
        onClick={() => setEquipmentType(null)}
        className="mb-8 text-blue-500 hover:text-blue-600"
      >
        ← Back to Equipment Types
      </button>

      <h2 className="text-lg font-semibold mb-4">Create New Scope</h2>
      <form className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Name</label>
          <input
            type="text"
            className="w-full p-2 border rounded"
            value={equipmentForm.name}
            onChange={(e) =>
              setEquipmentForm({ ...equipmentForm, name: e.target.value })
            }
          />
        </div>

        {/* Bind to Classes */}
        <div>
          <label className="block text-sm font-medium mb-1">
            Bind to Classes
          </label>
          <Checklist
            dataArray={Classes}
            type={equipmentForm.bindTo}
            typeStr={'bindTo'}
            setEquipmentForm={setEquipmentForm}
          />
        </div>

        {/* Modifiable Parameters*/}
        <div>
          <label className="block text-sm font-medium mb-1">
            Modifiable Parameters
          </label>
          <Checklist
            dataArray={ModifiableParams}
            type={equipmentForm.modifiableParams}
            typeStr={'modifiableParams'}
            setEquipmentForm={setEquipmentForm}
          />
        </div>

        {/* DDS File Upload */}
        <FileUpload
          equipmentForm={equipmentForm}
          setEquipmentForm={setEquipmentForm}
        />

        {/* XML Preview */}
        <GenerateXML equipmentForm={equipmentForm} />
      </form>
    </div>
  );
};

export default EquipmentForm;
