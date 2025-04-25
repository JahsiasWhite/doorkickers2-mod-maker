import React, { useState } from 'react';

import SingleInput from '../components/SingleInput.js';
import GenerateXML from '../GenerateXML.js';
import Checklist from '../components/Checklist.js';
import FileUpload from '../components/FileUpload.js';
import BackButton from '../components/BackButton.js';
import FirearmsDisplay from '../components/FirearmsDisplay.js';

const Ammo = ({ setEquipmentType }) => {
  const [equipmentForm, setEquipmentForm] = useState({
    name: '',
    type: 'ammo',
    bindTo: [],
    params: [],
    rps: 12,
    soundRadius: 60,
    impactForce: 3.0,
    silenced: false,
    dmgStart: 40,
    dmgEnd: 30,
    dmgStartDist: 0,
    dmgEndDist: 50,
    critChanceStart: 45,
    critChanceEnd: 20,
    critChanceStartDist: 0,
    critChanceEndDist: 50,
    armorPenStart: 30,
    armorPenEnd: 30,
    armorPenStartDist: 0,
    armorPenEndDist: 100,
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

        {/* Bind to Firearms */}
        <FirearmsDisplay
          equipmentForm={equipmentForm}
          setEquipmentForm={setEquipmentForm}
        />

        <div className="columns-2">
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
          <Checklist
            title={''}
            dataArray={[{ label: 'Silent shooting', value: 1, readOnly: true }]}
            type={equipmentForm.silenced}
            typeStr={'silenced'}
            setEquipmentForm={setEquipmentForm}
          />

          <SingleInput
            title={'Damage Start'}
            value={equipmentForm.dmgStart}
            onChange={(e) =>
              setEquipmentForm({
                ...equipmentForm,
                dmgStart: e.target.value,
              })
            }
          />
          <SingleInput
            title={'Damage Start Distance'}
            value={equipmentForm.dmgStartDist}
            onChange={(e) =>
              setEquipmentForm({
                ...equipmentForm,
                dmgStartDist: e.target.value,
              })
            }
          />
          <SingleInput
            title={'Damage End'}
            value={equipmentForm.dmgEnd}
            onChange={(e) =>
              setEquipmentForm({
                ...equipmentForm,
                dmgEnd: e.target.value,
              })
            }
          />
          <SingleInput
            title={'Damage End Distance'}
            value={equipmentForm.dmgEndDist}
            onChange={(e) =>
              setEquipmentForm({
                ...equipmentForm,
                dmgEndDist: e.target.value,
              })
            }
          />

          <SingleInput
            title={'Crit Chance Percent Start'}
            value={equipmentForm.critChanceStart}
            onChange={(e) =>
              setEquipmentForm({
                ...equipmentForm,
                critChanceStart: e.target.value,
              })
            }
          />
          <SingleInput
            title={'Crit Chance Percent Start Distance'}
            value={equipmentForm.critChanceStartDist}
            onChange={(e) =>
              setEquipmentForm({
                ...equipmentForm,
                critChanceStart: e.target.value,
              })
            }
          />
          <SingleInput
            title={'Crit Chance Percent End'}
            value={equipmentForm.critChanceEnd}
            onChange={(e) =>
              setEquipmentForm({
                ...equipmentForm,
                critChanceEnd: e.target.value,
              })
            }
          />
          <SingleInput
            title={'Crit Chance Percent End Distance'}
            value={equipmentForm.critChanceEndDist}
            onChange={(e) =>
              setEquipmentForm({
                ...equipmentForm,
                critChanceStart: e.target.value,
              })
            }
          />

          <SingleInput
            title={'Armor Penetration Start'}
            value={equipmentForm.armorPenStart}
            onChange={(e) =>
              setEquipmentForm({
                ...equipmentForm,
                armorPenStart: e.target.value,
              })
            }
          />
          <SingleInput
            title={'Armor Penetration Start Distance'}
            value={equipmentForm.armorPenStartDist}
            onChange={(e) =>
              setEquipmentForm({
                ...equipmentForm,
                armorPenStartDist: e.target.value,
              })
            }
          />
          <SingleInput
            title={'Armor Penetration End'}
            value={equipmentForm.armorPenEnd}
            onChange={(e) =>
              setEquipmentForm({
                ...equipmentForm,
                armorPenEnd: e.target.value,
              })
            }
          />
          <SingleInput
            title={'Armor Penetration End Distance'}
            value={equipmentForm.armorPenEndDist}
            onChange={(e) =>
              setEquipmentForm({
                ...equipmentForm,
                armorPenEndDist: e.target.value,
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
