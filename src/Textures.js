import React, { useState } from 'react';

import GenerateXML from './GenerateXML.js';
import BackButton from './BackButton.js';
import FileUpload from './FileUpload.js';

const Textures = ({ setSelectedOption }) => {
  const [equipmentForm, setEquipmentForm] = useState({
    type: 'textures',
    textures: [],
  });

  return (
    <div className="p-8 bg-gray-900">
      <BackButton setEquipmentType={setSelectedOption} text={'Main Menu'} />

      <h2 className="text-lg font-semibold mb-4 text-white">Edit Textures</h2>
      <form className="space-y-4">
        <div className="columns-2">
          <FileUpload
            equipmentForm={equipmentForm}
            setEquipmentForm={setEquipmentForm}
          />
        </div>

        {/* XML Preview */}
        <GenerateXML equipmentForm={equipmentForm} />
      </form>
    </div>
  );
};

export default Textures;
