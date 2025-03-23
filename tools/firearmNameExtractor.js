const fs = require('fs');
const path = require('path');

function parseNames(type, xmlString) {
  const names = [];
  const regex = new RegExp(`<${type}\\s+name="([^"]+)"`, 'g');
  let match;

  while ((match = regex.exec(xmlString)) !== null) {
    names.push(match[1]);
  }

  return names;
}

// Directory containing firearm XML files
const dirPath = 'D:\\Steam\\steamapps\\common\\DoorKickers2\\data\\equipment';
const type = 'Firearm';

// List of firearm files to include (without .xml extension)
// const whitelist = [
//   'firearms_cia',
//   'firearms_enemy',
//   'firearms_enemy_release',
//   'firearms_nwswat',
//   'firearms_pistols',
//   'firearms_pistols_cia',
//   'firearms_pistols_nws',
//   'firearms_rifles',
//   'firearms_specialenemyweaps',
// ];
// Get only the whitelisted files
// const files = fs
//   .readdirSync(dirPath)
//   .filter((file) => whitelist.includes(file.replace('.xml', '')));

// firearms_ are the weapons, firearm_ is other stuff
const files = fs
  .readdirSync(dirPath)
  .filter((file) => file.startsWith('firearms_') && file.endsWith('.xml'));

let allNames = [];

files.forEach((file) => {
  const filePath = path.join(dirPath, file);
  const xmlData = fs.readFileSync(filePath, 'utf8');
  const names = parseNames(type, xmlData);
  allNames.push(...names);
});

const arrayString = `const ${type} = ['${allNames.join("' , '")}'];`;

console.log(arrayString);
fs.writeFileSync(`${type}_names.txt`, arrayString, 'utf8');
