import "./SlideCard.css"
// components/SlideCard.jsx
import React, { useState } from 'react';
import Carousel from 'react-bootstrap/Carousel';
import Images from '../Images'; 

function SlideCard() {
    const [index, setIndex] = useState(0);
    const itemsPerSlide = 5;

    const handleSelect = (selectedIndex) => setIndex(selectedIndex);

    const cities = [
        { name: 'Los Angeles', imageUrl: 'https://lp-cms-production.imgix.net/2021-06/shutterstockRF_186048416.jpg?auto=compress&fit=crop&format=auto&q=50&w=1200&h=800' },
        { name: 'New York City', imageUrl: 'https://media.cntraveler.com/photos/5a8f3b070e2cf839e9dbfa1d/2:1/w_2560%2Cc_limit/NYC_GettyImages-640006562.jpg' },
        { name: 'Chicago', imageUrl: 'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/26/df/65/c1/caption.jpg?w=1200&h=-1&s=1' },
        { name: 'Washington D.C.', imageUrl: 'https://images.musement.com/cover/0001/43/washington_header-42349.jpeg?w=1200&h=630&q=95&fit=crop' },
        { name: 'Miami', imageUrl: 'https://i.natgeofe.com/n/5de6e34a-d550-4358-b7ef-4d79a09c680e/aerial-beach-miami-florida_16x9.jpg' },
        { name: 'Paris', imageUrl: 'https://www.aparisguide.com/paris-top.jpg' },
        { name: 'Toronto', imageUrl: 'https://media.radissonhotelsamericas.com/image/destination-pagesus/localattraction/20828-139885-f72599578_3xl.jpg?impolicy=HomeHero&gravity=South' },
        { name: 'Rome', imageUrl: 'https://www.thediaryofanomad.com/wp-content/uploads/2020/11/rome-for-3-days-in-rome-itinerary-vatican-dome-view.jpg' },
        { name: 'Berlin', imageUrl: 'https://img.traveltriangle.com/blog/wp-content/uploads/2018/08/FotoJet93487jhfds.jpg' },
        { name: 'London', imageUrl: 'https://www.thestar.com/content/dam/thestar/life/travel/2022/07/08/an-insiders-guide-to-london-england-where-to-find-inspiring-art-cool-shops-and-classic-sunday-roast/london_england_credit_tomas_marek_istock.jpg' },
    ];

    const totalSlides = (cities.length + itemsPerSlide - 1) / itemsPerSlide;

    return (
        <Carousel activeIndex={index} onSelect={handleSelect} interval={null}>
            {Array.from({ length: totalSlides }, (_, slideIndex) => (
                <Carousel.Item key={slideIndex}>
                    <h1>Trending</h1>
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
                    <Carousel.Caption>
                        <h3>Row {slideIndex + 1}</h3>
                        <p>Multiple images in a row</p>
                    </Carousel.Caption>
                </Carousel.Item>
            ))}
        </Carousel>
    );
}

export default SlideCard;