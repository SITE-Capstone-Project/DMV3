import "./SlideCard.css"
// components/SlideCard.jsx
import React, { useState } from 'react';
import Carousel from 'react-bootstrap/Carousel';
import Images from '../Images';

function SlideCard2() {
    const [index, setIndex] = useState(0);
    const itemsPerSlide = 5;

    const cities = [
        { name: 'Vancouver', imageUrl: 'https://lp-cms-production.imgix.net/2021-04/GettyRF_1124659884.jpg' },
        { name: 'Madrid', imageUrl: 'https://media.cntraveler.com/photos/5b2d15c98b842c3b35c5d3c7/16:9/w_2560%2Cc_limit/Madrid-Beaches_GettyImages-731843465.jpg' },
        { name: 'Dublin', imageUrl: 'https://thumbs.dreamstime.com/b/dublin-ireland-27598568.jpg' },
        { name: 'Tokyo', imageUrl: 'https://a.cdn-hotels.com/gdcs/production172/d1381/8efd3f69-63bb-4398-a595-095cea25fc37.jpg' },
        { name: 'Bangkok', imageUrl: 'https://fullsuitcase.com/wp-content/uploads/2022/06/Best-areas-to-stay-in-Bangkok-neighborhood-guide.jpg.webp' },
        { name: 'Helsinki', imageUrl: 'https://a.cdn-hotels.com/gdcs/production0/d1589/6d9eed40-c31d-11e8-9739-0242ac110006.jpg' },
        { name: 'Shanghai', imageUrl: 'https://www.chinadiscovery.com/assets/images/shanghai/things-to-do/lujiazui-skyline-day.jpg' },
        { name: 'Marrakech', imageUrl: 'https://www.groovymashedpotatoes.com/content/images/2023/01/5-Days-in-Morocco.jpg' },
        { name: 'Athens', imageUrl: 'https://cdn.britannica.com/61/179661-138-6F13E02A/Overview-Athens.jpg?w=800&h=450&c=crop' },
        { name: 'Cape Town', imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/ec/Aerial_View_of_Sea_Point%2C_Cape_Town_South_Africa.jpg/1200px-Aerial_View_of_Sea_Point%2C_Cape_Town_South_Africa.jpg' },
    ];

    const handleSelect = (selectedIndex) => setIndex(selectedIndex);
    const totalSlides = (cities.length + itemsPerSlide - 1) / itemsPerSlide;

    return (
        <div className = "sliding">
            <h1>Top Picks</h1>
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

export default SlideCard2;