import React, { useState } from 'react';
import Classes from '../constants/Classes.js';
import ModifiableParams from '../constants/ModifiableParams.js';

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
  });

  const handleCheckboxChange = (e, field) => {
    const { value, checked } = e.target;
    setEquipmentForm((prev) => ({
      ...prev,
      [field]: checked
        ? [...prev[field], value]
        : prev[field].filter((item) => item !== value),
    }));
  };

  const generateXML = () => {
    let xml = '<Equipment>\n';

    xml += `  <Bind eqp="${equipmentForm.name}">\n`;
    equipmentForm.bindTo.forEach((className) => {
      xml += `    <to name="${className}"/>\n`;
    });
    xml += '  </Bind>\n';

    xml += `  <Scope name="${equipmentForm.name}" 
    inventoryBinding="${equipmentForm.inventoryBinding}"
    tooltip="${equipmentForm.tooltip}"
    description="${equipmentForm.description}"
    img="${equipmentForm.img}"
    unlockCost="${equipmentForm.unlockCost}"`;

    if (equipmentForm.modifiableParams.length > 0) {
      xml += `\n\n    <ModifiableParams\n`;
      equipmentForm.modifiableParams.forEach((param) => {
        xml += `       ${param}=""\n`;
      });
      xml += '    />';
    }
    xml += '\n  </Scope>';

    xml += '\n</Equipment>';
    return xml;
  };

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
        {/* Name Input */}
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

        {/* Bind to Classes (Styled Checkboxes) */}
        <div>
          <label className="block text-sm font-medium mb-1">
            Bind to Classes
          </label>
          <div className="w-full p-2 border rounded h-32 overflow-y-auto bg-white">
            {Classes.map((className) => (
              <label
                key={className}
                className={`flex items-center space-x-2 px-2 py-1 cursor-pointer hover:bg-gray-100 rounded ${
                  equipmentForm.bindTo.includes(className) ? 'bg-gray-200' : ''
                }`}
              >
                <input
                  type="checkbox"
                  value={className}
                  checked={equipmentForm.bindTo.includes(className)}
                  onChange={(e) => handleCheckboxChange(e, 'bindTo')}
                  className="rounded"
                />
                <span>{className}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Modifiable Parameters (Styled Checkboxes) */}
        <div>
          <label className="block text-sm font-medium mb-1">
            Modifiable Parameters
          </label>
          <div className="w-full p-2 border rounded h-32 overflow-y-auto bg-white">
            {ModifiableParams.map((param) => (
              <label
                key={param}
                className={`flex items-center space-x-2 px-2 py-1 cursor-pointer hover:bg-gray-100 rounded ${
                  equipmentForm.modifiableParams.includes(param)
                    ? 'bg-gray-200'
                    : ''
                }`}
              >
                <input
                  type="checkbox"
                  value={param}
                  checked={equipmentForm.modifiableParams.includes(param)}
                  onChange={(e) => handleCheckboxChange(e, 'modifiableParams')}
                  className="rounded"
                />
                <span>{param}</span>
              </label>
            ))}
          </div>
        </div>

        {/* XML Preview */}
        <div>
          <label className="block text-sm font-medium mb-1">Preview</label>
          <pre className="bg-gray-100 p-4 rounded overflow-x-auto text-sm">
            {generateXML()}
          </pre>
        </div>

        {/* Download XML Button */}
        <button
          type="button"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          onClick={() => {
            const blob = new Blob([generateXML()], { type: 'text/xml' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = 'equipment.xml';
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            URL.revokeObjectURL(url);
          }}
        >
          Download XML
        </button>
      </form>
    </div>
  );
};

export default EquipmentForm;
