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
      <div className="border rounded">
        <input
          type="file"
          accept=".dds"
          className="w-full p-2"
          onChange={handleFileUpload}
        />
        {/* {equipmentForm.ddsFile && (
          <p className="mt-2 text-sm text-green-600">
            Uploaded: {equipmentForm.ddsFile.name}
          </p>
        )} */}

        <input
          type="file"
          accept=".dds"
          className="w-full p-2"
          onChange={handleFileUpload}
        />
        <p className="ml-2 text-sm text-red-600">
          {`The second file must have the matching name of the first file but appended with
          "_small". EX: lpvo_6x_ui.dds -> lpvo_6x_ui_small.dds`}
        </p>
      </div>
    </div>
  );
};

export default FileUpload;
