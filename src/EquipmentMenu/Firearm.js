import React, { useState } from 'react';

import Classes from '../constants/Classes.js';
import ModifiableParams from '../constants/ModifiableParams.js';
import ModifiableParamsFirearms from '../constants/ModifiableParamsFirearms.js';
import MobilityModifiers from '../constants/MobilityModifiers.js';
import EquipmentModifier from '../constants/EquipmentModifier.js';
import AttackTypeModifier from '../constants/AttackTypeModifier.js';
import Ammo from '../constants/Ammo.js';
import Scopes from '../constants/Scopes.js';
import FirearmParams from '../constants/FirearmParams.js';

import SingleInput from '../components/SingleInput.js';
import GenerateXML from '../GenerateXML.js';
import Checklist from '../components/Checklist.js';
import FileUpload from '../components/FileUpload.js';
import ClassesChecklist from '../components/ClassesChecklist.js';
import Categories from '../constants/Categories.js';
import BackButton from '../components/BackButton.js';
import SingleFileUpload from '../components/SingleFileUpload.js';

const Firearm = ({ setEquipmentType }) => {
  const [equipmentForm, setEquipmentForm] = useState({
    name: '',
    type: 'firearm',
    inventoryBinding: 'PrimaryWeapon',
    bindToClasses: [],
    bindToAmmo: [],
    bindToScopes: [],
    concealmentModifier: 0,
    mobilityModifiers: [],
    modifiableParams: [],
    equipmentModifier: [],
    attackTypeModifier: [],
    protectionArc: [],
    params: [],
    category: '',
    tooltip: '',
    description: '',
    img: '',
    unlockCost: '',
    ddsFile: null,
    ddsFileSmall: null,
    model3D: null,
    model3DTexture: null,
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
            type={equipmentForm.bindToClasses}
            typeStr={'bindToClasses'}
            setEquipmentForm={setEquipmentForm}
          />
          {/* Bind to Ammo */}
          <Checklist
            title={'Bind to Ammo'}
            dataArray={Ammo}
            type={equipmentForm.bindToAmmo}
            typeStr={'bindToAmmo'}
            setEquipmentForm={setEquipmentForm}
          />
          {/* Bind to Scopes */}
          <Checklist
            title={'Bind to Scopes'}
            dataArray={Scopes}
            type={equipmentForm.bindToScopes}
            typeStr={'bindToScopes'}
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
          {/* <Checklist
            title={'Modifiable Parameters General'}
            dataArray={ModifiableParams}
            type={equipmentForm.modifiableParams}
            typeStr={'modifiableParams'}
            setEquipmentForm={setEquipmentForm}
          /> */}
          <Checklist
            title={'Modifiable Parameters Firearms'}
            dataArray={ModifiableParamsFirearms}
            type={equipmentForm.modifiableParams}
            typeStr={'modifiableParams'}
            setEquipmentForm={setEquipmentForm}
          />

          <Checklist
            title={'Parameters Firearms'}
            dataArray={FirearmParams}
            type={equipmentForm.params}
            typeStr={'params'}
            setEquipmentForm={setEquipmentForm}
          />
        </div>

        {/* DDS File Upload */}
        <FileUpload
          equipmentForm={equipmentForm}
          setEquipmentForm={setEquipmentForm}
        />

        <div>
          <label
            // style={{ paddingLeft: '.5rem' }}
            className="block text-sm font-medium mb-1 text-gray-300"
          >
            3D Model
          </label>
          {/* <label className="block text-sm font-medium mb-1">Image Icon</label> */}
          <div className="border rounded p-2 text-gray-300">
            <label style={{ paddingLeft: '.5rem' }}>KHM File</label>
            <SingleFileUpload
              onFileUpload={(file, filePath) =>
                setEquipmentForm({
                  ...equipmentForm,
                  model3D: file,
                })
              }
              accept=".khm"
            />
            <label style={{ paddingLeft: '.5rem' }}> DDS Texture File</label>
            <SingleFileUpload
              onFileUpload={(file, filePath) =>
                setEquipmentForm({
                  ...equipmentForm,
                  model3DTexture: file,
                })
              }
              accept=".dds"
            />
          </div>
        </div>

        {/* XML Preview */}
        <GenerateXML equipmentForm={equipmentForm} />
      </form>
    </div>
  );
};

export default Firearm;
