import React, { useState } from 'react';

import Classes from '../constants/Classes.js';
import ModifiableParams from '../constants/ModifiableParams.js';
import MobilityModifiers from '../constants/MobilityModifiers.js';
import ConcealmentModifier from '../constants/ConcealmentModifier.js';
import EquipmentModifier from '../constants/EquipmentModifier.js';
import AttackTypeModifier from '../constants/AttackTypeModifier.js';

import SingleInput from '../components/SingleInput.js';
import GenerateXML from '../GenerateXML.js';
import Checklist from '../components/Checklist.js';
import FileUpload from '../components/FileUpload.js';
// import Firearms from '../constants/Firearms.js';
import BackButton from '../components/BackButton.js';
import FirearmsDisplay from '../components/FirearmsDisplay.js';

const EquipmentForm = ({ setEquipmentType }) => {
  const [equipmentForm, setEquipmentForm] = useState({
    name: '',
    type: 'scope',
    inventoryBinding: 'PrimaryWeaponScope',
    bindTo: [],
    concealmentModifier: 0,
    mobilityModifiers: [],
    modifiableParams: [],
    equipmentModifier: [],
    attackTypeModifier: [],
    tooltip: '',
    description: '',
    img: '',
    unlockCost: '',
    ddsFile: null,
    ddsFileSmall: null,
  });

  return (
    <div className="p-8 bg-gray-900">
      <BackButton
        setEquipmentType={setEquipmentType}
        text={'Equipment Types'}
      />

      <h2 className="text-lg font-semibold mb-4 text-white">
        Create New Scope
      </h2>
      <form className="space-y-4">
        <SingleInput
          title={'Name'}
          value={equipmentForm.name}
          onChange={(e) =>
            setEquipmentForm({ ...equipmentForm, name: e.target.value })
          }
        />
        <SingleInput
          title={'Tool Tip'}
          value={equipmentForm.tooltip}
          onChange={(e) =>
            setEquipmentForm({ ...equipmentForm, tooltip: e.target.value })
          }
        />
        <SingleInput
          title={'Description'}
          value={equipmentForm.description}
          onChange={(e) =>
            setEquipmentForm({ ...equipmentForm, description: e.target.value })
          }
        />

        {/* Bind to Firearms */}
        <FirearmsDisplay
          equipmentForm={equipmentForm}
          setEquipmentForm={setEquipmentForm}
        />

        <div className="columns-2">
          {/* Mobility Modifiers */}
          <Checklist
            title={'Mobility Modifiers'}
            dataArray={MobilityModifiers}
            type={equipmentForm.mobilityModifiers}
            typeStr={'mobilityModifiers'}
            setEquipmentForm={setEquipmentForm}
          />

          {/* Concealment Modifier */}
          <SingleInput
            title={'Concealment Modifier'}
            value={equipmentForm.concealmentModifier}
            onChange={(e) =>
              setEquipmentForm({
                ...equipmentForm,
                concealmentModifier: e.target.value,
              })
            }
          />

          {/* Modifiable Parameters */}
          <Checklist
            title={'Modifiable Parameters'}
            dataArray={ModifiableParams}
            type={equipmentForm.modifiableParams}
            typeStr={'modifiableParams'}
            setEquipmentForm={setEquipmentForm}
          />

          {/* Equipment Modifier */}
          <Checklist
            title={'Equipment Modifier'}
            dataArray={EquipmentModifier}
            type={equipmentForm.equipmentModifier}
            typeStr={'equipmentModifier'}
            setEquipmentForm={setEquipmentForm}
          />

          {/* Attack Type Modifier */}
          <Checklist
            title={'Attack Type Modifier'}
            dataArray={AttackTypeModifier}
            type={equipmentForm.attackTypeModifier}
            typeStr={'attackTypeModifier'}
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
