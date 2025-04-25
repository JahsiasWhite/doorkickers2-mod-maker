const BackButton = ({ setEquipmentType, text }) => {
  return (
    <>
      <button
        onClick={() => setEquipmentType(null)}
        className="mb-8 text-blue-500 hover:text-blue-600"
      >
        {`← Back ${text ? 'to ' + text : ''}`}
      </button>
    </>
  );
};

export default BackButton;
