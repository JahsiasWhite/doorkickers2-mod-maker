import SingleFileUpload from './SingleFileUpload';

const FileUpload = ({ equipmentForm, setEquipmentForm }) => {
  const handleFileUpload = (file, fileVar) => {
    // const file = e.target.files[0];
    if (file) {
      setEquipmentForm({
        ...equipmentForm,
        [fileVar]: file,
      });
    } else {
      alert('Please upload a valid file.');
    }
  };

  return (
    <div className="text-gray-300">
      <label className="block text-sm font-medium mb-1">Image Icon</label>
      <div className="border rounded p-2">
        <SingleFileUpload
          onFileUpload={(file, filePath) => handleFileUpload(file, 'ddsFile')}
          accept=".dds"
        />

        <SingleFileUpload
          onFileUpload={(file, filePath) =>
            handleFileUpload(file, 'ddsFileSmall')
          }
          accept=".dds"
        />
        <p className="ml-2 mt-2 text-sm text-red-600">
          {`The second file must have the matching name of the first file but appended with
          "_small". EX: lpvo_6x_ui.dds -> lpvo_6x_ui_small.dds`}
        </p>
      </div>
    </div>
  );
};

export default FileUpload;
