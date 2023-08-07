import "./SlideCard.css"
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Carousel from 'react-bootstrap/Carousel';
import Images from './Images';

function SlideCard3() {
    const [index, setIndex] = useState(0);
    const itemsPerSlide = 5;

    const cities = [
        { name: 'Singapore', imageUrl: 'https://images.pexels.com/photos/1682794/pexels-photo-1682794.jpeg?auto=compress&cs=tinysrgb&w=800' },
        { name: 'Madrid', imageUrl: 'https://media.cntraveler.com/photos/5b2d15c98b842c3b35c5d3c7/16:9/w_2560%2Cc_limit/Madrid-Beaches_GettyImages-731843465.jpg' },
        { name: 'Dublin', imageUrl: 'https://thumbs.dreamstime.com/b/dublin-ireland-27598568.jpg' },
        { name: 'Tokyo', imageUrl: 'https://a.cdn-hotels.com/gdcs/production172/d1381/8efd3f69-63bb-4398-a595-095cea25fc37.jpg' },
        { name: 'Johannesburg', imageUrl: 'https://media.timeout.com/images/105237782/image.jpg' },
        { name: 'Rio de Janeiro', imageUrl: 'https://i.natgeofe.com/n/560b293d-80b2-4449-ad6c-036a249d46f8/rio-de-janeiro-travel_3x4.jpg' },
        { name: 'Osaka', imageUrl: 'https://images.pexels.com/photos/4058519/pexels-photo-4058519.jpeg?auto=compress&cs=tinysrgb&w=800' },
        { name: 'Marrakech', imageUrl: 'https://www.groovymashedpotatoes.com/content/images/2023/01/5-Days-in-Morocco.jpg' },
        { name: 'Sydney', imageUrl: 'https://media.tatler.com/photos/6141d37b9ce9874a3e40107d/16:9/w_2560%2Cc_limit/social_crop_sydney_opera_house_gettyimages-869714270.jpg' },
        { name: 'Taipei', imageUrl: 'https://media.cnn.com/api/v1/images/stellar/prod/220815062659-05-taipei-performing-arts-center-oma.jpg?c=original' },
    ];

    const handleSelect = (selectedIndex) => setIndex(selectedIndex);
    const totalSlides = (cities.length + itemsPerSlide - 1) / itemsPerSlide;

    return (
        <div className="sliding">
            <h1>Random</h1>
            <Carousel activeIndex={index} onSelect={handleSelect} interval={null}>
                {Array.from({ length: totalSlides }, (_, slideIndex) => (
                    <Carousel.Item key={slideIndex}>
                        <div className="carousel-row">
                            {cities
                                .slice(slideIndex * itemsPerSlide, (slideIndex + 1) * itemsPerSlide)
                                .map((city, cityIndex) => (
                                    <div key={city.name} className="image-container">
                                        <Link to={`/destinations/${slideIndex * itemsPerSlide + cityIndex + 21}`}>
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

export default SlideCard3;
