import { useState, useEffect } from "react";

function Carousel({ images }) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [nextImageIndex, setNextImageIndex] = useState(1);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setNextImageIndex((nextImageIndex + 1) % images.length);
      setIsTransitioning(true);
      setTimeout(() => {
        setCurrentImageIndex(nextImageIndex);
        setIsTransitioning(false);
      }, 500);
    }, 10000);

    return () => clearInterval(intervalId);
  }, [currentImageIndex, images.length, nextImageIndex]);

  const goToPrevImage = () => {
    setNextImageIndex((currentImageIndex - 1 + images.length) % images.length);
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentImageIndex((currentImageIndex - 1 + images.length) % images.length);
      setIsTransitioning(false);
    }, 500);
  };

  const goToNextImage = () => {
    setNextImageIndex((currentImageIndex + 1) % images.length);
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentImageIndex((currentImageIndex + 1) % images.length);
      setIsTransitioning(false);
    }, 500);
  };

  return (
    <div className="relative max-h-50">
      epaaa
      <img
        src={images[currentImageIndex]}
        alt={`Image ${currentImageIndex}`}
        className={`object-cover w-full h-full transition-opacity duration-500 ${
          isTransitioning ? "opacity-0" : "opacity-100"
        }`}
      />

      <button
        className="absolute left-0 top-1/2 transform -translate-y-1/2 hover:bg-stone-100 px-3 py-2 h-full transition-colors duration-200"
        onClick={goToPrevImage}
      >
        {"<"}
      </button>

      <button
        className="absolute right-0 top-1/2 transform -translate-y-1/2 hover:bg-stone-100 px-3 py-2 h-full transition-colors duration-200"
        onClick={goToNextImage}
      >
        {">"}
      </button>
      
    </div>
  );
}

export default Carousel;
