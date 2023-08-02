import "./SlideCard.css"
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Carousel from 'react-bootstrap/Carousel';
import Images from './Images';

function SlideCard2() {
    const [index, setIndex] = useState(0);
    const itemsPerSlide = 5;

    const cities = [
        { name: 'Boston', imageUrl: 'https://www.travelandleisure.com/thmb/_aMbik8KZYsUKc_6_XNeAOzPi84=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/boston-massachusetts-BOSTONTG0221-719aef2eeb1c4929b6c839715e34a69e.jpg' },
        { name: 'London', imageUrl: 'https://images.pexels.com/photos/672532/pexels-photo-672532.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2' },
        { name: 'Berlin', imageUrl: 'https://www.travelandleisure.com/thmb/Etq4zWgOW-z9H7ZScs5_6WDcDvQ=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/berlin-germany-aerial-lead-BERLINTG0921-475e3a333c7f4fdea7743c6fc2f261af.jpg' },
        { name: 'Athens', imageUrl: 'https://images.pexels.com/photos/951537/pexels-photo-951537.jpeg?auto=compress&cs=tinysrgb&w=800' },
        { name: 'Helsinki', imageUrl: 'https://a.cdn-hotels.com/gdcs/production0/d1589/6d9eed40-c31d-11e8-9739-0242ac110006.jpg' },
        { name: 'Cairo', imageUrl: 'https://images.pexels.com/photos/5609738/pexels-photo-5609738.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2' },
        { name: 'Seoul', imageUrl: 'https://content.r9cdn.net/rimg/dimg/30/0c/6318617a-city-35982-163ff913019.jpg?width=1366&height=768&xhint=2421&yhint=1876&crop=true' },
        { name: 'Dubai', imageUrl: 'https://lp-cms-production.imgix.net/features/2017/09/dubai-marina-skyline-2c8f1708f2a1.jpg?auto=format&w=1440&h=810&fit=crop&q=75' },
        { name: 'Zanzibar City', imageUrl: 'https://media.tacdn.com/media/attractions-splice-spp-674x446/06/70/80/ba.jpg' },
        { name: 'Lima', imageUrl: 'https://lp-cms-production.imgix.net/2022-04/shutterstock_1047718252.jpg' },
    ];

    const handleSelect = (selectedIndex) => setIndex(selectedIndex);
    const totalSlides = (cities.length + itemsPerSlide - 1) / itemsPerSlide;

    return (
        <div className="sliding">
            <h1>Top Picks</h1>
            <Carousel activeIndex={index} onSelect={handleSelect} interval={null}>
                {Array.from({ length: totalSlides }, (_, slideIndex) => (
                    <Carousel.Item key={slideIndex}>
                        <div className="carousel-row">
                            {cities
                                .slice(slideIndex * itemsPerSlide, (slideIndex + 1) * itemsPerSlide)
                                .map((city, cityIndex) => (
                                    <div key={city.name} className="image-container">
                                        <Link to={`/destinations/${slideIndex * itemsPerSlide + cityIndex + 11}`}>
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

export default SlideCard2;
