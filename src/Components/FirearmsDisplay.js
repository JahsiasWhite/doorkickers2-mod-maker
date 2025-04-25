import Checklist from './Checklist.js';
import {
  FirearmsCIA,
  FirearmsEnemy,
  FirearmsNWS,
  FirearmsPistols,
  FirearmsRifles,
  FirearmsSpecial,
} from '../constants/Firearms.js';

// break-inside-avoid
const FirearmsDisplay = ({ equipmentForm, setEquipmentForm }) => {
  return (
    <div>
      <label className="block text-sm pt-3 font-medium text-gray-300 pb-2">
        Bind to Firearms
      </label>
      <div className="columns-2 m-0">
        <div className="rounded p-2">
          <Checklist
            title={'CIA'}
            dataArray={FirearmsCIA}
            type={equipmentForm.bindTo}
            typeStr={'bindTo'}
            setEquipmentForm={setEquipmentForm}
          />
          <Checklist
            title={'Enemy'}
            dataArray={FirearmsEnemy}
            type={equipmentForm.bindTo}
            typeStr={'bindTo'}
            setEquipmentForm={setEquipmentForm}
          />
          <Checklist
            title={'NWS'}
            dataArray={FirearmsNWS}
            type={equipmentForm.bindTo}
            typeStr={'bindTo'}
            setEquipmentForm={setEquipmentForm}
          />
          <Checklist
            title={'Pistols'}
            dataArray={FirearmsPistols}
            type={equipmentForm.bindTo}
            typeStr={'bindTo'}
            setEquipmentForm={setEquipmentForm}
          />
          <Checklist
            title={'Rifles'}
            dataArray={FirearmsRifles}
            type={equipmentForm.bindTo}
            typeStr={'bindTo'}
            setEquipmentForm={setEquipmentForm}
          />
          <Checklist
            title={'Special'}
            dataArray={FirearmsSpecial}
            type={equipmentForm.bindTo}
            typeStr={'bindTo'}
            setEquipmentForm={setEquipmentForm}
          />
        </div>
      </div>
    </div>
  );
};

export default FirearmsDisplay;
