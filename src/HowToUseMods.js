import React, { useState } from 'react';
import BackButton from './components/BackButton';

const HowToUseMods = ({ setSelectedOption }) => {
  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 p-8">
      <BackButton setEquipmentType={setSelectedOption} text={'Main Menu'} />

      {/* <h1 className="text-3xl font-bold text-white mb-8">How to Use</h1> */}

      <div className="text-xl space-y-6 max-w-3xl mx-auto">
        <div className="bg-gray-800 p-6 rounded-lg border border-gray-700">
          <h2 className="text-xl font-semibold text-white">Installing Mods</h2>
          <p className="text-gray-400 mt-2 text-balance">
            Once you have created your mod, you can install and play it!
            <br />
            1. Download the ZIP
            <br />
            2. Unzip it to your /DoorKickers2/mods_upload folder
            <br />
            3. Launch the game and enable your mod
          </p>
        </div>

        <div className="bg-gray-800 p-6 rounded-lg border border-gray-700">
          <h2 className="text-xl font-semibold text-white">
            Troubleshooting & Requesting Features
          </h2>
          <p className="text-gray-400 mt-2">
            This is still a WIP. If you have any questions, bugs, or feature
            requests, feel free to reach out via email
          </p>

          <div className="flex items-center">
            <a
              href="mailto:support@dk2modmaker.com"
              className="inline-block mt-4"
            >
              <img
                src="/mail.svg"
                alt="Email Icon"
                className="w-10 h-10 hover:opacity-80 transition-opacity"
              />
            </a>
            <p className="text-gray-400 mt-2 ml-2">support@dk2modmaker.com</p>
          </div>
        </div>

        {/* Fill is text-blue-400 */}
        {/* <div className="bg-gray-800 p-6 rounded-lg border border-gray-700">
          <h2 className="text-xl font-semibold text-white">About</h2>
          <p className="text-gray-400 mt-2">
            This is an open source tool that allows you to create and customize
            mods for Door Kickers 2. Please feel free to contribute:
            <a
              href="https://github.com/jahsiaswhite/doorkickers2-mod-maker"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-400 flex items-center mt-2"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                x="0px"
                y="0px"
                width="100"
                height="100"
                viewBox="0 0 30 30"
              >
                <path
                  fill="rgb(96 165 250 / var(--tw-text-opacity, 1))"
                  d="M15,3C8.373,3,3,8.373,3,15c0,5.623,3.872,10.328,9.092,11.63C12.036,26.468,12,26.28,12,26.047v-2.051 c-0.487,0-1.303,0-1.508,0c-0.821,0-1.551-0.353-1.905-1.009c-0.393-0.729-0.461-1.844-1.435-2.526 c-0.289-0.227-0.069-0.486,0.264-0.451c0.615,0.174,1.125,0.596,1.605,1.222c0.478,0.627,0.703,0.769,1.596,0.769 c0.433,0,1.081-0.025,1.691-0.121c0.328-0.833,0.895-1.6,1.588-1.962c-3.996-0.411-5.903-2.399-5.903-5.098 c0-1.162,0.495-2.286,1.336-3.233C9.053,10.647,8.706,8.73,9.435,8c1.798,0,2.885,1.166,3.146,1.481C13.477,9.174,14.461,9,15.495,9 c1.036,0,2.024,0.174,2.922,0.483C18.675,9.17,19.763,8,21.565,8c0.732,0.731,0.381,2.656,0.102,3.594 c0.836,0.945,1.328,2.066,1.328,3.226c0,2.697-1.904,4.684-5.894,5.097C18.199,20.49,19,22.1,19,23.313v2.734 c0,0.104-0.023,0.179-0.035,0.268C23.641,24.676,27,20.236,27,15C27,8.373,21.627,3,15,3z"
                ></path>
              </svg>
              View on GitHub
            </a>
          </p>
        </div> */}
      </div>
    </div>
  );
};

export default HowToUseMods;
