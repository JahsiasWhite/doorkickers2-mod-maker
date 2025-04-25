const Slider = ({
  title,
  value,
  onChange,
  min = -1000,
  max = 1000,
  step = 0.1,
}) => {
  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-gray-300">
        {title}: <span className="font-bold text-gray-100">{value}</span>
      </label>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={onChange}
        className="w-full cursor-pointer"
      />
    </div>
  );
};

export default Slider;
