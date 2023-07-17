import "./SlideCard.css"
// components/SlideCard.jsx
import React, { useState } from 'react';
import Carousel from 'react-bootstrap/Carousel';
import Images from '../Images'; // Make sure this import path is correct

function SlideCard() {
  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex) => {
    setIndex(selectedIndex);
  };

  const cities = [
    { name: 'Los Angeles', imageUrl: 'https://lp-cms-production.imgix.net/2021-06/shutterstockRF_186048416.jpg?auto=compress&fit=crop&format=auto&q=50&w=1200&h=800' },
    { name: 'New York City', imageUrl: 'https://media.cntraveler.com/photos/5a8f3b070e2cf839e9dbfa1d/2:1/w_2560%2Cc_limit/NYC_GettyImages-640006562.jpg' },
    { name: 'Chicago', imageUrl: 'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/26/df/65/c1/caption.jpg?w=1200&h=-1&s=1' },
    { name: 'Washington D.C.', imageUrl: 'https://images.musement.com/cover/0001/43/washington_header-42349.jpeg?w=1200&h=630&q=95&fit=crop' },
    { name: 'Miami', imageUrl: 'https://i.natgeofe.com/n/5de6e34a-d550-4358-b7ef-4d79a09c680e/aerial-beach-miami-florida_16x9.jpg' },
  ];

  return (
    <Carousel activeIndex={index} onSelect={handleSelect} interval={null}>
      <Carousel.Item>
        <h1>Trending</h1>
        <div className="carousel-row">
          {cities.map((city) => (
            <Images key={city.name} text={city.name} imageUrl={city.imageUrl} />
          ))}
        </div>
        <Carousel.Caption>
          <h3>Row 1</h3>
          <p>Multiple images in a row</p>
        </Carousel.Caption>
      </Carousel.Item>
      {/* Add more Carousel.Item for additional rows */}
    </Carousel>
  );
}

export default SlideCard;
