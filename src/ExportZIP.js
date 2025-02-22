import JSZip from 'jszip';

const ExportZip = ({ equipmentForm, generateXML }) => {
  const handleExportZip = async () => {
    const zip = new JSZip();

    // Add XML file
    zip.file(`equipment/scope_${equipmentForm.name}.xml`, generateXML());

    // Add DDS file if uploaded
    if (equipmentForm.ddsFile) {
      const ddsBlob = await equipmentForm.ddsFile.arrayBuffer();
      zip.file(
        `models/weapons/attachments/${equipmentForm.ddsFile.name}`,
        ddsBlob
      );
    }

    // Generate ZIP and trigger download
    zip.generateAsync({ type: 'blob' }).then((content) => {
      const url = URL.createObjectURL(content);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${equipmentForm.name}_mod.zip`;
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
      Download ZIP
    </button>
  );
};

export default ExportZip;
