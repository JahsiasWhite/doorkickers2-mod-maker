import ExportZip from './ExportZIP.js';

const GenerateXML = ({ equipmentForm }) => {
  const generateXML = () => {
    return generateScopeXML();
  };

  function generateScopeXML() {
    console.error(equipmentForm);

    let xml = '<Equipment>\n';

    // xml += `  <Bind eqp="${equipmentForm.name}"/>\n`;
    // equipmentForm.bindTo.forEach((param) => {
    //   xml += `    <to name="${param}">\n`;
    // });
    // xml += '  </Bind>\n';
    equipmentForm.bindTo.forEach((param) => {
      xml += `  <Bind eqp="${param}">\n`;
      xml += `    <to name="${equipmentForm.name}" />\n`;
      xml += '  </Bind>\n';
    });

    xml += `  <Scope ${
      equipmentForm.unlockCost ? 'unlockCost=' + equipmentForm.unlockCost : ''
    }
        name="${equipmentForm.name}" 
        inventoryBinding="${equipmentForm.inventoryBinding}"
        tooltip="${equipmentForm.tooltip}"
        description="${equipmentForm.description}"
        img="${equipmentForm.img}"
        >`;
    // category

    if (equipmentForm.renderObject3D) {
      xml += `\n\n    <RenderObject3D model="${equipmentForm.renderObject3D.model}" attachSlot="${equipmentForm.renderObject3D.attachSlot}" skipGOSSA0="true" diffuseText="${equipmentForm.renderObject3D.diffuseText}"/>`;
    }
    if (equipmentForm.mobilityModifiers.length > 0) {
      xml += `\n    <MobilityModifiers `;
      equipmentForm.mobilityModifiers.forEach((param) => {
        xml += `${param.label}="${param.value}" `;
      });
      xml += '/>';
    }
    if (equipmentForm.concealmentModifier > 0) {
      xml += `\n    <ConcealmentModifier add="${equipmentForm.concealmentModifier}"/>`;
    }
    if (equipmentForm.modifiableParams.length > 0) {
      // Is there a second RenderObject3D if this is true?

      xml += `\n    <ModifiableParams\n`;
      equipmentForm.modifiableParams.forEach((param) => {
        xml += `       ${param.label}="${param.value}"\n`;
      });
      xml += '    />';
    }
    if (
      equipmentForm.equipmentModifier?.length > 0 ||
      equipmentForm.attackTypeModifier?.length > 0
    ) {
      // Is there a second RenderObject3D if this is true?

      xml += `\n    <Params>\n`;

      if (equipmentForm.equipmentModifier.length > 0) {
        xml += `\t\t<EquipmentModifier>\n`;
        xml += `\t\t\t<AddTo\n`;
        equipmentForm.equipmentModifier.forEach((param) => {
          xml += `\t\t\t\t${param.label}="${param.value}"\n`;
        });
        xml += `\t\t\t/>\n`;
        xml += `\t\t</EquipmentModifier>\n`;
      }
      if (equipmentForm.attackTypeModifier.length > 0) {
        xml += `\t\t<AttackTypeModifier>\n`;
        xml += `\t\t\t<AddTo\n`;
        equipmentForm.attackTypeModifier.forEach((param) => {
          xml += `\t\t\t\t${param.label}="${param.value}"\n`;
        });
        xml += `\t\t\t/>\n`;
        xml += `\t\t</AttackTypeModifier>`;
      }

      xml += '\n\t</Params>';
    }

    xml += '\n  </Scope>';

    xml += '\n</Equipment>';
    return xml;
  }

  return (
    <>
      <div>
        <label className="block text-sm font-medium mb-1 text-gray-300">
          Preview
        </label>
        <pre className="bg-gray-100 p-4 rounded overflow-x-auto text-sm">
          {generateXML()}
        </pre>
      </div>

      <ExportZip equipmentForm={equipmentForm} generateXML={generateXML} />
    </>
  );
};

export default GenerateXML;
