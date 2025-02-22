import React, { useState } from 'react';

const EquipmentForm = ({ equipmentType, setEquipmentType }) => {
  const [equipmentForm, setEquipmentForm] = useState({
    // Basic Info
    name: '',
    inventoryBinding: 'PrimaryWeapon',
    category: 'melee',
    unlockCost: '6',
    tooltip: '',
    description: '',
    img: '',
    animationSet: '',

    // Bindings
    bindTo: [],

    // Mobility Modifiers
    moveSpeedModifierPercent: -7,
    turnSpeedModifierPercent: -2,
    concealmentModifier: -3,

    // Render Object
    model: '',
    diffuseTex: '',
    specularShininess: 32,
    specularIntensity: 4.0,

    // Modifiable Params
    changeInTime: 800,
    changeOutTime: 600,
    efficiencyPercent: 100,
    audibleSoundRadius: 12.0,
    meleeDamageBonus: 100,
    meleeReach: 1.5,
    meleeAttackCooldown: 200,
    meleeAttackDuration: 800,
    roundsPerMagazine: 0,
    numPellets: 1,
    reloadTime: 5,
    reloadEmptyTime: 5,
    readyTime: 450,
    guardTime: 200,
    accuracyStart: 100,
    accuracyEnd: 10,
    accuracyStartDist: 0,
    accuracyEndDist: 100,
    suppressionScale: 0.14,

    // AI Params
    operationInfoText: '@firearm_operation_pumpaction_name',
    ai_rangeMin: 0.8,
    ai_rangeOptimal: 1.0,
    ai_rangeMax: 1.5,
    ai_stopWhenShooting: true,

    // Sounds
    sound_equip: '870br_eqp',
    sound_unequip: '870br_neqp',
    sound_reload: '870br_reld',
    sound_reloadEmpty: '870br_reld',
  });

  const availableClasses = [
    'Rangers',
    'BlackOps',
    'SwatAssaulter',
    'SwatSapper',
    '12GA00BUCK_M500',
    'IronSights',
  ];

  const generateXML = () => {
    let xml = '<Equipment>\n';

    // Add binding section
    xml += '  <Bind eqp="' + equipmentForm.name + '">\n';
    equipmentForm.bindTo.forEach((className) => {
      xml += `    <to name="${className}"/>\n`;
    });
    xml += '  </Bind>\n\n';

    // Add equipment definition based on type
    switch (equipmentType) {
      case 'Stimulant':
        xml += `  <Helmet name="${equipmentForm.name}" 
    inventoryBinding="${equipmentForm.inventoryBinding}"
    unlockCost="${equipmentForm.unlockCost}"
    tooltip="${equipmentForm.tooltip}"
    description="${equipmentForm.description}"
    img="${equipmentForm.img}">
    <MobilityModifiers moveSpeedModifierPercent="15" turnSpeedModifierPercent="15"/>
    <Params>
    </Params>
    <ModifiableParams
      suppressionRecoveryAdd="100"
    />
  </Helmet>`;
        break;
      // Add other equipment type templates
    }

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

      <div>
        <div>
          <div>Create New {equipmentType}</div>
        </div>
        <div>
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

            <div>
              <label className="block text-sm font-medium mb-1">
                Inventory Binding
              </label>
              <input
                type="text"
                className="w-full p-2 border rounded"
                value={equipmentForm.inventoryBinding}
                onChange={(e) =>
                  setEquipmentForm({
                    ...equipmentForm,
                    inventoryBinding: e.target.value,
                  })
                }
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">
                Bind to Classes
              </label>
              <select
                multiple
                className="w-full p-2 border rounded h-32"
                value={equipmentForm.bindTo}
                onChange={(e) =>
                  setEquipmentForm({
                    ...equipmentForm,
                    bindTo: Array.from(
                      e.target.selectedOptions,
                      (option) => option.value
                    ),
                  })
                }
              >
                {availableClasses.map((className) => (
                  <option key={className} value={className}>
                    {className}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Preview</label>
              <pre className="bg-gray-100 p-4 rounded overflow-x-auto text-sm">
                {generateXML()}
              </pre>
            </div>

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
      </div>
    </div>
  );
};

export default EquipmentForm;
