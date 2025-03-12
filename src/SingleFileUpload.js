const SingleFileUpload = ({ dirPath = 'data/', onFileUpload }) => {
  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file && (file.name.endsWith('.dds') || file.name.endsWith('.jpg'))) {
      const filePath = `${file.name}`;
      onFileUpload(file, filePath);
    } else {
      alert('Please upload a valid .dds file.');
    }
  };

  return (
    <input
      type="file"
      accept=".dds,.jpg"
      className="w-full p-2"
      onChange={handleFileUpload}
    />
  );
};

export default SingleFileUpload;
