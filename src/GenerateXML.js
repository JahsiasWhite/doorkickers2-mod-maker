import ExportZip from './ExportZIP.js';

const GenerateXML = ({ equipmentForm }) => {
  const generateXML = () => {
    if (equipmentForm.inventoryBinding === 'Armor') {
      return generateArmorXML();
    }
    if (equipmentForm.type === 'firearm') {
      return generateFirearmXML();
    }
    if (equipmentForm.type === 'humanParams') {
      return generateHumanParamsXML();
    }
    if (equipmentForm.type === 'soundRanges') {
      return generateSoundRangesXML();
    }
    if (equipmentForm.type === 'xpTables') {
      return generateXPTablesXML();
    }
    if (equipmentForm.type === 'scope') {
      return generateScopeXML();
    }
    if (equipmentForm.type === 'textures') {
      return 'TODO';
    }
    console.error(equipmentForm);
    console.error('No type found...');
    return 'ERROR: No type found. Please report this bug';
  };

  function generateBindXML() {
    let bindXML = '';

    bindXML += `  <Bind eqp="${equipmentForm.name}">\n`;
    equipmentForm.bindTo.forEach((param) => {
      bindXML += `    <to name="${param}" />\n`;
    });
    bindXML += '  </Bind>\n';
    return bindXML;
  }

  function generateMobilityModifiersXML() {
    let mobilityModifiersXML = `\n    <MobilityModifiers `;
    equipmentForm.mobilityModifiers.forEach((param) => {
      mobilityModifiersXML += `${param.label}="${param.value}" `;
    });
    mobilityModifiersXML += '/>';
    return mobilityModifiersXML;
  }

  function generateModifiableParamsXML() {
    let modifiableParamsXML = `\n    <ModifiableParams\n`;
    equipmentForm.modifiableParams.forEach((param) => {
      modifiableParamsXML += `       ${param.label}="${param.value}"\n`;
    });
    modifiableParamsXML += '    />';
    return modifiableParamsXML;
  }

  function generateParamsXML() {
    let paramsXML = `\n    <Params>\n`;

    if (equipmentForm.equipmentModifier?.length > 0) {
      paramsXML += generateEquipmentModifierXML();
    }

    if (equipmentForm.attackTypeModifier?.length > 0) {
      paramsXML += generateAttackTypeModifierXML();
    }

    if (equipmentForm.protectionArc?.length > 0) {
      paramsXML += generateProtectionArcXML();
    }

    paramsXML += '\n\t</Params>';
    return paramsXML;
  }

  function generateEquipmentModifierXML() {
    let equipmentModifierXML = `\t\t<EquipmentModifier>\n`;
    equipmentModifierXML += `\t\t\t<AddTo\n`;
    equipmentForm.equipmentModifier.forEach((param) => {
      equipmentModifierXML += `\t\t\t\t${param.label}="${param.value}"\n`;
    });
    equipmentModifierXML += `\t\t\t/>\n`;
    equipmentModifierXML += `\t\t</EquipmentModifier>\n`;
    return equipmentModifierXML;
  }

  function generateAttackTypeModifierXML() {
    let attackTypeModifierXML = `\t\t<AttackTypeModifier>\n`;
    attackTypeModifierXML += `\t\t\t<AddTo\n`;
    equipmentForm.attackTypeModifier.forEach((param) => {
      attackTypeModifierXML += `\t\t\t\t${param.label}="${param.value}"\n`;
    });
    attackTypeModifierXML += `\t\t\t/>\n`;
    attackTypeModifierXML += `\t\t</AttackTypeModifier>`;
    return attackTypeModifierXML;
  }

  function generateProtectionArcXML() {
    console.error(equipmentForm.protectionArc);

    let protectionArcXML = '';

    // Check if protectionArc exists and is an array
    if (Array.isArray(equipmentForm.protectionArc)) {
      // Generate a separate XML element for each arc type (Front, Back, Side)
      equipmentForm.protectionArc.forEach((arc) => {
        protectionArcXML += `\n\t\t<ProtectionArc`;

        // Add each property of the arc
        protectionArcXML += ` degrees="${arc.degrees}"`;
        protectionArcXML += ` coveragePercent="${arc.coveragePercent}"`;
        protectionArcXML += ` piercingProtectionLevel="${arc.piercingProtectionLevel}"`;

        protectionArcXML += ` />`;
      });
    }

    return protectionArcXML;
  }

  function generateConcealmentModifierXML() {
    return `\n    <ConcealmentModifier add="${equipmentForm.concealmentModifier}"/>`;
  }

  function generateSoundRangesXML() {
    let xml = '<SoundsRangeMeters\n';

    equipmentForm.soundRanges.forEach((param) => {
      xml += `\t${param.label}="${param.value}"\n`;
    });

    xml += '/>';
    return xml;
  }

  function generateXPTablesXML() {
    let xml = '<XPTables>\n';
    xml += '\t<XPGainTable>\n';

    equipmentForm.xpTables.forEach((param) => {
      xml += `\t\t<Stat name="${param.label}" xpPerUnit="${param.value}" />\n`;
    });

    xml += '\t</XPGainTable>\n';
    xml += '</XPTables>';
    return xml;
  }

  function generateHumanParamsXML() {
    let xml = '<HumanParams\n';

    equipmentForm.humanParams.forEach((param) => {
      xml += `\t${param.label}="${param.value}"\n`;
    });

    xml += '/>';
    return xml;
  }

  function generateArmorXMLContent() {
    let scopeXML = `  <Armor ${
      equipmentForm.unlockCost ? 'unlockCost=' + equipmentForm.unlockCost : ''
    }
        name="${equipmentForm.name}" 
        inventoryBinding="${equipmentForm.inventoryBinding}"
        tooltip="${equipmentForm.tooltip}"
        description="${equipmentForm.description}"
        img="${equipmentForm.img}">`;

    // Add RenderObject3D if available
    if (equipmentForm.renderObject3D) {
      // scopeXML += generateRenderObject3DXML();
    }

    // Add MobilityModifiers if available
    if (equipmentForm.mobilityModifiers.length > 0) {
      scopeXML += generateMobilityModifiersXML();
    }

    // Add ConcealmentModifier if available
    if (equipmentForm.concealmentModifier > 0) {
      scopeXML += generateConcealmentModifierXML();
    }

    // Add ModifiableParams if available
    if (equipmentForm.modifiableParams.length > 0) {
      scopeXML += generateModifiableParamsXML();
    }

    // Add Equipment or AttackType Modifiers if available
    if (
      equipmentForm.equipmentModifier?.length > 0 ||
      equipmentForm.attackTypeModifier?.length > 0 ||
      equipmentForm.protectionArc?.length > 0
    ) {
      scopeXML += generateParamsXML();
    }

    scopeXML += '\n  </Armor>';
    return scopeXML;
  }

  function generateArmorXML() {
    let xml = '<Equipment>\n';

    // Generate Bind section
    xml += generateBindXML();

    // Generate Scope section
    xml += generateArmorXMLContent();

    xml += '\n</Equipment>';
    return xml;
  }

  function generateFirearmXMLContent() {
    let scopeXML = `  <Firearm ${
      equipmentForm.unlockCost ? 'unlockCost=' + equipmentForm.unlockCost : ''
    }
        name="${equipmentForm.name}" 
        inventoryBinding="${equipmentForm.inventoryBinding}"
        category="${equipmentForm.category}"
        tooltip="${equipmentForm.tooltip}"
        description="${equipmentForm.description}"
        animationSet="${equipmentForm.category}"
        img="${equipmentForm.img}">`;

    // Add RenderObject3D if available
    if (equipmentForm.renderObject3D) {
      // scopeXML += generateRenderObject3DXML();
    }

    // Add MobilityModifiers if available
    if (equipmentForm.mobilityModifiers.length > 0) {
      scopeXML += generateMobilityModifiersXML();
    }

    // Add ConcealmentModifier if available
    if (equipmentForm.concealmentModifier > 0) {
      scopeXML += generateConcealmentModifierXML();
    }

    // Add ModifiableParams if available
    if (equipmentForm.modifiableParams.length > 0) {
      scopeXML += generateModifiableParamsXML();
    }

    // Add Equipment or AttackType Modifiers if available
    if (
      equipmentForm.equipmentModifier?.length > 0 ||
      equipmentForm.attackTypeModifier?.length > 0 ||
      equipmentForm.protectionArc?.length > 0
    ) {
      scopeXML += generateParamsXML();
    }

    scopeXML += '\n  </Firearm>';
    return scopeXML;
  }

  function generateFirearmXML() {
    let xml = '<Equipment>\n';

    // Generate Bind section
    xml += generateBindXML();

    // Generate Scope section
    xml += generateFirearmXMLContent();

    xml += '\n</Equipment>';
    return xml;
  }

  function generateScopeXML() {
    let xml = '<Equipment>\n';

    // xml += generateBindXML();
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
      xml += generateMobilityModifiersXML();
    }
    if (equipmentForm.concealmentModifier > 0) {
      xml += `\n    <ConcealmentModifier add="${equipmentForm.concealmentModifier}"/>`;
    }
    if (equipmentForm.modifiableParams.length > 0) {
      // Is there a second RenderObject3D if this is true?

      xml += generateModifiableParamsXML();
    }
    if (
      equipmentForm.equipmentModifier?.length > 0 ||
      equipmentForm.attackTypeModifier?.length > 0
    ) {
      // Is there a second RenderObject3D if this is true?

      xml += generateParamsXML();
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
