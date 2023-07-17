import "./SlideCard.css";
import React, { useState, useEffect } from 'react';

const SlideCard = () => {
    const images = [
        'https://www.traveloffpath.com/wp-content/uploads/2021/10/Encouraging-Travel-And-Hotel-Occupancy-Figures-Project-A-Busy-Winter-Of-Travel.jpg',
        'https://grandcircle.scene7.com/is/image/GrandCircle/T4947/4x3/600',
        'https://images.squarespace-cdn.com/content/v1/53b839afe4b07ea978436183/0b5ca971-1eca-484f-9a84-071b23ba5126/small-towns-in-france.jpg',
        'https://www.traveloffpath.com/wp-content/uploads/2021/10/Encouraging-Travel-And-Hotel-Occupancy-Figures-Project-A-Busy-Winter-Of-Travel.jpg',
        'https://grandcircle.scene7.com/is/image/GrandCircle/T4947/4x3/600',
        'https://images.squarespace-cdn.com/content/v1/53b839afe4b07ea978436183/0b5ca971-1eca-484f-9a84-071b23ba5126/small-towns-in-france.jpg',
    ];

    const [slideIndex, setSlideIndex] = useState(0);
    const slideWidth = 50; // Set to 100 to move one image at a time

    const showSlide = (index) => {
        setSlideIndex(index);
    };

    const nextSlide = () => {
        setSlideIndex((slideIndex + 1) % images.length);
    };

    const prevSlide = () => {
        setSlideIndex((slideIndex - 1 + images.length) % images.length);
    };

    useEffect(() => {
        const interval = setInterval(nextSlide, 5000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="slide-card-container">
          <div className="carousel-container">
            <div className="slides" style={{ transform: `translateX(-${slideIndex * slideWidth}%)` }}>
              {images.map((image, index) => (
                <img key={index} src={image} alt={`Image ${index + 1}`} />
              ))}
            </div>
          </div>
          <button className="prev-btn" onClick={prevSlide} disabled={slideIndex === 0}>Previous</button>
          <button className="next-btn" onClick={nextSlide} disabled={slideIndex === images.length - 1}>Next</button>
        </div>
      );
    };

export default SlideCard;
