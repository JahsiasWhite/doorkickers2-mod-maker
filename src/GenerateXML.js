import ExportZip from './ExportZIP.js';

const GenerateXML = ({ equipmentForm }) => {
  const generateXML = () => {
    return generateScopeXML();
  };

  function generateScopeXML() {
    console.error(equipmentForm);

    let xml = '<Equipment>\n';

    // xml += `  <Bind eqp="${equipmentForm.name}">\n`;
    // equipmentForm.bindTo.forEach((className) => {
    //   xml += `    <to name="${className}"/>\n`;
    // });
    // xml += '  </Bind>\n';
    xml += `  <Bind eqp="${equipmentForm.bindTo[0]}">\n`;
    xml += `    <to name="${equipmentForm.name}"/>\n`;
    xml += '  </Bind>\n';

    xml += `  <Scope name="${equipmentForm.name}" 
        inventoryBinding="${equipmentForm.inventoryBinding}"
        tooltip="${equipmentForm.tooltip}"
        description="${equipmentForm.description}"
        img="${equipmentForm.img}"`;
    // unlockCost="${equipmentForm.unlockCost}"`;

    if (equipmentForm.modifiableParams.length > 0) {
      xml += `\n\n    <ModifiableParams\n`;
      equipmentForm.modifiableParams.forEach((param) => {
        xml += `       ${param.label}="${param.value}"\n`;
      });
      xml += '    />';
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
