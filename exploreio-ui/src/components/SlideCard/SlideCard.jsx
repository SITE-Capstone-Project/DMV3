import "./SlideCard.css";
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Carousel from 'react-bootstrap/Carousel';
import Images from './Images';

function SlideCard() {
    const [index, setIndex] = useState(0);
    const itemsPerSlide = 5;

    const cities = [
        { name: 'Los Angeles', imageUrl: 'https://lp-cms-production.imgix.net/2021-06/shutterstockRF_186048416.jpg?auto=compress&fit=crop&format=auto&q=50&w=1200&h=800' },
        { name: 'New York City', imageUrl: 'https://media.cntraveler.com/photos/5a8f3b070e2cf839e9dbfa1d/2:1/w_2560%2Cc_limit/NYC_GettyImages-640006562.jpg' },
        { name: 'Chicago', imageUrl: 'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/26/df/65/c1/caption.jpg?w=1200&h=-1&s=1' },
        { name: 'Washington D.C.', imageUrl: 'https://images.musement.com/cover/0001/43/washington_header-42349.jpeg?w=1200&h=630&q=95&fit=crop' },
        { name: 'Seattle', imageUrl: 'https://images.pexels.com/photos/15091884/pexels-photo-15091884/free-photo-of-space-needle-against-clouded-sky-over-seattle.jpeg?auto=compress&cs=tinysrgb&w=800' },
        { name: 'Bogotá', imageUrl: 'https://images.pexels.com/photos/9824368/pexels-photo-9824368.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2' },
        { name: 'Cancun', imageUrl: 'https://images.pexels.com/photos/17061347/pexels-photo-17061347/free-photo-of-aerial-view-of-resorts-on-the-coast-in-cancun-mexico.jpeg?auto=compress&cs=tinysrgb&w=800' },
        { name: 'Paris', imageUrl: 'https://www.aparisguide.com/paris-top.jpg' },
        { name: 'Toronto', imageUrl: 'https://images.adsttc.com/media/images/63e4/ae99/6e85/1900/0140/82fc/large_jpg/229_Richmond_Toronto_competition2small.jpg?1675931296' },
        { name: 'Rome', imageUrl: 'https://www.thediaryofanomad.com/wp-content/uploads/2020/11/rome-for-3-days-in-rome-itinerary-vatican-dome-view.jpg' },
    ];

    const handleSelect = (selectedIndex) => setIndex(selectedIndex);
    const totalSlides = (cities.length + itemsPerSlide - 1) / itemsPerSlide;

    return (
        <div className="sliding">
            <h1>Trending</h1>
            <Carousel activeIndex={index} onSelect={handleSelect} interval={null}>
                {Array.from({ length: totalSlides }, (_, slideIndex) => (
                    <Carousel.Item key={slideIndex}>
                        <div className="carousel-row">
                            {cities
                                .slice(slideIndex * itemsPerSlide, (slideIndex + 1) * itemsPerSlide)
                                .map((city, cityIndex) => (
                                    <div key={city.name} className="image-container">
                                        <Link to={`/destinations/${slideIndex * itemsPerSlide + cityIndex + 1}`}>
                                            <Images
                                                text={city.name}
                                                imageUrl={city.imageUrl}
                                            />
                                        </Link>
                                        <div className="image-text">{city.name}</div>
                                    </div>
                                ))}
                        </div>
                    </Carousel.Item>
                ))}
            </Carousel>
        </div>
    );
}

export default SlideCard;
