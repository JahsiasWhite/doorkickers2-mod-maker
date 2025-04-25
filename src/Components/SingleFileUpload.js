const SingleFileUpload = ({
  dirPath = 'data/',
  onFileUpload,
  accept = '.dds,.jpg,.png',
}) => {
  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (
      file
      // (file.name.endsWith('.dds') ||
      //   file.name.endsWith('.jpg') ||
      //   file.name.endsWith('.png'))
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
      accept={accept}
      // className="w-full p-2"
      className="block p-2 w-full text-sm text-gray-500 file:mr-4 file:rounded-md file:border-0 file:bg-indigo-50 file:py-2 file:px-4 file:text-sm file:font-semibold hover:file:bg-indigo-100"
      onChange={handleFileUpload}
    />
  );
};

export default SingleFileUpload;
