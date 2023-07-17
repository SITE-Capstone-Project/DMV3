import "./SlideCard.css"
import React from "react"
import { Link } from "react-router-dom"
import logo from "../../assets/logo.png"
import Carousel from 'react-grid-carousel'

export default function SlideCard() {
    return (
        <div className="sliding-card">
            <Carousel cols={6} rows={1} gap={0} loop>
                <Carousel.Item>
                    <div className="slidecard">
                        <img src={logo} />
                        <div className="titleRating">
                            <h2>Los Angeles</h2>
                            <p>Rating: 3/5</p>
                        </div>
                    </div>
                </Carousel.Item>
                <Carousel.Item>
                    <div className="slidecard">
                        <img src={logo} />
                        <div className="titleRating">
                            <h2>Los Angeles</h2>
                            <p>Rating: 3/5</p>
                        </div>
                    </div>
                </Carousel.Item>
                <Carousel.Item>
                    <div className="slidecard">
                        <img src={logo} />
                        <div className="titleRating">
                            <h2>New York</h2>
                            <p>Rating: 3.6/5</p>
                        </div>
                    </div>
                </Carousel.Item>
                <Carousel.Item>
                    <div className="slidecard">
                        <img src={logo} />
                        <div className="titleRating">
                            <h2>Washington, DC</h2>
                            <p>Rating: 3/5</p>
                        </div>
                    </div>
                </Carousel.Item>
                <Carousel.Item>
                    <div className="slidecard">
                        <img src={logo} />
                        <div className="titleRating">
                            <h2>Nashville, TN</h2>
                            <p>Rating: 3.7/5</p>
                        </div>
                    </div>
                </Carousel.Item>
                <Carousel.Item>
                    <div className="slidecard">
                        <img src={logo} />
                        <div className="titleRating">
                            <h2>San Francisco, CA</h2>
                            <p>Rating: 4/5</p>
                        </div>
                    </div>
                </Carousel.Item>
                <Carousel.Item>
                    <div className="slidecard">
                        <img src={logo} />
                        <div className="titleRating">
                            <h2>Silver Spring, MD</h2>
                            <p>Rating: 3/5</p>
                        </div>
                    </div>
                </Carousel.Item>
                <Carousel.Item>
                    <div className="slidecard">
                        <img src={logo} />
                        <div className="titleRating">
                            <h2>Hello, World</h2>
                            <p>Rating: 3/5</p>
                        </div>
                    </div>
                </Carousel.Item>
            </Carousel>

            <Carousel cols={6} rows={1} gap={0} loop>
                <Carousel.Item>
                    <div className="slidecard">
                        <img src={logo} />
                        <div className="titleRating">
                            <h2>Los Angeles</h2>
                            <p>Rating: 3/5</p>
                        </div>
                    </div>
                </Carousel.Item>
                <Carousel.Item>
                    <div className="slidecard">
                        <img src={logo} />
                        <div className="titleRating">
                            <h2>Los Angeles</h2>
                            <p>Rating: 3/5</p>
                        </div>
                    </div>
                </Carousel.Item>
                <Carousel.Item>
                    <div className="slidecard">
                        <img src={logo} />
                        <div className="titleRating">
                            <h2>New York</h2>
                            <p>Rating: 3.6/5</p>
                        </div>
                    </div>
                </Carousel.Item>
                <Carousel.Item>
                    <div className="slidecard">
                        <img src={logo} />
                        <div className="titleRating">
                            <h2>Washington, DC</h2>
                            <p>Rating: 3/5</p>
                        </div>
                    </div>
                </Carousel.Item>
                <Carousel.Item>
                    <div className="slidecard">
                        <img src={logo} />
                        <div className="titleRating">
                            <h2>Nashville, TN</h2>
                            <p>Rating: 3.7/5</p>
                        </div>
                    </div>
                </Carousel.Item>
                <Carousel.Item>
                    <div className="slidecard">
                        <img src={logo} />
                        <div className="titleRating">
                            <h2>San Francisco, CA</h2>
                            <p>Rating: 4/5</p>
                        </div>
                    </div>
                </Carousel.Item>
                <Carousel.Item>
                    <div className="slidecard">
                        <img src={logo} />
                        <div className="titleRating">
                            <h2>Silver Spring, MD</h2>
                            <p>Rating: 3/5</p>
                        </div>
                    </div>
                </Carousel.Item>
                <Carousel.Item>
                    <div className="slidecard">
                        <img src={logo} />
                        <div className="titleRating">
                            <h2>Hello, World</h2>
                            <p>Rating: 3/5</p>
                        </div>
                    </div>
                </Carousel.Item>
            </Carousel>
        </div>
    )
}