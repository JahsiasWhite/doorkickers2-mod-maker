import React, { useState } from 'react';

import SingleInput from '../SingleInput.js';
import GenerateXML from '../GenerateXML.js';
import Checklist from '../Checklist.js';
import FileUpload from '../FileUpload.js';
import Firearms from '../constants/Firearms.js';
import BackButton from '../BackButton.js';
import ProtectionArcChecklist from '../ProtectionArcChecklist.js';
import SingleChecklist from '../SingleChecklist.js';

const params = [
  { label: 'roundsPerSecond', value: 12 },
  { label: 'audibleSoundRadius', value: 60 },
  { label: 'physicsImpactForce', value: 3.0 },
];

const Ammo = ({ setEquipmentType }) => {
  const [equipmentForm, setEquipmentForm] = useState({
    name: '',
    type: 'ammo',
    bindTo: [],
    params: [],
    rps: 12,
    soundRadius: 60,
    impactForce: 3.0,
    ddsFile: null,
    ddsFileSmall: null,
  });

  return (
    <div className="p-8 bg-gray-900">
      <BackButton
        setEquipmentType={setEquipmentType}
        text={'Equipment Types'}
      />

      <h2 className="text-lg font-semibold mb-4 text-white">Create New Ammo</h2>
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
          {/* Bind to Firearms */}
          <Checklist
            title={'Bind to Firearms'}
            dataArray={Firearms}
            type={equipmentForm.bindTo}
            typeStr={'bindTo'}
            setEquipmentForm={setEquipmentForm}
          />

          <SingleInput
            title={'Rounds Per Second'}
            value={equipmentForm.rps}
            onChange={(e) =>
              setEquipmentForm({ ...equipmentForm, rps: e.target.value })
            }
          />
          <SingleInput
            title={'Audible Sound Radius'}
            value={equipmentForm.soundRadius}
            onChange={(e) =>
              setEquipmentForm({
                ...equipmentForm,
                soundRadius: e.target.value,
              })
            }
          />
          <SingleInput
            title={'Physics Impact Force'}
            value={equipmentForm.impactForce}
            onChange={(e) =>
              setEquipmentForm({
                ...equipmentForm,
                impactForce: e.target.value,
              })
            }
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

export default Ammo;
