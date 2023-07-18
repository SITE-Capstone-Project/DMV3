import "./SlideCard.css"
import React, { useState } from 'react';
import Carousel from 'react-bootstrap/Carousel';
import Images from '../Images';

function SlideCard() {
    const [index, setIndex] = useState(0);
    const itemsPerSlide = 5;

    const cities = [
        { name: 'Los Angeles', imageUrl: 'https://lp-cms-production.imgix.net/2021-06/shutterstockRF_186048416.jpg?auto=compress&fit=crop&format=auto&q=50&w=1200&h=800' },
        { name: 'New York City', imageUrl: 'https://media.cntraveler.com/photos/5a8f3b070e2cf839e9dbfa1d/2:1/w_2560%2Cc_limit/NYC_GettyImages-640006562.jpg' },
        { name: 'Chicago', imageUrl: 'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/26/df/65/c1/caption.jpg?w=1200&h=-1&s=1' },
        { name: 'Washington D.C.', imageUrl: 'https://images.musement.com/cover/0001/43/washington_header-42349.jpeg?w=1200&h=630&q=95&fit=crop' },
        { name: 'Miami', imageUrl: 'https://i.natgeofe.com/n/5de6e34a-d550-4358-b7ef-4d79a09c680e/aerial-beach-miami-florida_16x9.jpg' },
        { name: 'Houston', imageUrl: 'https://www.travelandleisure.com/thmb/ZD2GzTtBeCzcsqk6RcrnmAZZNGA=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/houston-texas_HOUSTON1222-1aa2b78360be48e5ab3ee4a6fe3459b8.jpg' },
        { name: 'Mexico City', imageUrl: 'https://i.natgeofe.com/n/73d9e4e3-4884-4e93-ac41-6be6a90079f5/mexico-city-travel%20(1).jpg?w=2880&h=1920' },
        { name: 'Paris', imageUrl: 'https://www.aparisguide.com/paris-top.jpg' },
        { name: 'Toronto', imageUrl: 'https://media.radissonhotelsamericas.com/image/destination-pagesus/localattraction/20828-139885-f72599578_3xl.jpg?impolicy=HomeHero&gravity=South' },
        { name: 'Rome', imageUrl: 'https://www.thediaryofanomad.com/wp-content/uploads/2020/11/rome-for-3-days-in-rome-itinerary-vatican-dome-view.jpg' },
    ];

    const handleSelect = (selectedIndex) => setIndex(selectedIndex);
    const totalSlides = (cities.length + itemsPerSlide - 1) / itemsPerSlide;

    return (
        <div className = "sliding">
            <h1>Trending</h1>
        <Carousel activeIndex={index} onSelect={handleSelect} interval={null}>
            {Array.from({ length: totalSlides }, (_, slideIndex) => (
                <Carousel.Item key={slideIndex}>
                    <div className="carousel-row">
                        {cities
                            .slice(
                                slideIndex * itemsPerSlide,
                                (slideIndex + 1) * itemsPerSlide
                            )
                            .map((city) => (
                                <Images
                                    key={city.name}
                                    text={city.name}
                                    imageUrl={city.imageUrl}
                                />
                            ))}
                    </div>
                    {/* <Carousel.Caption>
                        <h3>Row {slideIndex + 1}</h3>
                        <p>Multiple images in a row</p>
                    </Carousel.Caption> */}
                </Carousel.Item>
            ))}
        </Carousel>
        </div>
    );
}

export default SlideCard;