/**
 * Music has 4 main categories: "music_main_menu", "music_ingame", "music_win", "music_fail"
 * Files must be in .ogg format
 * music_main_menu can have more than one entry, the selection will be randomized
 * For music_ingame, if only one Path is added, the other default 8 will still run. There is a max of 9 songs
 *
 */

import React, { useState } from 'react';

import GenerateXML from '../GenerateXML.js';
import BackButton from '../BackButton.js';
import SingleFileUpload from '../SingleFileUpload.js';

const Soundtrack = ({ setEquipmentType }) => {
  const [equipmentForm, setEquipmentForm] = useState({
    type: 'soundtrack',
    files: {
      mainMenuMusic: { file: '', filePath: '' },
      soundtracks: [],
      winSounds: [],
      loseSounds: [],
    },
  });

  const [soundtracks, setSoundtracks] = useState(Array(9).fill(null));
  const [winSounds, setWinSounds] = useState(Array(2).fill(null));
  const [loseSounds, setLoseSounds] = useState(Array(2).fill(null));

  const handleUpload = (file, type, index) => {
    // const file = event.target.files[0];
    if (!file) return;
    const filePath = `${file.name}`;

    if (type === 'mainMenuMusic') {
      setEquipmentForm((prev) => ({
        ...prev,
        files: {
          ...prev.files,
          [type]: {
            file: file,
            filePath: filePath,
          },
        },
      }));
      return;
    }

    if (type === 'soundtracks') {
      const updated = [...soundtracks];
      updated[index] = file;
      setSoundtracks(updated);
    } else if (type === 'winSounds') {
      const updated = [...winSounds];
      updated[index] = file;
      setWinSounds(updated);
    } else if (type === 'loseSounds') {
      const updated = [...loseSounds];
      updated[index] = file;
      setLoseSounds(updated);
    }

    setEquipmentForm((prev) => ({
      ...prev,
      files: {
        ...prev.files,
        [type]: [
          ...prev.files[type], // Keep existing entries
          {
            file: file,
            filePath: filePath,
          },
        ],
      },
    }));
  };

  return (
    <div className="p-8 bg-gray-900">
      <BackButton setEquipmentType={setEquipmentType} text={'Game Settings'} />

      <h2 className="text-lg font-semibold mb-4 text-white">Edit Music</h2>
      <form className="space-y-4">
        <div className="mb-4 p-3 bg-green-800 text-white">
          Only .ogg files are accepted
        </div>

        <div className="columns-2">
          <div>
            <label className="block text-sm font-medium text-gray-300">
              Main Menu Music
            </label>
            <div className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all">
              {/* <div key={index} className="flex items-center gap-2"> */}
              <SingleFileUpload
                dirPath="data/sounds"
                onFileUpload={(file, filePath) =>
                  handleUpload(file, 'mainMenuMusic')
                }
                accept=".ogg"
              />
            </div>
          </div>

          <div style={{ paddingTop: '10px' }}>
            <label className="block text-sm font-medium text-gray-300">
              Game Music
            </label>
            {soundtracks.map((sound, index) => (
              <div className="w-full mb-2 bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all">
                {/* <div key={index} className="flex items-center gap-2"> */}
                {/* <input
                  type="file"
                  accept=".ogg"
                  onChange={(e) => handleUpload(e, 'soundtracks', index)}
                  className="w-full p-2"
                /> */}
                <SingleFileUpload
                  dirPath="data/sounds"
                  onFileUpload={(file, filePath) =>
                    handleUpload(file, 'soundtracks', index)
                  }
                  accept=".ogg"
                />
                {/* {sound && <span>{sound.name}</span>} */}
              </div>
            ))}
          </div>

          <div style={{ paddingTop: '10px' }}>
            <label className="block text-sm font-medium text-gray-300">
              Win Sounds
            </label>
            {winSounds.map((sound, index) => (
              <div className="w-full mb-2 bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all">
                {/* <div key={index} className="flex items-center gap-2"> */}
                {/* <input
                  type="file"
                  accept=".ogg"
                  onChange={(e) => handleUpload(e, 'winSounds', index)}
                  className="w-full p-2"
                />
                {sound && <span>{sound.name}</span>} */}
                <SingleFileUpload
                  dirPath="data/sounds"
                  onFileUpload={(file, filePath) =>
                    handleUpload(file, 'winSounds', index)
                  }
                  accept=".ogg"
                />
              </div>
            ))}
          </div>

          <div style={{ paddingTop: '10px' }}>
            <label className="block text-sm font-medium text-gray-300">
              Lose Sounds
            </label>
            {loseSounds.map((sound, index) => (
              <div className="w-full mb-2 bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all">
                {/* <div key={index} className="flex items-center gap-2"> */}
                {/* <input
                  type="file"
                  accept=".ogg"
                  onChange={(e) => handleUpload(e, 'loseSounds', index)}
                  className="w-full p-2"
                />
                {sound && <span>{sound.name}</span>} */}
                <SingleFileUpload
                  dirPath="data/sounds"
                  onFileUpload={(file, filePath) =>
                    handleUpload(file, 'loseSounds', index)
                  }
                  accept=".ogg"
                />
              </div>
            ))}
          </div>
        </div>

        {/* XML Preview */}
        <GenerateXML equipmentForm={equipmentForm} />
      </form>
    </div>
  );
};

export default Soundtrack;
