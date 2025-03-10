const fs = require('fs');

function parseNames(type, xmlString) {
  const names = [];
  const regex = new RegExp(`<${type}\\s+name="([^"]+)"`, 'g');
  let match;

  while ((match = regex.exec(xmlString)) !== null) {
    names.push(match[1]);
  }

  return names;
}

const type = 'Scope';
const xmlData = fs.readFileSync(
  'D:\\Steam\\steamapps\\common\\DoorKickers2\\data\\equipment\\firearm_scopes.xml',
  'utf8'
);

const names = parseNames(type, xmlData);
const arrayString = `const ${type} = ['${names.join("' , '")}'];`;
console.log(arrayString);
fs.writeFileSync(`${type}_names.txt`, arrayString, 'utf8');
