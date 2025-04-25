const Card = ({ icon, title, description, onClick }) => (
  <div
    onClick={onClick}
    className="bg-gray-800 rounded-xl p-8 hover:bg-gray-700 transition-all duration-300 transform hover:scale-[1.02] cursor-pointer border border-gray-700 hover:border-blue-500"
  >
    <div className="flex flex-col items-center justify-center h-64 space-y-6">
      <div className="w-20 h-20 rounded-full bg-gray-700 flex items-center justify-center">
        {icon && (
          <img src={icon} alt={title} className="w-12 h-12 object-contain" />
        )}
      </div>

      <div className="space-y-4 text-center">
        <h3 className="text-xl font-semibold text-white">{title}</h3>
        <p className="text-gray-400 max-w-sm">{description}</p>
      </div>
    </div>
  </div>
);

export default Card;
