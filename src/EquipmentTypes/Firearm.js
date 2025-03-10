import React, { useState } from 'react';

import Classes from '../constants/Classes.js';
import ModifiableParams from '../constants/ModifiableParams.js';
import ModifiableParamsFirearms from '../constants/ModifiableParamsFirearms.js';
import MobilityModifiers from '../constants/MobilityModifiers.js';
import ConcealmentModifier from '../constants/ConcealmentModifier.js';
import EquipmentModifier from '../constants/EquipmentModifier.js';
import AttackTypeModifier from '../constants/AttackTypeModifier.js';
import Ammo from '../constants/Ammo.js';
import Scopes from '../constants/Scopes.js';

import SingleInput from '../SingleInput.js';
import GenerateXML from '../GenerateXML.js';
import Checklist from '../Checklist.js';
import FileUpload from '../FileUpload.js';
import Firearms from '../constants/Firearms.js';
import ClassesChecklist from '../ClassesChecklist.js';
import ProtectionArc from '../constants/ProtectionArc.js';
import ProtectionArcChecklist from '../ProtectionArcChecklist.js';
import Categories from '../constants/Categories.js';
import BackButton from '../BackButton.js';

const Firearm = ({ setEquipmentType }) => {
  const [equipmentForm, setEquipmentForm] = useState({
    name: '',
    type: 'firearm',
    inventoryBinding: 'PrimaryWeaponMuzzle',
    bindTo: [],
    concealmentModifier: 0,
    mobilityModifiers: [],
    modifiableParams: [],
    equipmentModifier: [],
    attackTypeModifier: [],
    protectionArc: [],
    category: '',
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
        Create New Firearm - WORK IN PROGRESS. NOT ALL FEATURES PRESENT AND MAY
        NOT WORK
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

        <div className="columns-2">
          {/* Bind to Classes */}
          <ClassesChecklist
            title={'Bind to Classes'}
            dataArray={Classes}
            type={equipmentForm.bindTo}
            typeStr={'bindTo'}
            setEquipmentForm={setEquipmentForm}
          />
          {/* Bind to Ammo */}
          <Checklist
            title={'Bind to Ammo'}
            dataArray={Ammo}
            type={equipmentForm.bindTo}
            typeStr={'bindTo'}
            setEquipmentForm={setEquipmentForm}
          />
          {/* Bind to Scopes */}
          <Checklist
            title={'Bind to Scopes'}
            dataArray={Scopes}
            type={equipmentForm.bindTo}
            typeStr={'bindTo'}
            setEquipmentForm={setEquipmentForm}
          />

          {/* Weapon Category */}
          <Checklist
            title={'Weapon category'}
            dataArray={Categories}
            type={equipmentForm.category}
            typeStr={'category'}
            setEquipmentForm={setEquipmentForm}
          />

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
            title={'Modifiable Parameters General'}
            dataArray={ModifiableParams}
            type={equipmentForm.modifiableParams}
            typeStr={'modifiableParams'}
            setEquipmentForm={setEquipmentForm}
          />
          <Checklist
            title={'Modifiable Parameters Firearms'}
            dataArray={ModifiableParamsFirearms}
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

export default Firearm;
