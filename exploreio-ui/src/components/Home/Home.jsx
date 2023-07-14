import "./Home.css"
import React from "react"
import Hero from "../Hero/Hero";
import SlideCard from "../SlideCard/SlideCard";
// import Footer from "../Footer/Footer"; 

export default function Home() {
    return (
        <div>
            <div className="home">
                <img id = "background-image" src=
                "https://images.pexels.com/photos/16922741/pexels-photo-16922741/free-photo-of-a-travel-boat-in-prague.jpeg" 
                alt="front" />     
                <div className="topPage">
                    <Hero />
                </div>
                <br/>
                <div>
                <SlideCard/>
                </div>
            </div>
        </div>
    );
}
