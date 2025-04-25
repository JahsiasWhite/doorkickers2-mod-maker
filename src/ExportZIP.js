import React, { useState } from 'react';
import JSZip from 'jszip';
import SingleInput from './SingleInput';
import SingleFileUpload from './SingleFileUpload';

const ExportZip = ({ equipmentForm, generateXML }) => {
  const [modDetails, setModDetails] = useState({
    title: equipmentForm.name || '',
    description: equipmentForm.description || '',
    author: '',
    image: null,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setModDetails((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleBackgroundImageChange = (file) => {
    // Extract file extension using the filename
    const fileExtension = file.name.split('.').pop().toLowerCase();

    setModDetails((prev) => ({
      ...prev,
      image: file,
      imageExt: fileExtension,
    }));
  };

  const handleExportZip = async () => {
    // Validate required fields
    if (!modDetails.title || !modDetails.author) {
      alert('Please enter a mod title and author name');
      return;
    }

    const zip = new JSZip();

    // Add required mod.xml with updated details
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
	title="${modDetails.title}"
	description="${modDetails.description}"
	author="${modDetails.author}"
	tags=""	
	changeNotes=""
	languageMod=""
	gameVersion="100"
/>
`
    );

    if (modDetails.image) {
      const ddsBlob = await modDetails.image.arrayBuffer();
      zip.file(`mod_image.${modDetails.imageExt}`, ddsBlob);
    }

    // Add main XML file based on equipment type
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
    } else if (equipmentForm.type === 'soundtrack') {
      zip.file(`sounds/soundtrack_library.xml`, generateXML());

      if (equipmentForm.files.mainMenuMusic) {
        const ddsBlob =
          await equipmentForm.files.mainMenuMusic.file.arrayBuffer();
        zip.file(
          `sounds/music/${equipmentForm.files.mainMenuMusic.filePath}`,
          ddsBlob
        );
      }

      if (equipmentForm.files.soundtracks?.length > 0) {
        for (let i = 0; i < equipmentForm.files.soundtracks.length; i++) {
          const ddsBlob = await equipmentForm.files.soundtracks[
            i
          ].file.arrayBuffer();
          zip.file(
            `sounds/music/${equipmentForm.files.soundtracks[i].filePath}`,
            ddsBlob
          );
        }
      }

      if (equipmentForm.files.winSounds?.length > 0) {
        for (let i = 0; i < equipmentForm.files.winSounds.length; i++) {
          const ddsBlob = await equipmentForm.files.winSounds[
            i
          ].file.arrayBuffer();
          zip.file(
            `sounds/music/${equipmentForm.files.winSounds[i].filePath}`,
            ddsBlob
          );
        }
      }

      if (equipmentForm.files.loseSounds?.length > 0) {
        for (let i = 0; i < equipmentForm.files.loseSounds.length; i++) {
          const ddsBlob = await equipmentForm.files.loseSounds[
            i
          ].file.arrayBuffer();
          zip.file(
            `sounds/music/${equipmentForm.files.loseSounds[i].filePath}`,
            ddsBlob
          );
        }
      }

      /* Equipment */
    } else {
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
      if (equipmentForm.ddsFileSmall) {
        const ddsBlob = await equipmentForm.ddsFileSmall.arrayBuffer();
        zip.file(
          `models/weapons/attachments/${equipmentForm.ddsFileSmall.name}`,
          ddsBlob
        );
      }

      if (equipmentForm.model3D) {
        const model3D = await equipmentForm.model3D.arrayBuffer();
        zip.file(`models/weapons/${equipmentForm.model3D.name}`, model3D);

        if (equipmentForm.model3DTexture) {
          const model3DTexture =
            await equipmentForm.model3DTexture.arrayBuffer();
          zip.file(
            `models/weapons/${equipmentForm.model3DTexture.name}`,
            model3DTexture
          );
        }
      }
    }

    // Generate ZIP and trigger download
    zip.generateAsync({ type: 'blob' }).then((content) => {
      const url = URL.createObjectURL(content);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${modDetails.title}_mod.zip`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    });
  };

  return (
    <div className="space-y-4 text-gray-300">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <SingleInput
          title={'Mod Title'}
          value={modDetails.title}
          onChange={(e) =>
            setModDetails({
              ...modDetails,
              title: e.target.value,
            })
          }
        />

        <SingleInput
          title={'Mod Author'}
          value={modDetails.author}
          onChange={(e) =>
            setModDetails({
              ...modDetails,
              author: e.target.value,
            })
          }
        />

        <SingleInput
          title={'Mod Description'}
          value={modDetails.description}
          onChange={(e) =>
            setModDetails({
              ...modDetails,
              description: e.target.value,
            })
          }
        />

        <div>
          <label htmlFor="image" className="block text-sm font-medium">
            Mod Image
          </label>
          <SingleFileUpload
            onFileUpload={(file, filePath) =>
              handleBackgroundImageChange(file, filePath)
            }
            accept="image/*"
          />
        </div>
      </div>

      <div>
        <button
          type="button"
          className="w-full bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition duration-300"
          onClick={handleExportZip}
        >
          Download Mod ZIP
        </button>
      </div>
    </div>
  );
};

export default ExportZip;
