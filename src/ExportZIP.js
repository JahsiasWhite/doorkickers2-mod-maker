import JSZip from 'jszip';

const ExportZip = ({ equipmentForm, generateXML }) => {
  const handleExportZip = async () => {
    const zip = new JSZip();

    // Add required mod.xml
    zip.file(
      'mod.xml',
      `<!--
"title" uniquely identifies the mod name in Steam Workshop. Once published to workshop, the mod name can no longer be changed.
"description" what is says
"author" what is says
"tags" only show up in Steam Workshop. comma-separated values. preferably one of: 
	Missions,Campaign,New Unit,UI,Equipment,Sound,Translation,Total Conversion,Other
"gameVersion" game version with which the mod is compatible (if the game says we're at 0.35 gameVersion="35". If the game says 1.24 gameVersion="124")
"changeNotes" only used when updating an already published mod, redundant otherwise
"languageMod" should only be valid if this adds a new language to the game, in which case it will show up in the Languages options list
-->
<Mod
	title="${equipmentForm.name}"
	description="${equipmentForm.description}"
	author="me"
	tags=""	
	changeNotes=""
	languageMod=""
	gameVersion="100"
/>
`
    );

    // Add modified equipment XML file
    if (equipmentForm.type === 'humanParams') {
      zip.file(`gameplay_settings/human_params.xml`, generateXML());
    } else if (equipmentForm.type === 'soundRanges') {
      zip.file(`gameplay_settings/sound_ranges.xml`, generateXML());
    } else if (equipmentForm.type === 'xpTables') {
      zip.file(`gameplay_settings/xp_tables.xml`, generateXML());
    } else if (equipmentForm.type === 'textures') {
      zip.file(`gui/main_menu_background.xml`, generateXML());

      // Add DDS file if uploaded
      if (equipmentForm.bgImages.length > 1) {
        for (let i = 1; i < equipmentForm.bgImages.length; i++) {
          const ddsBlob = await equipmentForm.bgImages[i].bgFile.arrayBuffer();
          zip.file(
            `textures/gui/${equipmentForm.bgImages[i].bgFile.name}`,
            ddsBlob
          );
        }
      }
    } else {
      // Equipment
      zip.file(
        `equipment/${equipmentForm.type}_${equipmentForm.name}.xml`,
        generateXML()
      );

      // Add DDS file if uploaded
      if (equipmentForm.ddsFile) {
        const ddsBlob = await equipmentForm.ddsFile.arrayBuffer();
        zip.file(
          `models/weapons/attachments/${equipmentForm.ddsFile.name}`,
          ddsBlob
        );
      }
    }

    // Generate ZIP and trigger download
    zip.generateAsync({ type: 'blob' }).then((content) => {
      const url = URL.createObjectURL(content);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${equipmentForm.type}_mod.zip`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    });
  };

  return (
    <button
      type="button"
      className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
      onClick={handleExportZip}
    >
      Download Mod ZIP
    </button>
  );
};

export default ExportZip;
