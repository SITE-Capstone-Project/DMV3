import "./SlideCard.css"
import React, { useState } from 'react';
import Carousel from 'react-bootstrap/Carousel';
import Images from '../Images';

function SlideCard2() {
    const [index, setIndex] = useState(0);
    const itemsPerSlide = 5;

    const cities = [
        { name: 'Boston', imageUrl: 'https://www.travelandleisure.com/thmb/_aMbik8KZYsUKc_6_XNeAOzPi84=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/boston-massachusetts-BOSTONTG0221-719aef2eeb1c4929b6c839715e34a69e.jpg' },
        { name: 'Atlanta', imageUrl: 'https://a.cdn-hotels.com/gdcs/production114/d1629/63a8dbe5-e678-4fe4-957a-ad367913a3fa.jpg' },
        { name: 'San Francisco', imageUrl: 'https://www.visittheusa.com/sites/default/files/styles/hero_l/public/images/hero_media_image/2016-10/Getty_591648687_Brand_City_SanFrancisco_Hero_FinalCrop.jpg?h=dd3c63f2&itok=UyHVZ5xx' },
        { name: 'Amsterdam', imageUrl: 'https://s3.amazonaws.com/com.vertoe.blog/blog/wp-content/uploads/2021/06/16032935/pexels-chait-goli-2031706.jpg' },
        { name: 'Prague', imageUrl: 'https://media.tacdn.com/media/attractions-splice-spp-674x446/0b/e1/1b/2c.jpg' },
        { name: 'Edinburgh', imageUrl: 'https://s7g10.scene7.com/is/image/stena/20180706_edinburgh_calton_hill:16-9?ts=1646191089536&dpr=off' },
        { name: 'Seoul', imageUrl: 'https://content.r9cdn.net/rimg/dimg/30/0c/6318617a-city-35982-163ff913019.jpg?width=1366&height=768&xhint=2421&yhint=1876&crop=true' },
        { name: 'Dubai', imageUrl: 'https://lp-cms-production.imgix.net/features/2017/09/dubai-marina-skyline-2c8f1708f2a1.jpg?auto=format&w=1440&h=810&fit=crop&q=75' },
        { name: 'Zanzibar City', imageUrl: 'https://media.tacdn.com/media/attractions-splice-spp-674x446/06/70/80/ba.jpg' },
        { name: 'Brussels', imageUrl: 'https://www.visit.brussels/en/visitors/_jcr_content/root/container/content_1226746056_c/multicolumn/teaser_2005755142.coreimg.jpeg/1686904852589/grand-place-4212---visit-brussels---jean-michel-byl.jpeg' },
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