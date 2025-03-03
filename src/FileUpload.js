const FileUpload = ({ equipmentForm, setEquipmentForm }) => {
  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file && file.name.endsWith('.dds')) {
      setEquipmentForm({
        ...equipmentForm,
        ddsFile: file,
        img: 'data/models/weapons/attachments/' + file.name,
      });
    } else {
      alert('Please upload a valid .dds file.');
    }
  };

  return (
    <div className="text-gray-300">
      <label className="block text-sm font-medium mb-1">DDS File</label>
      <input
        type="file"
        accept=".dds"
        className="w-full p-2 border rounded"
        onChange={handleFileUpload}
      />
      {equipmentForm.ddsFile && (
        <p className="mt-2 text-sm text-green-600">
          Uploaded: {equipmentForm.ddsFile.name}
        </p>
      )}
    </div>
  );
};

export default FileUpload;
