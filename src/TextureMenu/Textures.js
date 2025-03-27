import React, { useState } from 'react';

import GenerateXML from '../GenerateXML.js';
import BackButton from '../BackButton.js';
import SingleFileUpload from '../SingleFileUpload.js';
import Slider from '../Slider.js';
import SingleChecklist from '../SingleChecklist.js';

const Textures = ({ setSelectedOption, setEquipmentType }) => {
  const [equipmentForm, setEquipmentForm] = useState({
    type: 'textures',

    // Background Image
    parallaxSpeedX: 0.0,
    parallaxSpeedY: 0.0,
    mouseScaleX: 0.0,
    mouseScaleY: 0.0,
    bgImages: [
      {
        xLoc: 0,
        yLoc: 0,
        xSpeed: 0.0,
        ySpeed: 0.0,
        bgFile: '',
        bgPath: '',
        anim: false,
        animSpeed: -0.01,
        animX: 1,
        animY: 0,
      },
    ],
  });

  const handleFileUpload = (file, filePath) => {
    setEquipmentForm((prev) => ({
      ...prev,
      bgImages: [
        ...prev.bgImages,
        {
          xLoc: 0,
          yLoc: 0,
          xSpeed: 0.0,
          ySpeed: 0.0,
          bgFile: file,
          bgPath: filePath,
          anim: false,
          animType: 'scroll',
          animSpeed: -0.01,
          animX: 1,
          animY: 0,
        }, // Default speeds for new file
      ],
    }));
  };

  const updateLayerSpeed = (index, axis, value) => {
    setEquipmentForm((prev) => {
      const updatedLayers = [...prev.bgImages];
      updatedLayers[index][axis] = parseFloat(value);
      return { ...prev, bgImages: updatedLayers };
    });
  };

  function addAnimation(index = 0) {
    setEquipmentForm((prev) => ({
      ...prev,
      bgImages: prev.bgImages.map((image, i) =>
        i === index + 1 ? { ...image, anim: !prev.bgImages[i].anim } : image
      ),
    }));
  }

  const renderUploadComponents = () => {
    return equipmentForm.bgImages.map((_, index) => (
      <div key={index} className="border rounded p-2 mb-4">
        <h2>Image {index + 1}</h2>
        {/* File upload for additional layers */}
        <SingleFileUpload
          dirPath="data/textures"
          onFileUpload={(file, filePath) => handleFileUpload(file, filePath)}
        />
        {/* Sliders for each uploaded file */}
        {equipmentForm.bgImages[index + 1] && (
          <>
            <Slider
              title={`Horizontal Location`}
              value={equipmentForm.bgImages[index + 1].xLoc || 0}
              onChange={(e) =>
                updateLayerSpeed(index + 1, 'xLoc', e.target.value)
              }
              min={-10}
              max={10}
              step={0.1}
            />
            <Slider
              title={`Vertical Location`}
              value={equipmentForm.bgImages[index + 1].yLoc || 0}
              onChange={(e) =>
                updateLayerSpeed(index + 1, 'yLoc', e.target.value)
              }
              min={-10}
              max={10}
              step={0.1}
            />
            <Slider
              title={`Horizontal Parallax Speed`}
              value={equipmentForm.bgImages[index + 1].xSpeed || 0}
              onChange={(e) =>
                updateLayerSpeed(index + 1, 'xSpeed', e.target.value)
              }
              min={-10}
              max={10}
              step={0.1}
            />
            <Slider
              title={`Vertical Parallax Speed`}
              value={equipmentForm.bgImages[index + 1].ySpeed || 0}
              onChange={(e) =>
                updateLayerSpeed(index + 1, 'ySpeed', e.target.value)
              }
              min={-10}
              max={10}
              step={0.1}
            />
            <div className="flex items-center space-x-2">
              <input
                onChange={() => addAnimation(index)}
                type="checkbox"
                checked={equipmentForm.bgImages[index + 1].anim}
                className="rounded cursor-pointer border-gray-500 bg-transparent"
              />
              <span>Add Animation</span>
            </div>
            {equipmentForm.bgImages[index + 1].anim && (
              <>
                {/* <SingleChecklist
                  dataArray={['scroll', 'rotate']}
                  type={equipmentForm.bgImages[index + 1].animType}
                  typeStr={'animType'}
                  setEquipmentForm={setEquipmentForm}
                  onToggle={(currentToggledList) =>
                    setEquipmentForm((prev) => ({
                      ...prev,
                      bgImages: prev.bgImages.map((image, i) =>
                        i === index + 1
                          ? { ...image, animType: currentToggledList }
                          : image
                      ),
                    }))
                  }
                /> */}
                <Slider
                  title={`Animation Speed`}
                  value={equipmentForm.bgImages[index + 1].animSpeed || -0.01}
                  onChange={(e) =>
                    updateLayerSpeed(index + 1, 'animSpeed', e.target.value)
                  }
                  min={-5}
                  max={5}
                  step={0.01}
                />
                <Slider
                  title={`Horizontal Animation Direction`}
                  value={equipmentForm.bgImages[index + 1].animX || 1}
                  onChange={(e) =>
                    updateLayerSpeed(index + 1, 'animX', e.target.value)
                  }
                  min={-10}
                  max={10}
                  step={0.1}
                />
                <Slider
                  title={`Vertical Animation Direction`}
                  value={equipmentForm.bgImages[index + 1].animY || 0}
                  onChange={(e) =>
                    updateLayerSpeed(index + 1, 'animY', e.target.value)
                  }
                  min={-10}
                  max={10}
                  step={0.1}
                />
              </>
            )}
          </>
        )}
      </div>
    ));
  };

  return (
    <div className="p-8 bg-gray-900">
      <BackButton setEquipmentType={setEquipmentType} text={'Main Menu'} />

      <h2 className="text-lg font-semibold mb-4 text-white">Edit Textures</h2>
      <form className="space-y-4">
        <div className="grid grid-cols-2">
          <div className="text-white border rounded p-2">
            <h3 className="font-semibold mb-4">Upload background image</h3>
            <Slider
              title="Horizontal Move Speed"
              value={equipmentForm.parallaxSpeedX}
              onChange={(e) =>
                setEquipmentForm({
                  ...equipmentForm,
                  parallaxSpeedX: parseFloat(e.target.value),
                })
              }
              min={-10}
              max={10}
              step={0.1}
            />
            <Slider
              title="Vertical Move Speed"
              value={equipmentForm.parallaxSpeedY}
              onChange={(e) =>
                setEquipmentForm({
                  ...equipmentForm,
                  parallaxSpeedY: parseFloat(e.target.value),
                })
              }
              min={-10}
              max={10}
              step={0.1}
            />
            <Slider
              title="Horizontal Mouse Movement"
              value={equipmentForm.mouseScaleX}
              onChange={(e) =>
                setEquipmentForm({
                  ...equipmentForm,
                  mouseScaleX: parseFloat(e.target.value),
                })
              }
              min={-10}
              max={10}
              step={0.1}
            />
            <Slider
              title="Vertical Mouse Movement"
              value={equipmentForm.mouseScaleY}
              onChange={(e) =>
                setEquipmentForm({
                  ...equipmentForm,
                  mouseScaleY: parseFloat(e.target.value),
                })
              }
              min={-10}
              max={10}
              step={0.1}
            />
            {renderUploadComponents()}
          </div>
        </div>

        {/* XML Preview */}
        <GenerateXML equipmentForm={equipmentForm} />
      </form>
    </div>
  );
};

export default Textures;
