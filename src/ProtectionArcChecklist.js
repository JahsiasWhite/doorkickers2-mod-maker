import React, { useEffect } from 'react';

const ProtectionArcComponent = ({ equipmentForm, setEquipmentForm }) => {
  const typeStr = 'protectionArc';
  const arcTypes = [
    { type: 'Front', degrees: 90 },
    { type: 'Back', degrees: 270 },
    { type: 'Side', degrees: 360 },
  ];

  // Initialize with default values on component mount
  useEffect(() => {
    // Check if we need to initialize
    const currentArcs = Array.isArray(equipmentForm[typeStr])
      ? equipmentForm[typeStr]
      : [];

    // If no arcs exist yet, initialize them
    if (currentArcs.length === 0) {
      const initialArcs = arcTypes.map((arc) => ({
        type: arc.type,
        degrees: arc.degrees,
        coveragePercent: 0,
        piercingProtectionLevel: 0,
      }));

      setEquipmentForm((prev) => ({
        ...prev,
        [typeStr]: initialArcs,
      }));
    }
  }, []);

  const handleValueChange = (arcType, field, value) => {
    setEquipmentForm((prev) => {
      const currentArcs = Array.isArray(prev[typeStr])
        ? [...prev[typeStr]]
        : [];

      // Find the arc index if it exists
      const arcIndex = currentArcs.findIndex((arc) => arc.type === arcType);

      if (arcIndex >= 0) {
        // Update existing arc
        const updatedArcs = [...currentArcs];
        updatedArcs[arcIndex] = {
          ...updatedArcs[arcIndex],
          [field]: value,
        };
        return {
          ...prev,
          [typeStr]: updatedArcs,
        };
      } else {
        // Create new arc entry
        const degrees =
          arcTypes.find((arc) => arc.type === arcType)?.degrees || 0;
        return {
          ...prev,
          [typeStr]: [
            ...currentArcs,
            {
              type: arcType,
              degrees,
              coveragePercent: field === 'coveragePercent' ? value : '',
              piercingProtectionLevel:
                field === 'piercingProtectionLevel' ? value : '',
            },
          ],
        };
      }
    });
  };

  // Get current value for a specific arc and field
  const getArcValue = (arcType, field) => {
    const currentArcs = Array.isArray(equipmentForm[typeStr])
      ? equipmentForm[typeStr]
      : [];
    const arc = currentArcs.find((arc) => arc.type === arcType);
    return arc ? arc[field] : '';
  };

  return (
    <div>
      <label className="block text-sm font-medium text-gray-300 mb-2">
        Protection Arc
      </label>
      {arcTypes.map(({ type, degrees }) => (
        <div key={type} className="mb-4">
          <div className="w-full p-3 border border-gray-600 rounded-lg bg-gray-700">
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Protection Arc {type}
            </label>
            <div className="grid grid-cols-3 gap-4">
              <div>
                <label className="block text-xs text-gray-400 mb-1">
                  Degrees
                </label>
                <input
                  type="number"
                  value={degrees}
                  readOnly
                  className="w-full p-2 border border-gray-600 rounded text-sm bg-gray-800 text-gray-100"
                />
              </div>

              <div>
                <label className="block text-xs text-gray-400 mb-1">
                  Coverage %
                </label>
                <input
                  type="number"
                  value={getArcValue(type, 'coveragePercent')}
                  onChange={(e) =>
                    handleValueChange(type, 'coveragePercent', e.target.value)
                  }
                  className="w-full p-2 border border-gray-600 rounded text-sm bg-gray-800 text-gray-100"
                  placeholder="0-100"
                />
              </div>

              <div>
                <label className="block text-xs text-gray-400 mb-1">
                  Protection Level
                </label>
                <input
                  type="number"
                  value={getArcValue(type, 'piercingProtectionLevel')}
                  onChange={(e) =>
                    handleValueChange(
                      type,
                      'piercingProtectionLevel',
                      e.target.value
                    )
                  }
                  className="w-full p-2 border border-gray-600 rounded text-sm bg-gray-800 text-gray-100"
                  placeholder="0-100"
                />
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProtectionArcComponent;
