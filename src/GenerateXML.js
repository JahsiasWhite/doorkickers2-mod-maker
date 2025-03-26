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
    if (equipmentForm.type === 'ammo') {
      return generateAmmoXML();
    }
    if (equipmentForm.type === 'scope') {
      return generateScopeXML();
    }
    if (equipmentForm.type === 'textures') {
      return generateTexturesXML();
    }
    if (equipmentForm.type === 'soundtrack') {
      return generateSoundtrackXML();
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
    description="${equipmentForm.description}"`;

    if (equipmentForm.ddsFile?.name) {
      scopeXML += `\n\timg="data/models/weapons/attachments/${equipmentForm.ddsFile.name}"`;
    }
    scopeXML += `\n  >\n`;

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
    animationSet="${equipmentForm.category}"`;

    if (equipmentForm.ddsFile?.name) {
      scopeXML += `\n\timg="data/models/weapons/attachments/${equipmentForm.ddsFile.name}"`;
    }
    scopeXML += `\n  >\n`;

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

  function generateSoundtrackXML() {
    let xml = '<Sounds>';

    if (equipmentForm.files.mainMenuMusic.filePath) {
      xml += `
    <Sound ID="music_main_menu" channel="music" stream="true" preload="true">
      <Path name="data/sounds/music/${equipmentForm.files.mainMenuMusic.filePath}" />
	</Sound>`;
    }

    if (equipmentForm.files.soundtracks?.length > 0) {
      xml += `\n
    <!-- in case of streamed sounds, 'preload' means that only their headers are parsed, they won't be entirely preloaded -->
	<Sound ID="music_ingame" channel="music" stream="true" preload="true">`;

      equipmentForm.files.soundtracks.forEach((param) => {
        xml += `
      <Path name="data/sounds/music/${param.filePath}"/>`;
      });
      xml += `
    </Sound>`;
    }

    if (equipmentForm.files.winSounds?.length > 0) {
      xml += `\n
	<Sound ID="music_win" channel="music" stream="true" preload="true">`;

      equipmentForm.files.winSounds.forEach((param) => {
        xml += `
      <Path name="data/sounds/music/${param.filePath}"/>`;
      });

      xml += `
    </Sound>`;
    }

    if (equipmentForm.files.loseSounds?.length > 0) {
      xml += `\n
	<Sound ID="music_fail" channel="music" stream="true" preload="true">`;

      equipmentForm.files.loseSounds.forEach((param) => {
        xml += `
      <Path name="data/sounds/music/${param.filePath}"/>`;
      });

      xml += `
    </Sound>`;
    }

    xml += '\n</Sounds>';
    return xml;
  }

  // Just using rangers background for now...
  function generateTexturesXML() {
    const uploadedBgImages = () => {
      if (equipmentForm.bgImages.length < 2) {
        return `<Item>
          <StaticImage origin="0 0">
            <RenderObject2D texture="${equipmentForm.bgImages[0].bgPath}"/>

            <!-- 'origin' for these is a multiplier for the movement speed of each layer, gets multiplied by #parallax_speed -->
            <Item name="#parallax_layer_speed" origin="${equipmentForm.bgImages[0].xSpeed} ${equipmentForm.bgImages[0].ySpeed}"/>
          </StaticImage>
        </Item>`;
      }

      let images = '';
      for (let i = 1; i < equipmentForm.bgImages.length; i++) {
        images += `
        <Item>
            <StaticImage origin="${equipmentForm.bgImages[i].xLoc} ${
          equipmentForm.bgImages[i].yLoc
        }">
              <RenderObject2D texture="data/textures/gui/${
                equipmentForm.bgImages[i].bgPath
              }"/>
              ${
                equipmentForm.bgImages[i].anim
                  ? `\n\t\t\t  <ImageAnim type="scroll" speed="${equipmentForm.bgImages[i].animSpeed}" direction="${equipmentForm.bgImages[i].animX} ${equipmentForm.bgImages[i].animY}"/>`
                  : ''
              }
              <!-- 'origin' for these is a multiplier for the movement speed of each layer, gets multiplied by #parallax_speed -->
              <Item name="#parallax_layer_speed" origin="${
                equipmentForm.bgImages[i].xSpeed
              } ${equipmentForm.bgImages[i].ySpeed}"/>
            </StaticImage>
          </Item>`;
      }
      return images;
    };

    let xml = `<GUIItems>

  <Item name="Menu_Main_Blurred_Background" hidden="true">
    <OnOpen>
      <Action type="MoveToBackground" target="Menu_Main_Blurred_Background"/>
    </OnOpen>

    <!-- 
      name is Menu_Main_Background_## , where the game tries to match the unit name as ## 
        if not found, it will fall back to Rangers
    -->
    

  <Item name="Menu_Main_Background_Rangers">
      <!-- global speed with which the layers move around in their default animation -->
      <Item name="#parallax_speed" origin="${equipmentForm.parallaxSpeedX} ${
      equipmentForm.parallaxSpeedY
    }"/>  <!-- the layers go out of screen in 16:10, no Y movement -->
      <!--<Item name="#parallax_speed" origin="0.0 0"/>-->

      <!-- multiplier for how much the screen moves with the mouse horizontally/vertically (vertical (y) movement scales the image, while horizontal (x) movement will add on top of the default horizontal animation -->
      <Item name="#parallax_mouse_scale" origin="${equipmentForm.mouseScaleX} ${
      equipmentForm.mouseScaleY
    }"/>
      <!--<Item name="#parallax_mouse_scale" origin="-1.0 0.003"/>-->

      <Item name="#parallax_elements">
        ${uploadedBgImages()}
      </Item>
    </Item>
  </Item>

</GUIItems>`;

    return xml;
  }

  function generateAmmoXML() {
    let xml = '<Equipment>\n';

    // xml += generateBindXML();
    equipmentForm.bindTo.forEach((param) => {
      xml += `  <Bind eqp="${param}">\n`;
      xml += `    <to name="${equipmentForm.name}" />\n`;
      xml += '  </Bind>\n';
    });

    xml += `  <Ammo ${
      equipmentForm.unlockCost ? 'unlockCost=' + equipmentForm.unlockCost : ''
    }
    name="${equipmentForm.name}" 
    tooltip="${equipmentForm.tooltip}"
    description="${equipmentForm.description}"`;

    if (equipmentForm.ddsFile?.name) {
      xml += `\n\timg="data/models/weapons/attachments/${equipmentForm.ddsFile.name}"`;
    }
    xml += `\n  >\n`;

    xml += `\t\t<!-- defines base ROF and sound of weapon -->
		<Params roundsPerSecond="${equipmentForm.rps}"
				audibleSoundRadius="${equipmentForm.soundRadius}"
				physicsImpactForce="${equipmentForm.impactForce}"${
      equipmentForm.silenced[0] ? '\n\t\t\t\tsilenced=1' : ''
    }
				>

			<!-- the damage value is linearly interpolated in the given range, between min/max damage -->
			<Damage start="${equipmentForm.dmgStart}" end="${
      equipmentForm.dmgEnd
    }" startDist="${equipmentForm.dmgStartDist}" endDist="${
      equipmentForm.dmgEndDist
    }"/>

			<!-- base value, can be modified by AttackType/Abilities/Doctrine/etc. -->
			<CriticalChancePercent start="${equipmentForm.critChanceStart}" end="${
      equipmentForm.critChanceEnd
    }" startDist="${equipmentForm.critChanceStartDist}" endDist="${
      equipmentForm.critChanceEndDist
    }"/>

			<!-- i.e. divides distance range in (end - start) discrete intervals for AP -->
			<ArmorPenetration start="${equipmentForm.armorPenStart}" end="${
      equipmentForm.armorPenEnd
    }" startDist="${equipmentForm.armorPenStartDist}" endDist="${
      equipmentForm.armorPenEndDist
    }"/>
		</Params>`;

    xml += '\n  </Scope>';

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
    description="${equipmentForm.description}"`;

    if (equipmentForm.ddsFile?.name) {
      xml += `\n\timg="data/models/weapons/attachments/${equipmentForm.ddsFile.name}"`;
    }
    xml += `\n  >\n`;

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
