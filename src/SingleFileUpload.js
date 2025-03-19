const SingleFileUpload = ({ dirPath = 'data/', onFileUpload }) => {
  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (
      file &&
      (file.name.endsWith('.dds') ||
        file.name.endsWith('.jpg') ||
        file.name.endsWith('.png'))
    ) {
      const filePath = `${file.name}`;
      onFileUpload(file, filePath);
    } else {
      alert('Invalid file');
    }
  };

  return (
    <input
      type="file"
      accept=".dds,.jpg,.png"
      className="w-full p-2"
      onChange={handleFileUpload}
    />
  );
};

export default SingleFileUpload;
