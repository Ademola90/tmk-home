import type React from "react";
import { useState, useEffect } from "react";
import { FaMapMarkerAlt, FaChevronDown } from "react-icons/fa";
import {
  getLGAsByState,
  nigerianStates,
  type LocalGovernment,
  type State,
} from "../../data/nigerianLocations";

interface LocationSelectorProps {
  selectedState?: string;
  selectedLGA?: string;
  onStateChange: (state: string) => void;
  onLGAChange: (lga: string) => void;
  className?: string;
}

const LocationSelector: React.FC<LocationSelectorProps> = ({
  selectedState,
  selectedLGA,
  onStateChange,
  onLGAChange,
  className = "",
}) => {
  const [isStateOpen, setIsStateOpen] = useState(false);
  const [isLGAOpen, setIsLGAOpen] = useState(false);
  const [availableLGAs, setAvailableLGAs] = useState<LocalGovernment[]>([]);

  useEffect(() => {
    if (selectedState) {
      const lgas = getLGAsByState(selectedState);
      setAvailableLGAs(lgas);
      if (selectedLGA && !lgas.find((lga) => lga.name === selectedLGA)) {
        onLGAChange("");
      }
    } else {
      setAvailableLGAs([]);
      onLGAChange("");
    }
  }, [selectedState, selectedLGA, onLGAChange]);

  const handleStateSelect = (state: State) => {
    onStateChange(state.name);
    setIsStateOpen(false);
  };

  const handleLGASelect = (lga: LocalGovernment) => {
    onLGAChange(lga.name);
    setIsLGAOpen(false);
  };

  return (
    <div className={`flex gap-4 ${className}`}>
      {/* State Selector */}
      <div className="relative flex-1">
        <button
          onClick={() => setIsStateOpen(!isStateOpen)}
          className="w-full flex items-center justify-between px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white hover:bg-gray-700 transition-colors"
        >
          <div className="flex items-center gap-2">
            <FaMapMarkerAlt className="text-green-500" />
            <span>{selectedState || "Select State"}</span>
          </div>
          <FaChevronDown
            className={`transition-transform ${
              isStateOpen ? "rotate-180" : ""
            }`}
          />
        </button>

        {isStateOpen && (
          <div className="absolute top-full left-0 right-0 mt-1 bg-gray-800 border border-gray-700 rounded-lg shadow-lg z-50 max-h-60 overflow-y-auto">
            {nigerianStates.map((state) => (
              <button
                key={state.code}
                onClick={() => handleStateSelect(state)}
                className="w-full text-left px-4 py-2 text-white hover:bg-gray-700 transition-colors"
              >
                {state.name}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* LGA Selector */}
      <div className="relative flex-1">
        <button
          onClick={() => setIsLGAOpen(!isLGAOpen)}
          disabled={!selectedState || availableLGAs.length === 0}
          className="w-full flex items-center justify-between px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white hover:bg-gray-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <span>{selectedLGA || "Select LGA"}</span>
          <FaChevronDown
            className={`transition-transform ${isLGAOpen ? "rotate-180" : ""}`}
          />
        </button>

        {isLGAOpen && availableLGAs.length > 0 && (
          <div className="absolute top-full left-0 right-0 mt-1 bg-gray-800 border border-gray-700 rounded-lg shadow-lg z-50 max-h-60 overflow-y-auto">
            {availableLGAs.map((lga) => (
              <button
                key={lga.code}
                onClick={() => handleLGASelect(lga)}
                className="w-full text-left px-4 py-2 text-white hover:bg-gray-700 transition-colors"
              >
                {lga.name}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default LocationSelector;
