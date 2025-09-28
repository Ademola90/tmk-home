import type React from "react";
import { useState } from "react";
import {
  FaPlay,
  FaPause,
  FaExpand,
  FaCompress,
  FaVolumeUp,
  FaVolumeMute,
} from "react-icons/fa";

interface VirtualTourProps {
  propertyId: string;
  tourUrl?: string;
  images: string[];
  className?: string;
}

const VirtualTour: React.FC<VirtualTourProps> = ({
  //   propertyId,
  //   tourUrl,
  images,
  className = "",
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const handleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
  };

  const handleMute = () => {
    setIsMuted(!isMuted);
  };

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <div
      className={`relative bg-gray-900 rounded-lg overflow-hidden ${className}`}
    >
      {/* Virtual Tour Container */}
      <div
        className={`relative ${
          isFullscreen ? "fixed inset-0 z-50" : "aspect-video"
        }`}
      >
        {/* Tour Content */}
        <div className="relative w-full h-full">
          <img
            src={images[currentImageIndex] || "/placeholder.svg"}
            alt={`Virtual tour view ${currentImageIndex + 1}`}
            className="w-full h-full object-cover"
          />

          {/* Tour Overlay */}
          <div className="absolute inset-0 bg-black bg-opacity-20">
            {/* Navigation Dots */}
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
              {images.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentImageIndex(index)}
                  className={`w-3 h-3 rounded-full transition-colors ${
                    index === currentImageIndex
                      ? "bg-white"
                      : "bg-white bg-opacity-50"
                  }`}
                />
              ))}
            </div>

            {/* Navigation Arrows */}
            <button
              onClick={prevImage}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-70 transition-all"
            >
              ←
            </button>
            <button
              onClick={nextImage}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-70 transition-all"
            >
              →
            </button>
          </div>
        </div>

        {/* Controls */}
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-4">
          <div className="flex items-center justify-between text-white">
            <div className="flex items-center space-x-4">
              <button
                onClick={handlePlayPause}
                className="flex items-center justify-center w-10 h-10 bg-green-600 hover:bg-green-700 rounded-full transition-colors"
              >
                {isPlaying ? (
                  <FaPause className="w-4 h-4" />
                ) : (
                  <FaPlay className="w-4 h-4 ml-1" />
                )}
              </button>

              <button
                onClick={handleMute}
                className="flex items-center justify-center w-8 h-8 hover:bg-white hover:bg-opacity-20 rounded-full transition-colors"
              >
                {isMuted ? (
                  <FaVolumeMute className="w-4 h-4" />
                ) : (
                  <FaVolumeUp className="w-4 h-4" />
                )}
              </button>

              <span className="text-sm">
                {currentImageIndex + 1} / {images.length}
              </span>
            </div>

            <div className="flex items-center space-x-2">
              <span className="text-sm">Virtual Tour</span>
              <button
                onClick={handleFullscreen}
                className="flex items-center justify-center w-8 h-8 hover:bg-white hover:bg-opacity-20 rounded-full transition-colors"
              >
                {isFullscreen ? (
                  <FaCompress className="w-4 h-4" />
                ) : (
                  <FaExpand className="w-4 h-4" />
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Tour Info */}
      {!isFullscreen && (
        <div className="p-4 bg-gray-800 text-white">
          <h3 className="font-semibold mb-2">360° Virtual Tour</h3>
          <p className="text-sm text-gray-300">
            Explore this property from the comfort of your home with our
            immersive virtual tour experience.
          </p>
        </div>
      )}
    </div>
  );
};

export default VirtualTour;
